const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

const User = db.users;

const register = async (req, res, next) => {
  console.log('req.body => ', req.body);

  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
    job: Joi.string().allow(null, ''),
    image: Joi.string().allow(null, ''),
  });

  try {
    //! Validation
    const { error } = await schema.validateAsync(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const duplicateUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (duplicateUser) {
      return res
        .status(400)
        .json({ message: 'This Email has been registered!' });
    }

    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const data = { ...req.body, password: hashedPass };

    const newUser = await User.create(data);

    return res.status(200).json(newUser);
  } catch (err) {
    console.log('err => ', err.message);
    console.log('err.message => ', err.message);
    next(err);
  }
};

const login = async (req, res, next) => {
  console.log('req.body => ', req.body);

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  });

  try {
    //! Validation
    const { error } = await schema.validateAsync(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Unauthorized!' });

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.status(401).json({ message: 'Unauthorized!' });
    }

    // TODO: create JWT
    const accessToken = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );

    const refreshToken = jwt.sign(
      { email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    //! Set refreshToken to user that log in
    await user.update({ refreshToken });

    //! Set the token to Cookie
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: 'None',
      maxAge: 24 * 60 * 60 * 1000, //! one day
    });

    return res.status(200).json({ accessToken });
  } catch (err) {
    console.log('err => ', err.message);
    next(err);
  }
};

const refreshToken = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  console.log('cookies.jwt => ', cookies.jwt);

  const refreshToken = cookies.jwt;

  try {
    const user = await User.findOne({ where: { refreshToken } });
    if (!user) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || user.email !== decoded.email) return res.sendStatus(403);

        const accessToken = jwt.sign(
          { email: decoded.email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '30s' }
        );

        res.json({ accessToken });
      }
    );
  } catch (err) {
    console.log('err => ', err.message);
    next(err);
  }
};

const logout = async (req, res, next) => {
  //! On client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //! No Content

  const refreshToken = cookies.jwt;

  try {
    //! is refreshToken in Database?
    const user = await User.findOne({ where: { refreshToken } });
    if (!user) {
      res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

      return res.sendStatus(204);
    }

    //! Delete refreshToken in Database
    await user.update({ refreshToken: null });

    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      secure: 'None',
      // maxAge: 24 * 60 * 60 * 1000, //! dont use "maxAge" for clear the cookie
    });
    res.sendStatus(204);
  } catch (err) {
    console.log('err => ', err.message);
    next(err);
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
};

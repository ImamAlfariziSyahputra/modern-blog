const Joi = require('joi');
const db = require('../models');
const multer = require('multer');
const jimp = require('jimp');

// Models
const User = db.users;

//! Get All Users
const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({});

    res.status(200).send(users);
  } catch (err) {
    console.log('err => ', err.message);
    next(err);
  }
};

//! Get User
const getUser = async (req, res, next) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ where: { email } });

    res.status(200).send(user);
  } catch (err) {
    console.log('err => ', err.message);
    next(err);
  }
};

//! Register
const register = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
    passwordConfirmation: Joi.string().min(3).required(),
    job: Joi.string().required(),
    image: Joi.string().allow(''),
  });

  try {
    const { error } = await schema.validateAsync(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const { name, email, password, job, image } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user)
      return res.status(400).send('User with that email is already exist!');

    let newUser = User.build({
      name,
      email,
      password,
      job,
      image,
    });

    const savedUser = await newUser.save();

    res.status(201).send(savedUser);
  } catch (err) {
    console.log('err => ', err.message);
    next(err);
  }
};

const avatarUploadOptions = {
  storage: multer.memoryStorage(),
  limits: {
    // storing images up to 1mb
    fileSize: 1024 * 1024 * 1,
  },
  fileFilter: (req, file, next) => {
    if (file.mimetype.startsWith('image/')) {
      next(null, true);
    } else {
      next(Error('Please upload a valid image!'), false);
    }
  },
};

const uploadAvatar = multer(avatarUploadOptions).single('image');

//! Update User
const updateUser = async (req, res, next) => {
  const { email } = req.params;

  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    job: Joi.string().required(),
    image: Joi.string().allow(''),
  });

  try {
    const { error } = await schema.validateAsync(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ where: { email } });

    if (!user) throw Error('User Not Found!');

    //! if user upload an Image
    if (req.file) {
      const extension = req.file.mimetype.split('/')[1];
      req.body.image = `/static/uploads/avatars/${
        user.name
      }-${Date.now()}.${extension}`;

      const image = await jimp.read(req.file.buffer);
      image.resize(250, jimp.AUTO);
      image.write(`./${req.body.image}`);
    }

    const updatedUser = await User.update(req.body, { where: { email } });

    if (!updatedUser[0]) throw Error('User Not Found!');

    res.status(200).send(updatedUser);
  } catch (err) {
    console.log('err => ', err.message);
    next(err);
  }
};

module.exports = {
  getUser,
  getUsers,
  register,
  uploadAvatar,
  updateUser,
};

const jwt = require('jsonwebtoken');

const verifyJwt = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);

  console.log(authHeader); //! Bearer token

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //! for Invalid Token

    req.user = decoded.username; //! set req.user = username from jwt
    next();
  });
};

module.exports = verifyJwt;
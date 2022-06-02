const jwt = require('jsonwebtoken');

const verifyJwt = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ message: 'Unauthorized!' });

  console.log(authHeader); //! Bearer token

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res
        .status(403)
        .json({ message: 'Access Token is invalid or expired!' }); //! for Invalid Token

    req.user = decoded.username; //! set req.user = username from jwt
    req.role = decoded.role;
    next();
  });
};

module.exports = verifyJwt;

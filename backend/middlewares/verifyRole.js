const verifyRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.role) return res.status(401).json({ message: 'Unauthorized!' });

    const rolesArray = [...allowedRoles];

    console.log('rolesArray => ', rolesArray);
    console.log('req.role => ', req.role);

    const result = rolesArray.includes(req.role);
    if (!result)
      return res
        .status(401)
        .json({ message: "You don't have access to this route!" });
    next();
  };
};

module.exports = verifyRole;

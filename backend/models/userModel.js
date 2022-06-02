// const Post = require('./postModel');

module.exports = (sequelize, DataTypes, literal) => {
  const User = sequelize.define(
    'user',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: {
            msg: 'Invalid "Email" format!',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      job: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      refreshToken: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.INTEGER,
        defaultValue: 2,
      },
      // createdAt: {
      //   type: DataTypes.DATE,
      //   defaultValue: literal('CURRENT_TIMESTAMP'),
      // },
      // updatedAt: {
      //   type: DataTypes.DATE,
      //   defaultValue: literal('CURRENT_TIMESTAMP'),
      //   onUpdate: literal('CURRENT_TIMESTAMP'),
      // },
    },
    { timestamps: true }
  );

  return User;
};

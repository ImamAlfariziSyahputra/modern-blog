// const Post = require('./postModel');

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
    },
    //* one to many => user_id
  });

  return Comment;
};

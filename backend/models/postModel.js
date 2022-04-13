module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // author: {
    //   type: DataTypes.BIGINT,
    //   allowNull: false,
    // },
  });

  return Post;
};

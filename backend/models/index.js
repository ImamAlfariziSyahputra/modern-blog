const dbConfig = require('../config/dbConfig');
const { Sequelize, DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => console.log('Database Connected Successfully...'))
  .catch((err) => console.log('Error =>', err));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Op;

db.users = require('./userModel.js')(sequelize, DataTypes);
db.posts = require('./postModel.js')(sequelize, DataTypes);
db.comments = require('./commentModel.js')(sequelize, DataTypes);

//! User Has Many Post
db.users.hasMany(db.posts, {
  foreignKey: { name: 'author', allowNull: false },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});

db.posts.belongsTo(db.users, {
  foreignKey: { name: 'author', allowNull: false },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});

//! User Has Many Comments
//! Post Has Many Comments
db.users.hasMany(db.comments, {
  foreignKey: { name: 'userId', allowNull: false },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});
db.posts.hasMany(db.comments, {
  foreignKey: { name: 'postId', allowNull: false },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});

db.comments.belongsTo(db.users, {
  foreignKey: { name: 'userId', allowNull: false },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});
db.comments.belongsTo(db.posts, {
  foreignKey: { name: 'postId', allowNull: false },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});

db.sequelize.sync().then(() => {
  console.log('Re-sync DB is done!');
});

module.exports = db;

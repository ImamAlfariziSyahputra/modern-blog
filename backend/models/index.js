const dbConfig = require('../config/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');

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

db.users = require('./userModel.js')(sequelize, DataTypes);
db.posts = require('./postModel.js')(sequelize, DataTypes);

db.users.hasMany(db.posts, {
  as: 'post',
  foreignKey: { allowNull: false, name: 'author' },
});

db.posts.belongsTo(db.users, {
  as: 'user',
  foreignKey: { allowNull: false, name: 'author' },
});

db.sequelize.sync({ force: false }).then(() => {
  console.log('Re-sync DB is done!');
});

module.exports = db;

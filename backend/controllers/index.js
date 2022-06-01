const auth = require('./authController');
const user = require('./userController');
const post = require('./postController');
const comment = require('./commentController');

module.exports = {
  auth,
  user,
  post,
  comment,
};

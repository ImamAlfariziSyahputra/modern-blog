const router = require('express').Router();
const { post, user, comment, auth } = require('../controllers');
const verifyJwt = require('../middlewares/verifyJwt');
const verifyRole = require('../middlewares/verifyRole');
const ROLE_LIST = require('../config/role_list');

//! Authentication
router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/refresh-token', auth.refreshToken);
router.get('/logout', auth.logout);

//! User
router.get('/get/user', verifyJwt, verifyRole(ROLE_LIST.admin), user.getUsers);
router.get(
  '/get/user/:email',
  verifyJwt,
  verifyRole(ROLE_LIST.admin),
  user.getUser
);
// router.post('/register', user.register);
router.patch(
  '/update/user/:email',
  verifyJwt,
  verifyRole(ROLE_LIST.admin),
  user.uploadAvatar,
  user.updateUser
);

//! Post
router.get('/get/post', post.getPosts);
router.get('/get/post/published', post.getPostsByStatus);
router.get('/get/post/:slug', post.getPostBySlug);
router.post(
  '/create/post',
  verifyJwt,
  verifyRole(ROLE_LIST.admin),
  post.uploadImage,
  post.addPost
);
router.put(
  '/update/post/:slug',
  verifyJwt,
  verifyRole(ROLE_LIST.admin),
  post.uploadImage,
  post.updatePost
);
router.delete(
  '/delete/post/:slug',
  verifyJwt,
  verifyRole(ROLE_LIST.admin),
  post.deletePost
);

//! Comment
router.get('/get/comment', comment.getComments);
router.get('/get/comment-by-slug/:slug', comment.getCommentsByPost);
router.post('/create/comment/:slug', comment.addComment);
router.patch('/update/comment/:id', comment.updateComment);
router.delete(
  '/delete/comment/:id',
  verifyJwt,
  verifyRole(ROLE_LIST.admin),
  comment.deleteComment
);

module.exports = router;

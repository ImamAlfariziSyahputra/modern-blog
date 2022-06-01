const router = require('express').Router();
const { post, user, comment, auth } = require('../controllers');
const verifyJwt = require('../middlewares/verifyJwt');

//! Authentication
router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/refresh-token', auth.refreshToken);
router.get('/logout', auth.logout);

//! User
router.get('/get/user', verifyJwt, user.getUsers);
router.get('/get/user/:email', user.getUser);
// router.post('/register', user.register);
router.patch('/update/user/:email', user.uploadAvatar, user.updateUser);

//! Post
router.get('/get/post', post.getPosts);
router.get('/get/post/published', post.getPostsByStatus);
router.get('/get/post/:slug', post.getPostBySlug);
router.post('/create/post', post.uploadImage, post.addPost);
router.put('/update/post/:slug', post.uploadImage, post.updatePost);
router.delete('/delete/post/:slug', post.deletePost);

//! Comment
router.get('/get/comment', comment.getComments);
router.get('/get/comment-by-slug/:slug', comment.getCommentsByPost);
router.post('/create/comment/:slug', comment.addComment);
router.patch('/update/comment/:id', comment.updateComment);
router.delete('/delete/comment/:id', comment.deleteComment);

module.exports = router;

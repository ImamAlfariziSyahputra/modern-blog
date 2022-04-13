const { post, user } = require('../controllers');

const router = require('express').Router();

//! User
router.get('/get/user', user.getUsers);
router.get('/get/user/:email', user.getUser);
router.post('/register', user.register);
router.patch('/update/user/:email', user.uploadAvatar, user.updateUser);

//! Post
router.get('/get/post', post.getPosts);
router.get('/get/post/published', post.getPostsByStatus);
router.get('/get/post/:slug', post.getPostBySlug);
router.post('/create/post', post.uploadImage, post.addPost);
router.put('/update/post/:slug', post.uploadImage, post.updatePost);
router.delete('/delete/post/:slug', post.deletePost);

module.exports = router;

const Joi = require('joi');
const multer = require('multer');
const jimp = require('jimp');
const db = require('../models');

// Models
const Post = db.posts;
const User = db.users;

//! Get All Posts
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      order: [['createdAt', 'DESC']],
      // attributes: [
      //   'title',
      //   'slug',
      //   'content'
      // ],
      // include: [{ model: User, as: 'author' }],
    });

    res.status(200).send(posts);
  } catch (err) {
    console.log('err => ', err.message);
    next(err);
  }
};

//! Get Post By Status
const getPostsByStatus = async (req, res, next) => {
  try {
    const posts = await Post.findAll({ where: { status: true } });

    res.status(200).send(posts);
  } catch (err) {
    console.log('err => ', err.message);
    next(err);
  }
};

//! Get Post By Slug
const getPostBySlug = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const post = await Post.findOne({ where: { slug } });

    res.status(200).send(post);
  } catch (err) {
    console.log('err => ', err.message);
    next(err);
  }
};

const imageUploadOptions = {
  storage: multer.memoryStorage(),
  limits: {
    // storing images up to 1mb
    fileSize: 1024 * 1024 * 1,
  },
  fileFilter: (req, file, next) => {
    if (file.mimetype.startsWith('image/')) {
      next(null, true);
    } else {
      next(Error('Please upload a valid image!'), false);
    }
  },
};

const uploadImage = multer(imageUploadOptions).single('image');

//! Add Post
const addPost = async (req, res, next) => {
  console.log('req.body => ', req.body);
  // console.log('req.file => ', req.file);
  // return res.send(req.file);
  const schema = Joi.object({
    title: Joi.string().min(3).max(200).required(),
    slug: Joi.string().required(),
    content: Joi.string().required(),
    category: Joi.string().required(),
    status: Joi.string().required(),
    author: Joi.string().required(),
  });

  try {
    const { error } = await schema.validateAsync(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    //! Image is Required
    if (!req.file) throw Error('Image is required!');

    const extension = req.file.mimetype.split('/')[1];
    imageToInsert = `static/uploads/posts/Post-${Date.now()}.${extension}`;

    const image = await jimp.read(req.file.buffer);
    // image.resize(750, jimp.AUTO);
    image.write(`./${imageToInsert}`);

    removeStatic = imageToInsert.split('static')[1];
    req.body.image = `http://localhost:8080${removeStatic}`;

    const { author } = req.body;

    const user = await User.findOne({ where: { id: author } });

    const post = await user.createPost(req.body);

    res.status(200).send(post);
  } catch (err) {
    console.log('err => ', err.message);
    next(err);
  }
};

//! Update Post
const updatePost = async (req, res, next) => {
  console.log('req.file => ', req.file);
  console.log('req.body => ', req.body);
  // return res.send(req.body);
  const { slug } = req.params;
  console.log('slug => ', slug);

  const schema = Joi.object({
    title: Joi.string().min(3).max(200).required(),
    slug: Joi.string().required(),
    // image: Joi.string().allow(''),
    content: Joi.string().required(),
    category: Joi.string().required(),
    status: Joi.string().required(),
    author: Joi.string().required(),
  });

  try {
    const { error } = await schema.validateAsync(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    if (req.file) {
      const extension = req.file.mimetype.split('/')[1];
      imageToInsert = `static/uploads/posts/Post-${Date.now()}.${extension}`;

      const image = await jimp.read(req.file.buffer);
      // image.resize(750, jimp.AUTO);
      image.write(`./${imageToInsert}`);

      removeStatic = imageToInsert.split('static')[1];
      req.body.image = `http://localhost:8080${removeStatic}`;
    } else {
      const post = await Post.findOne({ where: { slug } });
      console.log('post => ', post);
      // return res.send('ok');
      // console.log('post.image => ', post.image);
      req.body.image = post.image;
    }

    // const user = await User.findOne({ where: { id: 1 } });

    const updatedPost = await Post.update(req.body, { where: { slug } });

    if (!updatedPost[0]) throw Error('Post Not Found!');

    res.status(200).send(updatedPost);
  } catch (err) {
    console.log('err => ', err.message);
    next(err);
  }
};

//! Delete Post
const deletePost = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const deletedPost = await Post.destroy({ where: { slug } });

    if (!deletedPost) throw Error('Post Not Found!');

    res.status(200).send({ msg: 'Post Deleted Successfully!' });
  } catch (err) {
    console.log('err => ', err.message);
    next(err);
  }
};

module.exports = {
  getPosts,
  getPostsByStatus,
  getPostBySlug,
  uploadImage,
  addPost,
  updatePost,
  deletePost,
};

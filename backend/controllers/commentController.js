const Joi = require('joi');
const db = require('../models');

// Models
const { Op } = db;
const Comment = db.comments;
const Post = db.posts;

//! Get All Posts
const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      order: [['createdAt', 'DESC']],
    });

    res.status(200).send(comments);
  } catch (err) {
    console.log('err => ', err.message);
    next(err);
  }
};

//! Get Post By Status
const getCommentsByPost = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const post = await Post.findOne({ where: { slug } });
    if (!post) {
      throw new Error('Post not found');
    }

    //! Parent Comments
    const comments = await post.getComments({
      where: { parentId: null },
    });
    //! Reply Comments
    const replyComments = await post.getComments({
      where: {
        parentId: {
          [Op.not]: null,
        },
      },
    });

    res.status(200).send({
      comments,
      replyComments,
    });
  } catch (err) {
    console.log('err => ', err.message);
    next(err);
  }
};

//! Add Comment
const addComment = async (req, res, next) => {
  const { slug } = req.params;
  console.log('req.body => ', req.body);
  console.log('slug => ', slug);

  const schema = Joi.object({
    body: Joi.string().required(),
    parentId: Joi.string().allow(null, ''),
    userId: Joi.string().required(),
  });

  try {
    //! Validation
    const { error } = await schema.validateAsync(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const post = await Post.findOne({ where: { slug } });
    if (!post) throw Error('Post Not Found!');

    const newComment = await post.createComment(req.body);

    res.status(200).json(newComment);
  } catch (err) {
    console.log('err => ', err.message);
    next(err);
  }
};

//! Update Comment
const updateComment = async (req, res, next) => {
  const { id } = req.params;
  console.log('req.body => ', req.body);
  console.log('id => ', id);

  const schema = Joi.object({
    body: Joi.string().required(),
  });

  try {
    //! Validation
    const { error } = await schema.validateAsync(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updatedComment = await Comment.update(req.body, { where: { id } });
    if (updatedComment[0] === 0) throw Error('Comment Not Found!');

    res.status(200).send({ msg: 'Comment updated successfully.' });
  } catch (err) {
    console.log('err => ', err.message);
    next(err);
  }
};

//! Delete Comment
const deleteComment = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedComment = await Comment.destroy({ where: { id } });
    if (!deletedComment) throw Error('Comment Not Found!');

    res.status(201).send({ msg: 'Comment Deleted Successfully!' });
  } catch (err) {
    console.log('err => ', err.message);
    next(err);
  }
};

module.exports = {
  getComments,
  getCommentsByPost,
  addComment,
  updateComment,
  deleteComment,
};

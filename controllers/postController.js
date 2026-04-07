const { Op } = require('sequelize');
const Post = require('../models/Post');
const User = require('../models/User');

// Get All Posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ include: User });
    res.json({
      data: posts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, { include: User });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({
      data: post,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create Post
exports.createPost = async (req, res) => {
  try {
    const { title, slug, subject } = req.body;
    const post = await Post.create({
      title,
      slug,
      subject,
      user_id: req.user.id,
    });
    res.status(201).json({
      data: post,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Post
exports.updatePost = async (req, res) => {
  try {
    const { title, slug, subject } = req.body;
    const post = await Post.findByPk(req.params.id);

    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.user_id !== req.user.id)
      return res.status(403).json({ error: 'Unauthorized action' });

    await post.update({ title, slug, subject });
    res.json({ message: 'Post updated', data: post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.user_id !== req.user.id)
      return res.status(403).json({ error: 'Unauthorized action' });

    await post.destroy();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search post
exports.searchPost = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: {
        title: {
          [Op.like]: `%${req.params.keyword}%`,
        },
      },
    });
    res.json({
      data: posts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
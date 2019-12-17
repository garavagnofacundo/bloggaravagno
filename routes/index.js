const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', (req, res) => {
  Post.find().exec((err, posts) => {
    res.render('index', { posts: posts });
  });
});

router.get('/newpost', (req, res) => {
  res.render('newpost');
});

router.post('/newpost', (req, res) => {
  console.log(req.body);
  const post = new Post({
    title: req.body.title,
    subtitle: req.body.subtitle,
    author: req.body.author,
    content: req.body.content
  });
  post.save(err => {
    res.redirect('/');
  });
});

router.get('/posts/:id', (req, res) => {
  Post.findById(req.params.id).exec((err, post) => {
    res.render('post', { post: post });
  });
});

module.exports = router;

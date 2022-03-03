const express = require('express');
const Blog = require('../models/blog');

const blog_index = (req, res) => {
  Blog.find().sort({
    createdAt: -1
  })
  .then(result => {
    res.render('blogs/index', {
      title: 'All Blogs',
      blogs: result
    });
  })
  .catch(err => {
    console.log(err);
  })
};

const blog_create_get = (req, res) => {
  res.render('blogs/create');
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(() => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    })
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('blogs/details', {
        blog: result
      });
    })
    .catch(err => {
      console.log(err);
    })
};

const blog_update_get = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('blogs/edit', {
        blog: result
      });
    })
    .catch(err => {
      console.log(err);
    })
}

const blog_update_put = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndUpdate(id, req.body)
    .then(result => {
      res.json({
        redirect: '/blogs/' + id
      })
    })
    .catch(err => console.log(err))
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({
        redirect: '/blogs'
      })
    })
    .catch(err => console.log(err)); 
};

module.exports = {
  blog_index,
  blog_create_get,
  blog_create_post,
  blog_details,
  blog_update_get,
  blog_update_put,
  blog_delete
}
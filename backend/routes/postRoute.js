const express = require('express')
const { getPosts, getPostById, createPost, updatePost, deletePost } = require('../controller/postController')

const router = express.Router()

// GET all posts and POST a new post
router.route('/').get(getPosts).post(createPost)

// GET, PUT, DELETE a single post by ID
router.route('/:id').get(getPostById).put(updatePost).delete(deletePost)

module.exports = router
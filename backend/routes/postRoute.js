const express = require('express')
const { getPosts, getPostById, createPost, updatePost, deletePost, patchPost, addComment } = require('../controller/postController')

const router = express.Router()

// GET all posts and POST a new post
router.route('/').get(getPosts).post(createPost)

// GET, PUT, DELETE a single post by ID
router.route('/:id').get(getPostById).put(updatePost).patch(patchPost).delete(deletePost)

// POST a comment to a post
router.route('/:id/comments').post(addComment);

module.exports = router
const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken') // Middleware to verify the token

const { 
    getPosts, 
    getPostById, 
    createPost, 
    updatePost, 
    deletePost, 
    patchPost, 
    addComment, 
    getUserPosts 
    } = require('../controller/postController')



// GET all posts
router.get('/', getPosts)

// POST a new post
router.post('/', verifyToken, createPost)

// GET, PUT, DELETE a single post by ID
router.route('/:id')
    .get(getPostById)
    .put(updatePost)
    .patch(patchPost)
    .delete(deletePost)

// Route to fetch user posts
router.get('/user', verifyToken, getUserPosts);

// POST a comment to a post
router.route('/:id/comments').post(addComment);

module.exports = router
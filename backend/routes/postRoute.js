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



// Route to fetch user posts
router.get('/user', verifyToken, getUserPosts);

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

// POST a comment to a post
router.post('/:id/comments', addComment);


module.exports = router
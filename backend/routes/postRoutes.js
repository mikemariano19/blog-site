const express = require('express')

const { getPost, createPost } = require('../controllers/postControllers')

const router = express.Router()

// GET all post and POST a new post
router.route('/').get(getPost).post(createPost)

 
router.route('/:id').get(getPost)


module.exports = router
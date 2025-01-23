const Post = require('../models/postModels')
const mongoose = require('mongoose')

// get all post
const getPost = async (req, res) => {
    const posts = await Post.find({}).sort({createdAt: -1})
    res.status(200).json(posts)
}

// create a new post
const createPost = async (req, res) => {
    const { caption } = req.body

    try {
        const post = await Post.create({ caption })
        res.status(201).json(post)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getPost,
    createPost
}
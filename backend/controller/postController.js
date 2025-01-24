const Post = require('../model/postModel')
const mongoose = require('mongoose')

// get all posts
const getPosts = async (req, res) => {
    const posts = await Post.find({}).sort({ createdAt: -1 })
    res.status(200).json(posts)
}

// get a single post by ID
const getPostById = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such post' })
    }

    const post = await Post.findById(id)

    if (!post) {
        return res.status(404).json({ error: 'No such post' })
    }

    res.status(200).json(post)
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

// update a post
const updatePost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such post' })
    }

    const post = await Post.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })

    if (!post) {
        return res.status(404).json({ error: 'No such post' })
    }

    res.status(200).json(post)
}

// delete a post
const deletePost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such post' })
    }

    const post = await Post.findOneAndDelete({ _id: id })

    if (!post) {
        return res.status(404).json({ error: 'No such post' })
    }

    res.status(200).json({ message: 'Post deleted successfully' })
}

module.exports = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}
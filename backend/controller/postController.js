const Post = require('../model/postModel')
const Comment = require('../model/commentModel');
const mongoose = require('mongoose')

// get all posts
const getPosts = async (req, res) => {
    const posts = await Post.find({}).sort({ createdAt: -1 })
    res.status(200).json(posts)
}

// Fetch all posts by a user
const getUserPosts = async (req, res) => {
    const userId = req.user.id; // Assuming user ID is extracted from the token

    try {
        const posts = await Post.find({ userId }).sort({ createdAt: -1 }); // Sort by newest first
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching user posts:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

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
    try{
        const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such post' })
    }

    const post = await Post.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })

    if (!post) {
        return res.status(404).json({ error: 'No such post' })
    }

    res.status(200).json(post)
    } catch (error) {
        res.status(400).json({ error: 'Server Error' })
    }
}

// PATCH a single post by ID
const patchPost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

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

// Add a comment to a post
const addComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = new Comment({
            userName: req.body.userName,
            text: req.body.text
        });

        post.comments.push(comment);
        await post.save();

        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getPosts,
    getUserPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    patchPost,
    addComment
}
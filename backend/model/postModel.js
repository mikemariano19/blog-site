const mongoose = require('mongoose')
const commentSchema = require('./commentModel').schema;

const Schema = mongoose.Schema

const postSchema = new Schema({
    caption: {
        type: String,
        required: true
    },
    images: {
        type: [String], // Array of image URLs
        default: null
    },
    comments: [commentSchema]
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)
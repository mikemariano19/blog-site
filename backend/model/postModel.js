const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    caption: {
        type: String,
        required: true
    },
    images: {
        type: [String], // Array of image URLs
        default: null
    }
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)
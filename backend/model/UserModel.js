const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: { data: Buffer, contentType: String }, // Store image as binary
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
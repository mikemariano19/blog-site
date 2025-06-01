const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register', // or your user model name
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    avatarUrl: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Profile', profileSchema);
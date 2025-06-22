const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registerSchema = new Schema(
    {
        userName: {
            type: String,
            required: [true, 'Username is required'],
            minlength: [3, 'Username must be at least 3 characters long'],
            maxlength: [20, 'Username cannot exceed 20 characters'],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
        },
        hasProfile: {
            type: Boolean,
            default: false, // Indicates if the user has a profile
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Register', registerSchema);
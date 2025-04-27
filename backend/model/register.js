const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registerSchema = new Schema(
    {
        userName: {
            type: String,
            required: [true, 'Username is required'],
            minlength: [3, 'Username must be at least 3 characters long'],
            maxlength: [20, 'Username cannot exceed 20 characters'],
            unique: true, // Ensure the username is unique
            trim: true, // Remove extra spaces
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
        },
        // firstName: { type: String, default: '' },
        // lastName: { type: String, default: '' },
    },
    {
        timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
    }
);

module.exports = mongoose.model('Register', registerSchema);
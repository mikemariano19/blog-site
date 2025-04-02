const Register = require('../model/register');
const bcrypt = require('bcryptjs'); // For password hashing

// Controller to handle user registration
const registerUser = async (req, res) => {
    const { userName, password } = req.body;

    try {
        // Check if the username already exists
        const existingUsername = await Register.findOne({ userName });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new Register({ userName, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    registerUser,
};
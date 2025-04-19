const bcrypt = require('bcryptjs');
const Register = require('../model/register');

// Controller to handle user registration
const registerUser = async (req, res) => {
    const { userName, password } = req.body;

    try {
        // Check if the username already exists
        const existingUser = await Register.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new Register({
            userName,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    registerUser,
};
const express = require('express');
const bcrypt = require('bcrypt'); // For password hashing
const Register = require('../model/register'); // Import the Register model

const router = express.Router();

// POST route for login
router.post('/', async (req, res) => {
    const { userName, password } = req.body;

    try {
        // Check if the user exists
        const user = await Register.findOne({ userName });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // If login is successful
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
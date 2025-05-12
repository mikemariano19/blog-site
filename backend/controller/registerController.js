const bcrypt = require('bcryptjs');
const Register = require('../model/register');
const jwt = require('jsonwebtoken');

// Controller to handle user registration
const registerUser = async (req, res) => {
    const { userName, password } = req.body;

    console.log('Request received for registration'); // Avoid logging sensitive data

    // Validate input
    if (!userName || !password) {
        console.log('Missing username or password');
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        // Trim the username to remove extra spaces
        const trimmedUserName = userName.trim();

        // Check if the username already exists
        const existingUser = await Register.findOne({ userName: trimmedUserName });
        if (existingUser) {
            console.log('Username already exists');
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new Register({
            userName: trimmedUserName,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();
        
        // Generate a token for the new user
       const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
       // Send the response with the token
       res.status(201).json({ message: 'User registered successfully', token });
       
        console.log('User registered successfully');
    } catch (error) {
        // Handle MongoDB duplicate key error
        if (error.code === 11000) {
            console.error('Duplicate username error:', error);
            return res.status(400).json({ message: 'Username already exists' });
        }

        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    registerUser,
};
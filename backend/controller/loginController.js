const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Register = require('../model/registerModel');

// Controller to handle user login
const loginUser = async (req, res) => {
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
        
        // Generate a JWT token
        const token = jwt.sign({ id: user._id, userName: user.userName }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Token expires in 1 hour
        });

        // If login is successful
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    loginUser,
};
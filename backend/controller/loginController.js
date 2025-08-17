const bcrypt = require('bcryptjs');
const Register = require('../model/registerModel');
const { generateAccessToken, generateRefreshToken } = require('../middleware/tokenUtils');

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
        
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/', // allow refresh token to be sent anywhere
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        // Send access token only
        return res.status(200).json({
            message: 'Login successful',
            token: accessToken,
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    loginUser,
};
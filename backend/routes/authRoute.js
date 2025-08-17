const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Register = require('../model/registerModel');

router.post('/refresh', async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: 'No refresh token provided' });
    console.log('Cookies:', req.cookies);
    console.log('Refresh token:', req.cookies.refreshToken);


    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const user = await Register.findById(decoded.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const newAccessToken = jwt.sign(
            { id: user._id, userName: user.userName },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }
});

module.exports = router;

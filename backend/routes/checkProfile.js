// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken'); // JWT verification middleware
const Profile = require('../model/profileModel');

// GET /api/profile/check
router.get('/check', verifyToken, async (req, res) => {
    try {
        const profile = await Profile.findOne({ userId: req.user.id });
        console.log('Checking profile for user ID:', req.user.id);
        const hasProfile = !!profile;
        res.status(200).json({ hasProfile: !!hasProfile });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

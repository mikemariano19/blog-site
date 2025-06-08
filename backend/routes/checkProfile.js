// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Profile = require('../model/UserModel');

// GET /api/profile/check
router.get('/check', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await Profile.findOne({ userId });
        const hasProfile = !!profile;
        res.status(200).json({ hasProfile });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

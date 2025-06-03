const express = require('express');
const router = express.Router();
const User = require('../model/User'); // Adjust path if needed

// ...existing code...

// GET /api/profile/check
router.get('/check', async (req, res) => {
    try {
        // You should get userId from authentication middleware in real apps
        // For demo, just return the first user
        const user = await User.findOne();
        if (!user) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../model/UserModel'); // Adjust path as needed

// Example: You should use authentication middleware to get userId from token
router.get('/check', async (req, res) => {
    try {
        // Replace this with your actual user identification logic
        // For demo, just check if any user exists
        const user = await User.findOne();
        if (user) {
            return res.json({ hasProfile: true });
        } else {
            return res.json({ hasProfile: false });
        }
    } catch (err) {
        return res.status(500).json({ hasProfile: false });
    }
});

module.exports = router;
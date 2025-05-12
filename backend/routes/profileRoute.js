const express = require('express');
const { checkProfile } = require('../controller/profileController');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

// Route to update profile
router.get('/check', verifyToken, checkProfile);

module.exports = router;
const express = require('express');
const { getUserData } = require('../controller/userController');
const verifyToken = require('../middleware/verifyToken'); // Middleware to verify the token

const router = express.Router();

// Route to get user data
router.get('/', verifyToken, getUserData);

module.exports = router;
const express = require('express');
const { loginUser } = require('../controller/registerController');

const router = express.Router();

// Route to handle user registration
router.post('/', loginUser);

module.exports = router;
const express = require('express');
const { registerUser } = require('../controller/registerController');

const router = express.Router();

// Route to handle user registration
router.post('/', registerUser);

module.exports = router;
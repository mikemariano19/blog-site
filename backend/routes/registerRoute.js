const express = require('express');
const register = require('../model/register');

const router = express.Router();

// Route to handle user registration
router.post('/', register);

module.exports = router;
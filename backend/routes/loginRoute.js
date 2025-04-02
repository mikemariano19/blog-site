const express = require('express');
const { loginUser } = require('../controller/loginController');

const router = express.Router();

// POST route for login
router.post('/', loginUser);

module.exports = router;
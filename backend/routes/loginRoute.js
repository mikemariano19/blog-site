const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const { loginUser } = require('../controller/loginController');

const router = express.Router();

// POST route for login
router.post('/', loginUser);

router.get('/newsfeed', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Welcome to the protected newsfeed!' });
});

module.exports = router;
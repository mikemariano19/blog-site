const express = require('express');
const { updateProfile } = require('../controller/profileController');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.post('/', verifyToken, updateProfile);

module.exports = router;
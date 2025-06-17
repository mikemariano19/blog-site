const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken'); // JWT verification middleware
const upload = require('../middleware/upload'); // if you handle file uploads

const {
  createProfile,
  checkProfile,
  getProfile,
  updateProfile
} = require('../controller/profileController');

// POST /api/profile — create a profile
router.post('/', verifyToken, upload.single('avatar'), createProfile);

// GET /api/profile/check — check if user has a profile
router.get('/check', verifyToken, checkProfile);

// GET /api/profile — get the logged-in user's profile
router.get('/', verifyToken, getProfile);

// PUT /api/profile — update profile
router.put('/', verifyToken, upload.single('avatar'), updateProfile);

module.exports = router;

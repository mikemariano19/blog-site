const express = require('express');
const multer = require('multer');
const path = require('path');
const profileController = require('../controller/profileController');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/avatars/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.post('/', upload.single('avatar'), profileController.createProfile);

module.exports = router;
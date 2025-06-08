const express = require('express');
const multer = require('multer');
const profileController = require('../controllers/profileController');
const auth = require('../middleware/verifyToken'); // Your JWT/auth middleware

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/avatars/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

router.post('/', auth, upload.single('avatar'), profileController.createProfile);

module.exports = router;
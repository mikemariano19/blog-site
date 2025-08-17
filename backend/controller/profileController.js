const fs = require('fs');
const Profile = require('../model/profileModel');
const Register = require('../model/registerModel');

// Create profile
exports.createProfile = async (req, res) => {
    try {
        const { firstName, lastName } = req.body;

        if (!firstName || !lastName) {
            return res.status(400).json({ message: 'First name and last name are required.' });
        }

        let avatar;
        if (req.file) {
            avatar = {
                data: fs.readFileSync(req.file.path),
                contentType: req.file.mimetype,
            };
        }

        const newProfile = await Profile.create({
            userId: req.user.id, // Make sure this is set if you use verifyToken
            firstName,
            lastName,
            avatar,
        });

       await Register.findByIdAndUpdate(req.user.id, {
            hasProfile: true,
            firstName: newProfile.firstName,
            lastName: newProfile.lastName,
        });
        
        res.status(200).json({
            message: 'Profile created successfully!',
            user: {
                firstName: newProfile.firstName,
                lastName: newProfile.lastName,
                avatar: newProfile.avatar,
            },
        });
        

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Check if profile exists
exports.checkProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ userId: req.user.id });
        res.status(200).json({ hasProfile: !!profile });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get profile
exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ userId: req.user.id });
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        console.log('Auth header:', req.headers.authorization);

        res.status(200).json(profile);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update profile
exports.updateProfile = async (req, res) => {
    try {
        const { firstName, lastName } = req.body;
        let updateData = { firstName, lastName };

        if (req.file) {
            updateData.avatar = {
                data: fs.readFileSync(req.file.path),
                contentType: req.file.mimetype,
            };
        }

        const updated = await Profile.findOneAndUpdate(
            { userId: req.user.id },
            updateData,
            { new: true }
        );

        res.status(200).json({ message: 'Profile updated', updated });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

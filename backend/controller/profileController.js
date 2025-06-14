const fs = require('fs');
const User = require('../model/UserModel');

exports.createProfile = async (req, res) => {
    try {
        const { firstName, lastName } = req.body;

        if (!firstName || !lastName) {
            return res.status(400).json({ message: 'First name and last name are required.' });
        }

        let avatar = undefined;
        if (req.file) {
            avatar = {
                data: fs.readFileSync(req.file.path),
                contentType: req.file.mimetype,
            };
        }

        const user = await User.create({
            firstName,
            lastName,
            avatar,
        });

        res.status(200).json({
            message: 'Profile created successfully!',
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                avatar: user.avatar,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};
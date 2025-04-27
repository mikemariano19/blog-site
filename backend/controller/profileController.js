const User = require('../model/register');

const updateProfile = async (req, res) => {
    const { firstName, lastName } = req.body;
    const userId = req.user.id; // Assuming the user ID is extracted from the token

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.firstName = firstName;
        user.lastName = lastName;
        await user.save();

        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { updateProfile };
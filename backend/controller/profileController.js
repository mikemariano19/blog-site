const Register = require('../model/register');

// Check if the user has a profile
const checkProfile = async (req, res) => {
    const userId = req.user.id; // Assuming user ID is extracted from the token

    try {
        const user = await Register.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if profile fields are filled
        if (!user.firstName || !user.lastName || !user.about) {
            return res.status(200).json({ hasProfile: false });
        }

        res.status(200).json({ hasProfile: true });
    } catch (error) {
        console.error('Error checking profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { checkProfile };
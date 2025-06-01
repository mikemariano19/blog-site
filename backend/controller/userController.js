const Register = require('../model/registerModel');

const getUserData = async (req, res) => {
    try {
        // Assuming the user ID is passed in the request (e.g., from a token or query)
        const userId = req.user.id; // Replace with actual logic to get user ID
        const user = await Register.findById(userId).select('-password'); // Exclude the password

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getUserData };
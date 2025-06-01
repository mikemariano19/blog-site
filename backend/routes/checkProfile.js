router.get('/check', async (req, res) => {
    // Example: get user from token or session
    // const userId = req.user.id; // If using auth middleware
    // For demo, just return a dummy user or fetch from DB
    try {
        // Replace with your logic to get the current user
        const user = await User.findOne(); // Or find by userId
        if (!user) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
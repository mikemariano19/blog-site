const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Authorization Header:', authHeader); // Log the Authorization header

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // console.log('No token provided or invalid format');
        return res.status(401).json({ message: 'No token provided' });
    }

    const [, token] = authHeader.split(' ')[1]; // Extract the token
    if (!token) return res.status(401).json({ message: 'No token provided' });
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id, userName: decoded.userName };
        return next();
    } catch (error) {
        // console.log('Invalid token:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = verifyToken; 
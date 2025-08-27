const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  return jwt.sign(
    { id: user._id, userName: user.userName }, process.env.JWT_SECRET, { expiresIn: '1h' }
  );
}

function generateRefreshToken(userId) {
  return jwt.sign({ userId, }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

module.exports = { generateAccessToken, generateRefreshToken };

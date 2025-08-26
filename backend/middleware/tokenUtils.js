const jwt = require('jsonwebtoken');

function generateAccessToken(userId, userName) {
  return jwt.sign({ userId, userName }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

function generateRefreshToken(userId) {
  return jwt.sign({ userId, }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

module.exports = { generateAccessToken, generateRefreshToken };

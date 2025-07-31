const jwt = require('jsonwebtoken');

const token = jwt.sign({ id: '6866922addda3e9256bef0ff' }, 'mernappsecret', { expiresIn: '1h' });
console.log(token);

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, userName: user.userName },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};

module.exports = { generateAccessToken, generateRefreshToken };

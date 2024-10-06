const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key';

const generateToken = (name) => {
  const token = jwt.sign({ name }, secretKey, { expiresIn: '1h' });
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
const express = require('express');
const router = express.Router();
const { generateToken, verifyToken } = require('./auth');

router.get('/token', (req, res) => {
  const name = req.body.name;
  const token = generateToken(name);
  res.json({ token });
});

router.post('/verify-token', (req, res) => {
  const token = req.body.token;
  const decoded = verifyToken(token);
  if (decoded) {
    res.json({ message: 'Token is valid' });
  } else {
    res.status(401).json({ message: 'Token is invalid' });
  }
});

module.exports = router;
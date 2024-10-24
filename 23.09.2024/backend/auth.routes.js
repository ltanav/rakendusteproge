const express = require('express');
const router = express.Router();
const { generateToken, verifyToken } = require('./auth');
const { validateToken, validateName } = require('./validation');

router.post('/token', validateName, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const name = req.body.name;
  const token = generateToken(name);
  res.json({ token });
});

router.post('/verify-token', validateToken, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const token = req.body.token;
  const decoded = verifyToken(token);
  if (decoded) {
    res.json({ message: 'Token is valid' });
  } else {
    res.status(401).json({ message: 'Token is invalid' });
  }
});

module.exports = router;
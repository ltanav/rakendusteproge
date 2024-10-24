const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const JWT_SECRET = 'your_secret_key_here'; // In production, use an environment variable

// Validation middleware
const validateName = [
  check('name').isLength({ min: 1 }).withMessage('Name is required'),
];

const validateToken = [
  check('token').isLength({ min: 1 }).withMessage('Token is required'),
];

// GET endpoint to generate a token
router.get('/generate', validateName, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  const token = jwt.sign({ name }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// POST endpoint to verify a token
router.post('/verify', validateToken, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { token } = req.body;
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ valid: true, decoded });
  } catch (error) {
    res.json({ valid: false, error: error.message });
  }
});

module.exports = router;
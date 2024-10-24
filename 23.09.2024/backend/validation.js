const { check, validationResult } = require('express-validator');

const validateToken = [
  check('token').isLength({ min: 1 }).withMessage('Token is required'),
];

const validateName = [
  check('name').isLength({ min: 1 }).withMessage('Name is required'),
];

module.exports = { validateToken, validateName };
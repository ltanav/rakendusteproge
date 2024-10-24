import express from 'express';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import Todo from '../models/Todo.js';

const router = express.Router();

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Validation middleware
const validateName = [
  check('name').notEmpty().withMessage('Name is required'),
];

const validateToken = [
  check('token').notEmpty().withMessage('Token is required'),
];

const validateTodo = [
  check('title').notEmpty().withMessage('Title is required'),
  check('priority').isInt({ min: 1, max: 5 }).withMessage('Priority must be between 1 and 5'),
];

// GET endpoint to generate a token
router.get('/generate-token', validateName, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  const token = jwt.sign({ name }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// POST endpoint to verify a token
router.post('/verify-token', validateToken, (req, res) => {
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

// GET all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: { deleted: false },
      order: [['priority', 'DESC'], ['createdAt', 'DESC']]
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving todos", error: error.message });
  }
});

// POST create a new todo
router.post('/', validateTodo, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, priority } = req.body;
    const newTodo = await Todo.create({ title, priority });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: "Error creating todo", error: error.message });
  }
});

// PUT update a todo
router.put('/:id', validateTodo, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, priority } = req.body;
    const updated = await Todo.update(
      { title, priority },
      { where: { id: req.params.id, deleted: false } }
    );
    if (updated[0] === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }
    const updatedTodo = await Todo.findByPk(req.params.id);
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: "Error updating todo", error: error.message });
  }
});

// DELETE a todo (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Todo.update(
      { deleted: true },
      { where: { id: req.params.id, deleted: false } }
    );
    if (deleted[0] === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error: error.message });
  }
});

export default router;
const Todo = require('../models/todo');

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({ where: { deleted: false } });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching todos' });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findOne({ where: { id, deleted: false } });
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
    } else {
      res.json(todo);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching todo' });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Error creating todo' });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findOne({ where: { id, deleted: false } });
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
    } else {
      todo.update(req.body);
      res.json(todo);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating todo' });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findOne({ where: { id, deleted: false } });
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
    } else {
      todo.update({ deleted: true });
      res.json({ message: 'Todo deleted' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting todo' });
  }
};
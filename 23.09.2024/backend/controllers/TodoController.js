import Todo from '../models/Todo';

class TodoController {
  async getAll(req, res) {
    try {
      const todos = await Todo.findAll({
        where: {
          deleted: false,
        },
      });
      res.json(todos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching todos' });
    }
  }

  async create(req, res) {
    try {
      if (!req.body.title || !req.body.priority) {
        res.status(400).json({ message: 'Title and priority are required' });
        return;
      }

      const todo = await Todo.create(req.body);
      res.json(todo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating todo' });
    }
  }

  async update(req, res) {
    try {
      if (!req.body.title || !req.body.priority) {
        res.status(400).json({ message: 'Title and priority are required' });
        return;
      }

      const todo = await Todo.findByPk(req.params.id);
      if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
      } else {
        await todo.update(req.body);
        res.json(todo);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating todo' });
    }
  }

  async delete(req, res) {
    try {
      const todo = await Todo.findByPk(req.params.id);
      if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
      } else {
        await todo.update({ deleted: true });
        res.json({ message: 'Todo deleted' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting todo' });
    }
  }
}

export default TodoController;
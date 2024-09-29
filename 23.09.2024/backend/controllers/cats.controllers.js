import Cat from '../models/Cat';

class CatController {
  async getAll(req, res) {
    try {
      const cats = await Cat.findAll({
        where: {
          deleted: false,
        },
      });
      res.json(cats);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cats' });
    }
  }

  async create(req, res) {
    try {
      const cat = await Cat.create(req.body);
      res.json(cat);
    } catch (error) {
      res.status(500).json({ message: 'Error creating cat' });
    }
  }

  async update(req, res) {
    try {
      const cat = await Cat.findByPk(req.params.id);
      if (!cat) {
        res.status(404).json({ message: 'Cat not found' });
      } else {
        await cat.update(req.body);
        res.json(cat);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating cat' });
    }
  }

  async delete(req, res) {
    try {
      const cat = await Cat.findByPk(req.params.id);
      if (!cat) {
        res.status(404).json({ message: 'Cat not found' });
      } else {
        await cat.update({ deleted: true });
        res.json({ message: 'Cat deleted' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting cat' });
    }
  }
}

export default CatController;
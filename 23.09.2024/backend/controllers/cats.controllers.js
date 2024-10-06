const Cat = require('../models/cat');

exports.getCats = async (req, res) => {
  try {
    const cats = await Cat.findAll({ where: { deleted: false } });
    res.json(cats);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cats' });
  }
};

exports.getCat = async (req, res) => {
  try {
    const id = req.params.id;
    const cat = await Cat.findOne({ where: { id, deleted: false } });
    if (!cat) {
      res.status(404).json({ message: 'Cat not found' });
    } else {
      res.json(cat);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cat' });
  }
};

exports.createCat = async (req, res) => {
  try {
    const cat = await Cat.create(req.body);
    res.json(cat);
  } catch (err) {
    res.status(500).json({ message: 'Error creating cat' });
  }
};

exports.updateCat = async (req, res) => {
  try {
    const id = req.params.id;
    const cat = await Cat.findOne({ where: { id, deleted: false } });
    if (!cat) {
      res.status(404).json({ message: 'Cat not found' });
    } else {
      cat.update(req.body);
      res.json(cat);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating cat' });
  }
};

exports.deleteCat = async (req, res) => {
  try {
    const id = req.params.id;
    const cat = await Cat.findOne({ where: { id, deleted: false } });
    if (!cat) {
      res.status(404).json({ message: 'Cat not found' });
    } else if (cat.deleted) {
      res.status(400).json({ message: 'Cat is already deleted' });
    } else {
      cat.update({ deleted: true });
      res.json({ message: 'Cat deleted' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting cat' });
  }
};
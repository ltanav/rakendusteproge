import express from 'express';
import CatController from '../controllers/CatController';
import TodoController from '../controllers/TodoController';

const router = express.Router();

router.get('/cats', CatController.getAll);
router.post('/cats', CatController.create);
router.put('/cats/:id', CatController.update);
router.delete('/cats/:id', CatController.delete);

router.get('/todos', TodoController.getAll);
router.post('/todos', TodoController.create);
router.put('/todos/:id', TodoController.update);
router.delete('/todos/:id', TodoController.delete);

export default router;
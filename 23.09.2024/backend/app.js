import express from 'express';
import sequelize from './sequelize';
import Cat from './models/Cat';
import Todo from './models/Todo';
import routes from './routes';

const app = express();

app.use(express.json());
app.use('/api', routes);

Cat.init(sequelize);
Todo.init(sequelize);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
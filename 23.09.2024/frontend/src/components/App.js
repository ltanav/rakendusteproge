import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import Cat from './Cat';
import Todo from './Todo';

const App = () => {
  const [cats, setCats] = useState([]);
  const [todos, setTodos] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/cats')
      .then(response => response.json())
      .then(data => setCats(data));

    fetch('http://localhost:3000/api/todos')
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

  const handleUpdateCat = (id) => {
    setSelectedCat(cats.find(cat => cat.id === id));
  };

  const handleDeleteCat = (id) => {
    fetch(`http://localhost:3000/api/cats/${id}`, { method: 'DELETE' })
      .then(() => {
        setCats(cats.filter(cat => cat.id !== id));
      });
  };

  const handleUpdateTodo = (id) => {
    setSelectedTodo(todos.find(todo => todo.id === id));
  };

  const handleDeleteTodo = (id) => {
    fetch(`http://localhost:3000/api/todos/${id}`, { method: 'DELETE' })
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      });
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>Cats</h1>
          {cats.map(cat => (
            <Cat key={cat.id} cat={cat} handleUpdate={handleUpdateCat} handleDelete={handleDeleteCat} />
          ))}
        </Grid>
        <Grid item xs={12}>
          <h1>TODOs</h1>
          {todos.map(todo => (
            <Todo key={todo.id} todo={todo} handleUpdate={handleUpdateTodo} handleDelete={handleDeleteTodo} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import Cat from './Cat';
import Todo from './Todo';

const App = () => {
  const [cats, setCats] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/cats')
      .then(response => response.json())
      .then(data => setCats(data));

    fetch('http://localhost:3000/api/todos')
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

  const handleUpdateCat = (id, data) => {
    fetch(`http://localhost:3000/api/cats/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  const handleDeleteCat = (id) => {
    fetch(`http://localhost:3000/api/cats/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  const handleUpdateTodo = (id, data) => {
    fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  const handleDeleteTodo = (id) => {
    fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  return (
    <Container>
      <h1>Cats</h1>
      {cats.map((cat) => (
        <Cat key={cat.id} cat={cat} handleUpdate={handleUpdateCat} handleDelete={handleDeleteCat} />
      ))}
      <h1>TODOs</h1>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} handleUpdate={handleUpdateTodo} handleDelete={handleDeleteTodo} />
      ))}
    </Container>
  );
};

export default App;
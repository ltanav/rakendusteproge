import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Snackbar, Typography } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Cat from './Cat';
import Todo from './Todo';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#333',
    },
    secondary: {
      main: '#666',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#f0f0f0',
    },
  },
});

// Custom styles
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
  },
}));

const App = () => {
  const classes = useStyles();
  const [cats, setCats] = useState([]);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catResponse = await fetch('http://localhost:3000/api/cats');
        const catData = await catResponse.json();
        setCats(catData);

        const todoResponse = await fetch('http://localhost:3000/api/todos');
        const todoData = await todoResponse.json();
        setTodos(todoData);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateCat = async (id, data) => {
    try {
      const response = await fetch(`http://localhost:3000/api/cats/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const updatedCat = await response.json();
      setCats(cats.map(cat => (cat.id === id ? updatedCat : cat)));
    } catch (error) {
      setError('Failed to update cat');
    }
  };

  const handleDeleteCat = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/cats/${id}`, {
        method: 'DELETE',
      });
      setCats(cats.filter(cat => cat.id !== id));
    } catch (error) {
      setError('Failed to delete cat');
    }
  };

  const handleUpdateTodo = async (id, data) => {
    try {
      const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      setError('Failed to update todo');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      setError('Failed to delete todo');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.container}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h4" color="primary">Cats</Typography>
            {cats.map((cat) => (
              <Cat key={cat.id} cat={cat} handleUpdate={handleUpdateCat} handleDelete={handleDeleteCat} />
            ))}
            <Typography variant="h4" color="primary">TODOs</Typography>
            {todos.map((todo) => (
              <Todo key={todo.id} todo={todo} handleUpdate={handleUpdateTodo} handleDelete={handleDeleteTodo} />
            ))}
          </>
        )}
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

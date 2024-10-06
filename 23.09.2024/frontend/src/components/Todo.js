import React from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';

const Todo = ({ todo, handleUpdate, handleDelete }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {todo.title}
        </Typography>
        <Typography variant="body1" component="p">
          Priority: {todo.priority}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleUpdate(todo.id)}>
          Update
        </Button>
        <Button variant="contained" color="secondary" onClick={() => handleDelete(todo.id)}>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default Todo;
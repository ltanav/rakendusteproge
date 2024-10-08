import React from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';

const Cat = ({ cat, handleUpdate, handleDelete }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {cat.name}
        </Typography>
        <Typography variant="body1" component="p">
          Age: {cat.age}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleUpdate(cat.id)}>
          Update
        </Button>
        <Button variant="contained" color="secondary" onClick={() => handleDelete(cat.id)}>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default Cat;
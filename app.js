const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/tasks', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/tasks', taskRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

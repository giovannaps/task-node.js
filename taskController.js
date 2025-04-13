const Task = require('../models/Task');
const csv = require('csv-parser');
const fs = require('fs');

exports.create = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
};

exports.getAll = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

exports.update = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!task) return res.status(404).send('Task not found');
  res.json(task);
};

exports.delete = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).send();
};

exports.markComplete = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, { completed: true }, { new: true });
  if (!task) return res.status(404).send('Task not found');
  res.json(task);
};

exports.importCSV = async (req, res) => {
  const tasks = [];
  fs.createReadStream(req.file.path)
    .pipe(csv(['title', 'description']))
    .on('data', (row) => {
      tasks.push({
        title: row.title,
        description: row.description || ''
      });
    })
    .on('end', async () => {
      const created = await Task.insertMany(tasks);
      res.status(201).json(created);
    });
};

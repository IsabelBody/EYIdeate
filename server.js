// server.js
const express = require('express');
const fs = require('fs');
const app = express();
const port = 4000;

app.use(express.json());

app.get('/recipes', (req, res) => {
  const data = fs.readFileSync('./data/db.json', 'utf-8');
  res.json(JSON.parse(data).recipes);
});

app.post('/recipes', (req, res) => {
  const newRecipe = req.body;
  const data = JSON.parse(fs.readFileSync('./data/db.json', 'utf-8'));
  data.recipes.push(newRecipe);
  fs.writeFileSync('./data/db.json', JSON.stringify(data, null, 2));
  res.status(201).json({ message: 'Recipe added successfully!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

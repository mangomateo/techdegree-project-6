const express = require('express');
const app = express();
const projectData = require('./data.json');
const port = 3000;

// Set view engine to pug
app.set('view engine', 'pug');

// Load static files to the application
app.use(express.static('public'));

// Route handler for landing page with project data set as the locals paramater
app.get('/', (req, res) => {
  res.render('index', { projectData });
});

app.get('/about', (req, res) => {
  res.render('about');
});

// Dynamic route that will load page with customized project data based on the ID entered in the URL
app.get('/:id', (req, res) => {
  res.render('project', { projectData });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
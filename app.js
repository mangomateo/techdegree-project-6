const express = require('express');
const app = express();
const projectData = require('./data.json');
const { projects } = projectData;
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
app.get('/projects/:id', (req, res) => {
  res.render('project', { 
                          name: projects[req.params.id].project_name,
                          desc: projects[req.params.id].description,     
                          techs: projects[req.params.id].technologies,
                          liveLink: projects[req.params.id].live_link,
                          repoLink: projects[req.params.id].github_link,
                          imgOne: projects[req.params.id].image_urls[0],
                          imgTwo: projects[req.params.id].image_urls[1],
                          imgThree: projects[req.params.id].image_urls[2]
                        });
});

// 404 Error if a non-existent route is entered
app.use((req, res, next) => {
  const err = new Error(`Sorry, I haven't gotten around to building that page yet...`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.render('page-not-found', { err });
});

// Global error handler?

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
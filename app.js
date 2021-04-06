const express = require('express');
const app = express();
const projectData = require('./data.json');
const { projects } = projectData;
const port = process.env.PORT || 3000;

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
  const id = req.params.id;
  res.render('project', { 
                          name: projects[id].project_name,
                          desc: projects[id].description,     
                          techs: projects[id].technologies,
                          liveLink: projects[id].live_link,
                          repoLink: projects[id].github_link,
                          imgOne: projects[id].image_urls[0],
                          imgTwo: projects[id].image_urls[1],
                          imgThree: projects[id].image_urls[2]
                        });
});

// Capture 404 errors
app.use((req, res, next) => {
  const err = new Error('Page not found!');
  err.status = 404;
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  if (err.status === 404) {
    console.log('ERROR: PAGE NOT FOUND');
    res.status(404).render('page-not-found', { err });
  } else {
    console.log('ERROR: SOMETHING WENT WRONG');
    err.message = 'Something went wrong!';
    err.status = 500;
    res.status(500).render('error', { err });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
const express = require('express');
const db = require('./database');

const app = express();
const port = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

// Serve static assets from the "public" directory
app.use(express.static('public'));

// Define routes

// Render the form
app.get('/', (req, res) => {
  res.render('index');
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { name } = req.body;

  // Insert data into the "users" table
  const sql = 'INSERT INTO users (name) VALUES (?)';
  db.run(sql, [name], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error inserting data into database');
    } else {
      res.redirect('/success');
    }
  });
});

// Render the success page
app.get('/success', (req, res) => {
  res.render('success');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

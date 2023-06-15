const sqlite3 = require('sqlite3').verbose();

// Open SQLite database
const db = new sqlite3.Database('./db/data.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Create the "users" table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT
)`);

module.exports = db;

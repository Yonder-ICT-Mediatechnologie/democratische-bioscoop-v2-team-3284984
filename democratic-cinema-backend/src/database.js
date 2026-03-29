/*
 * Simple SQLite database initialisation.  This module opens a connection
 * to a local SQLite file and ensures the necessary tables exist.  It
 * exports the database instance for use by service modules.  For
 * persistent storage, the database file lives next to the source code.
 */

const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Compute the path to the SQLite database file.  You can change the
// location by editing the filename below; using a relative path stores
// the database in the root of the refactored_server directory.
const dbPath = path.join(__dirname, '..', 'database.sqlite');

// Open the database.  If the file does not exist it will be created.
const db = new sqlite3.Database(dbPath, err => {
  if (err) {
    console.error('Failed to open SQLite database', err);
  }
});

// Create the admins table if it does not already exist.  The table
// stores a unique login and a password.  In production you should
// hash passwords; plain text storage is used here for simplicity.
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      login TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )`,
    err => {
      if (err) {
        console.error('Failed to create admins table', err);
      }
    }
  );
});

module.exports = db;
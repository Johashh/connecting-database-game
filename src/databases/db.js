const sqlite3 = require("sqlite3").verbose();
const dbName = "game.db";

const db = new sqlite3.Database(dbName, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Connected to the database ${dbName}`);
  }
});

module.exports = db;

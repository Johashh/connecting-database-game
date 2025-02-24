const express = require("express");
const app = express();
const configureRouter = require("./src/routes");
const db = require("./src/databases/db");
const { exec } = require("child_process");
const path = require("path");

app.use(express.json());
app.use(configureRouter());

const isDev = false;

const exeDir = path.dirname(process.execPath);
const exePath = isDev? path.join(__dirname, "game.exe"): path.join(exeDir, "game.exe");

const startGame = () => {
  exec(`"${exePath}"`, function (err, stdout, stderr) {
    if (err) {
      console.log(err);
      return;
    }

    // Apenas aqui stdout está definido
    console.log(stdout);
  });
};

const server = app.listen(8080, () => {
  console.log("Listening at http:localhost:8080");
});

// --------------------------------------------------------------------------------

const sql = `CREATE TABLE IF NOT EXISTS player(
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                name char(50) NOT NULL,
                sprite char(50) NOT NULL
            );`;

db.run(sql, [], (err) => {
  if (err) {
    console.log(err.message);
  }

  console.log("Game starting");
  startGame();
  return;
});

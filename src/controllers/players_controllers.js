const db = require("../databases/db");

const postPlayer = (req, res) => {
  let sql = `INSERT INTO player (name, sprite) VALUES (?, ?)`;
  let params = [req.body.name, req.body.sprite];

  db.run(sql, params, (err) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log(
      `Added player with name ${req.body.name} and sprite ${req.body.sprite}.`
    );

    sql = `SELECT id from player
            WHERE name = ?`;

    let params = [req.body.name];
    db.get(sql, params, (err, row) => {
      if (err) {
        console.log(err.message);
        return;
      }

      res.end(row.id.toString());
    });
  });
};

const getPlayers = (req, res) => {
  const sql = `SELECT id, name, sprite FROM player`;

  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      console.log(err.message);
      return;
    }

    console.log("Fetched some rows");

    res.end(JSON.stringify(rows));
  });
};

const getPlayer = (req, res) => {
  const sql = `SELECT id, name, sprite FROM player WHERE id = ${req.params.id}`;

  const params = [];
  db.all(sql, params, (err, row) => {
    if (err) {
      console.log(err.message);
      return;
    }

    res.end(JSON.stringify(row));
  });
};

const deletePlayer = (req, res) => {
  const sql = `DELETE FROM player WHERE id = ${req.params.id}`;

  const params = [];
  db.run(sql, params, (err) => {
    if (err) {
      console.log(err.message);
      return;
    }

    console.log(`Deleted player with id ${req.params.id}`);
    res.end();
  });
};

const putPlayer = (req, res) => {
  const sql = `UPDATE player set name = ?, sprite = ? WHERE id = ${req.params.id}`;
  const params = [req.body.name, req.body.sprite];

  db.run(sql, params, (err) => {
    if (err) {
      console.log(err.message);
      return;
    }

    console.log(`Update player with id ${req.params.id}`);
    res.end();
  });
};

module.exports = {
  postPlayer,
  getPlayer,
  getPlayers,
  deletePlayer,
  putPlayer,
};

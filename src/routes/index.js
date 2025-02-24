const express = require("express");
const router = express.Router();
const controller = require("../controllers/players_controllers");

const configureRouter = () => {
  router.post("/players/", controller.postPlayer);
  router.get("/players/", controller.getPlayers);
  router.get("/players/:id", controller.getPlayer);
  router.delete("/players/:id", controller.deletePlayer);
  router.put("/players/:id", controller.putPlayer);
  return router;
};

module.exports = configureRouter;

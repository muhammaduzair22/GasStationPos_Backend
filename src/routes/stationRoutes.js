// routes/stationRoutes.js
const express = require("express");
const router = express.Router();
const stationController = require("../controllers/stationController");

router.post("/", stationController.createStation);
router.get("/", stationController.getStations);
router.get("/:id", stationController.getStationById);
router.put("/:id", stationController.updateStation);
router.delete("/:id", stationController.deleteStation);

module.exports = router;

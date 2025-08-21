// controllers/stationController.js
const Station = require("../models/Station");

// Create a new station
exports.createStation = async (req, res) => {
  try {
    const { name, location } = req.body;
    const station = await Station.create({ name, location });
    res.status(201).json(station);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating station", error: err.message });
  }
};

// Get all stations
exports.getStations = async (req, res) => {
  try {
    const stations = await Station.findAll();
    res.json(stations);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching stations", error: err.message });
  }
};

// Get station by ID
exports.getStationById = async (req, res) => {
  try {
    const station = await Station.findByPk(req.params.id);
    if (!station) return res.status(404).json({ message: "Station not found" });
    res.json(station);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching station", error: err.message });
  }
};

// Update station
exports.updateStation = async (req, res) => {
  try {
    const { name, location } = req.body;
    const station = await Station.findByPk(req.params.id);
    if (!station) return res.status(404).json({ message: "Station not found" });

    station.name = name || station.name;
    station.location = location || station.location;
    await station.save();

    res.json(station);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating station", error: err.message });
  }
};

// Delete station
exports.deleteStation = async (req, res) => {
  try {
    const station = await Station.findByPk(req.params.id);
    if (!station) return res.status(404).json({ message: "Station not found" });

    await station.destroy();
    res.json({ message: "Station deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting station", error: err.message });
  }
};

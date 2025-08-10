const MasterRecord = require("../models/MasterRecord");

// Create
exports.createRecord = async (req, res) => {
  try {
    const record = await MasterRecord.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read All
exports.getAllRecords = async (req, res) => {
  try {
    const records = await MasterRecord.findAll();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read One
exports.getRecordById = async (req, res) => {
  try {
    const record = await MasterRecord.findByPk(req.params.id);
    if (!record) return res.status(404).json({ error: "Record not found" });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateRecord = async (req, res) => {
  try {
    const record = await MasterRecord.findByPk(req.params.id);
    if (!record) return res.status(404).json({ error: "Record not found" });

    await record.update(req.body);
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.deleteRecord = async (req, res) => {
  try {
    const record = await MasterRecord.findByPk(req.params.id);
    if (!record) return res.status(404).json({ error: "Record not found" });

    await record.destroy();
    res.json({ message: "Record deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

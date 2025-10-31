const NozzleReading = require("../models/NozzleReading");
const { Expenditure, MasterRecord } = require("../models");

// --- Helper: Apply station restriction for manager ---
function getStationWhere(user, baseWhere = {}) {
  if (user.role === "manager") {
    return { ...baseWhere, stationId: user.stationId };
  }
  return baseWhere; // admin, partner → unrestricted
}

// --- Create ---
exports.createRecord = async (req, res) => {
  try {
    // Enforce stationId for manager
    if (req.user.role === "manager") {
      req.body.stationId = req.user.stationId;
    }

    const {
      NozzleReadings = [],
      Expenditures = [],
      ...recordData
    } = req.body || {};

    // 1. Create master record
    const record = await MasterRecord.create(recordData);

    // 2. Nozzle readings
    if (Array.isArray(NozzleReadings)) {
      for (const nozzle of NozzleReadings) {
        await NozzleReading.create({
          nozzleNumber: nozzle.nozzleNumber
            ? Number(nozzle.nozzleNumber)
            : null,
          openingGirary: nozzle.openingGirary ?? null,
          closingGirary: nozzle.closingGirary ?? null,
          openingScreen: nozzle.openingScreen ?? null,
          closingScreen: nozzle.closingScreen ?? null,
          masterRecordId: record.id,
        });
      }
    }

    // 3. Expenditures
    if (Array.isArray(Expenditures)) {
      for (const exp of Expenditures) {
        await Expenditure.create({
          description: exp.description,
          category: exp.category,
          subcategory: exp.subcategory,
          amount: exp.amount,
          masterRecordId: record.id,
        });
      }
    }

    const fullRecord = await MasterRecord.findByPk(record.id, {
      include: [NozzleReading, Expenditure],
    });

    res.status(201).json(fullRecord);
  } catch (err) {
    console.error("Error creating record:", err);
    res.status(500).json({ error: err.message });
  }
};

// --- Read All ---
exports.getAllRecords = async (req, res) => {
  try {
    const where = getStationWhere(req.user);
    const records = await MasterRecord.findAll({
      where,
      include: [NozzleReading, Expenditure],
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Read One ---
exports.getRecordById = async (req, res) => {
  try {
    const where = getStationWhere(req.user, { id: req.params.id });
    const record = await MasterRecord.findOne({
      where,
      include: [NozzleReading, Expenditure],
    });

    if (!record) return res.status(404).json({ error: "Record not found" });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Update ---
exports.updateRecord = async (req, res) => {
  try {
    const where = getStationWhere(req.user, { id: req.params.id });
    const record = await MasterRecord.findOne({ where });
    if (!record) return res.status(404).json({ error: "Record not found" });

    if (req.user.role === "manager") {
      delete req.body.stationId; // prevent managers changing station
    }

    const { NozzleReadings = [], Expenditures = [], ...recordData } = req.body;

    // 1. Update master record
    await record.update(recordData);

    // 2. Refresh nozzle readings
    await NozzleReading.destroy({ where: { masterRecordId: record.id } });
    for (const nozzle of NozzleReadings) {
      await NozzleReading.create({
        nozzleNumber: nozzle.nozzleNumber,
        openingGirary: nozzle.openingGirary,
        closingGirary: nozzle.closingGirary,
        openingScreen: nozzle.openingScreen,
        closingScreen: nozzle.closingScreen,
        masterRecordId: record.id,
      });
    }

    // 3. Refresh expenditures
    await Expenditure.destroy({ where: { masterRecordId: record.id } });
    for (const exp of Expenditures) {
      await Expenditure.create({
        description: exp.description,
        category: exp.category,
        subcategory: exp.subcategory,
        amount: exp.amount,
        masterRecordId: record.id,
      });
    }

    const updatedRecord = await MasterRecord.findByPk(record.id, {
      include: [NozzleReading, Expenditure],
    });

    res.json(updatedRecord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- Delete ---
exports.deleteRecord = async (req, res) => {
  try {
    const where = getStationWhere(req.user, { id: req.params.id });
    const record = await MasterRecord.findOne({ where });
    if (!record) return res.status(404).json({ error: "Record not found" });

    await NozzleReading.destroy({ where: { masterRecordId: record.id } });
    await Expenditure.destroy({ where: { masterRecordId: record.id } });
    await record.destroy();

    res.json({ message: "Record deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

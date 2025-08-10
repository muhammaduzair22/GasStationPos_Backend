const pool = require('../config/db');

// Get all records
exports.getAllRecords = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM master_records ORDER BY received_date');

  let masterCounter = 1;
  const subCounters = {};

  const processed = rows.map((row) => {
    const ww = row.ww_bill_code;
    if (!subCounters[ww]) subCounters[ww] = 1;
    else subCounters[ww]++;

    return {
      ...row,
      master_counter: masterCounter++,
      sub_no: subCounters[ww],
    };
  });

  res.json(processed);
};

// Get a single record
exports.getRecordById = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM master_records WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
};

// Create a new record
exports.createRecord = async (req, res) => {
  const data = req.body;
  const [result] = await pool.query('INSERT INTO master_records SET ?', [data]);
  res.status(201).json({ message: 'Record created', id: result.insertId });
};

// Update a record
exports.updateRecord = async (req, res) => {
  const [result] = await pool.query('UPDATE master_records SET ? WHERE id = ?', [req.body, req.params.id]);
  res.json({ message: 'Record updated' });
};

// Delete a record
exports.deleteRecord = async (req, res) => {
  await pool.query('DELETE FROM master_records WHERE id = ?', [req.params.id]);
  res.json({ message: 'Record deleted' });
};

exports.getAllRecordsWithCounters = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM master_records ORDER BY received_date');

  let masterCounter = 1;
  const subCounters = {};

  const processed = rows.map((row) => {
    const ww = row.ww_bill_code;
    if (!subCounters[ww]) subCounters[ww] = 1;
    else subCounters[ww]++;

    return {
      ...row,
      master_counter: masterCounter++,
      sub_no: subCounters[ww],
    };
  });

  res.json(processed);
};
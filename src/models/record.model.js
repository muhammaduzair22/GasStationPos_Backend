const pool = require('../config/db');

const getAllRecords = async () => {
  const [rows] = await pool.query('SELECT * FROM records');
  return rows;
};

const insertRecord = async (record) => {
  const [result] = await pool.query(
    'INSERT INTO records (name, value) VALUES (?, ?)',
    [record.name, record.value]
  );
  return result;
};

const bulkInsertRecords = async (records) => {
  const values = records.map((r) => [r.name, r.value]);
  const [result] = await pool.query(
    'INSERT INTO records (name, value) VALUES ?',
    [values]
  );
  return result;
};

module.exports = {
  getAllRecords,
  insertRecord,
  bulkInsertRecords,
};

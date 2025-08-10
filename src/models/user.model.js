const pool = require('../config/db');

// Get all users
const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT id, first_name, last_name, username, role, created_at, updated_at FROM users');
  return rows;
};

// Get one user by ID
const getUserById = async (id) => {
  const [rows] = await pool.query(
    'SELECT id, first_name, last_name, username, role, created_at, updated_at FROM users WHERE id = ?',
    [id]
  );
  return rows[0];
};

// Create a user
const createUser = async ({ first_name, last_name, username, password, role }) => {
  const [result] = await pool.query(
    'INSERT INTO users (first_name, last_name, username, password, role) VALUES (?, ?, ?, ?, ?)',
    [first_name, last_name, username, password, role || 'user']
  );
  return result;
};

// Update a user
const updateUser = async (id, { first_name, last_name, username, password, role }) => {
  const fields = [];
  const values = [];

  if (first_name) {
    fields.push('first_name = ?');
    values.push(first_name);
  }
  if (last_name) {
    fields.push('last_name = ?');
    values.push(last_name);
  }
  if (username) {
    fields.push('username = ?');
    values.push(username);
  }
  if (password) {
    fields.push('password = ?');
    values.push(password);
  }
  if (role) {
    fields.push('role = ?');
    values.push(role);
  }

  values.push(id);
  const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;

  const [result] = await pool.query(query, values);
  return result;
};

// Delete a user
const deleteUser = async (id) => {
  const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
  return result;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

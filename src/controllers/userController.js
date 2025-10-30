const bcrypt = require("bcrypt");
const { User, Station } = require("../models");

// Create new user (manager, admin, partner)
exports.createUser = async (req, res) => {
  try {
    const { username, password, role, stationId } = req.body;

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      role: role || "manager", // default manager
      stationId: stationId || null,
    });

    res.status(201).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Station, attributes: ["id", "name", "location"] }],
    });
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Station, attributes: ["id", "name", "location"] }],
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { username, password, role, stationId } = req.body;

    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.username = username || user.username;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    user.role = role || user.role;
    user.stationId = stationId !== undefined ? stationId : user.stationId;

    await user.save();

    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
};

// models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Station = require("./Station");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("admin", "manager", "partner"),
    defaultValue: "manager",
  },
  stationId: {
    type: DataTypes.INTEGER,
    allowNull: true, // null means user is admin/partner with access to all
    references: {
      model: Station,
      key: "id",
    },
    onDelete: "SET NULL",
  },
});

User.belongsTo(Station, { foreignKey: "stationId" });
Station.hasMany(User, { foreignKey: "stationId" });

module.exports = User;

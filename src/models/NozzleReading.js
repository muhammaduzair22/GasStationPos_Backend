const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const NozzleReading = sequelize.define("NozzleReading", {
  nozzleNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 6, // only 1–6 allowed
    },
  },
  openingGirary: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: null,
  },
  closingGirary: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: null,
  },
  openingScreen: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: null,
  },
  closingScreen: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: null,
  },
});

module.exports = NozzleReading;

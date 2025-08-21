// models/Station.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Station = sequelize.define("Station", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  location: {
    type: DataTypes.STRING,
  },
});

module.exports = Station;

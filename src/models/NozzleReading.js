const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const MasterRecord = require("./MasterRecord");

const NozzleReading = sequelize.define("NozzleReading", {
  nozzleNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 6, // only 1–6 allowed
    },
  },
  opening: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  closing: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
});

// Relationships
MasterRecord.hasMany(NozzleReading, {
  foreignKey: "masterRecordId",
  onDelete: "CASCADE",
});
NozzleReading.belongsTo(MasterRecord, { foreignKey: "masterRecordId" });

module.exports = NozzleReading;

// models/MasterRecord.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Station = require("./Station");

const MasterRecord = sequelize.define("MasterRecord", {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  totalSaleKgs: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  totalCngSale: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  otherRevenueLoanReturn: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  totalDailyExpenditure: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    allowNull: true,
  },
  netSale: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    allowNull: true,
  },
  remarks: {
    type: DataTypes.TEXT,
  },
  depositable: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    allowNull: true,
  },
  deposited: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    allowNull: true,
  },
  withdrawal: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    allowNull: true,
  },
  wdDepDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  stationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Station,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  sngplMeterOpening: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    allowNull: true,
  },
  sngplMeterClosing: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    allowNull: true,
  },
});

MasterRecord.belongsTo(Station, { foreignKey: "stationId" });
Station.hasMany(MasterRecord, { foreignKey: "stationId" });

module.exports = MasterRecord;

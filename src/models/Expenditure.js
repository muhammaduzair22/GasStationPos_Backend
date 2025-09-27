const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const MasterRecord = require("./MasterRecord");

const Expenditure = sequelize.define("Expenditure", {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM(
      "kitchen",
      "general",
      "diesel",
      "salary",
      "loan",
      "other"
    ),
    allowNull: true,
  },
  masterRecordId: {
    type: DataTypes.INTEGER,
    references: {
      model: "MasterRecords",
      key: "id",
    },
    onDelete: "CASCADE",
  },
});

MasterRecord.hasMany(Expenditure, { foreignKey: "masterRecordId" });
Expenditure.belongsTo(MasterRecord, { foreignKey: "masterRecordId" });

module.exports = Expenditure;

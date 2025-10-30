const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Loan = sequelize.define("Loan", {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  personName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  timePeriod: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  purpose: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  returnAmount: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  returnDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  remarks: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  loanType: {
    type: DataTypes.ENUM("taken", "given"),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("active", "closed"),
    defaultValue: "active",
  },
});

module.exports = Loan;

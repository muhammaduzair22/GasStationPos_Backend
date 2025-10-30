// models/Employee.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Employee = sequelize.define("Employee", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // Base monthly salary
  monthlySalary: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  // Advance section
  currentAdvanceAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0, // amount currently taken as advance
  },
  advanceDate: {
    type: DataTypes.DATE,
    allowNull: true, // when the advance was taken
  },

  // Loan section
  totalLoanAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0, // total loan taken
  },
  remainingLoanAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0, // balance loan to be paid
  },
  monthlyInstallmentAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0, // amount to deduct each month from salary
  },
  loanStartDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  loanEndDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  // Relations
  stationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Employee;

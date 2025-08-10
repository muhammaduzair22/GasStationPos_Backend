const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const MasterRecord = sequelize.define("MasterRecord", {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  totalSaleKgs: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  ratePerKg: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  totalCngSale: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  otherRevenueLoanReturn: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  expenditureDetail: {
    type: DataTypes.TEXT,
  },
  kitchenExpensesAmount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  generalExpensesAmount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  generatorCompressorDieselLubeAmount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  salaryAdvanceNetPay: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  loanRepaymentOtherPayments: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  totalDailyExpenditure: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  netSale: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  remarks: {
    type: DataTypes.TEXT,
  },
  depositable: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  deposited: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  withdrawal: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  wdDepDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
});

module.exports = MasterRecord;

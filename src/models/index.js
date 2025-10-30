const sequelize = require("../config/db");
const Station = require("./Station");
const User = require("./User");
const Employee = require("./Employee");
const MasterRecord = require("./MasterRecord");
const Expenditure = require("./Expenditure");
const NozzleReading = require("./NozzleReading");

// Define all associations here
Station.hasMany(User, { foreignKey: "stationId" });
User.belongsTo(Station, { foreignKey: "stationId", onDelete: "SET NULL" });

Station.hasMany(Employee, { foreignKey: "stationId" });
Employee.belongsTo(Station, { foreignKey: "stationId", onDelete: "CASCADE" });

MasterRecord.hasMany(Expenditure, { foreignKey: "masterRecordId" });
Expenditure.belongsTo(MasterRecord, { foreignKey: "masterRecordId" });

MasterRecord.belongsTo(Station, { foreignKey: "stationId" });
Station.hasMany(MasterRecord, { foreignKey: "stationId", onDelete: "CASCADE" });

MasterRecord.hasMany(NozzleReading, {
  foreignKey: "masterRecordId",
  onDelete: "CASCADE",
});
NozzleReading.belongsTo(MasterRecord, { foreignKey: "masterRecordId" });

module.exports = {
  sequelize,
  Station,
  User,
  Employee,
  MasterRecord,
  NozzleReading,
  Expenditure,
};

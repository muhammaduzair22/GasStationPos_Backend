const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const masterRecordRoutes = require("./routes/masterRecordRoutes");
const stationRoutes = require("./routes/stationRoutes");
const userRoutes = require("./routes/userRoutes");
const loanRoutes = require("./routes/loanRoutes");
const Employee = require("./routes/employeeRoutes");
const Category = require("./routes/categoryRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/masterrecords", masterRecordRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/loan", loanRoutes);
app.use("/api/employee", Employee);
app.use("/api/categories", Category);

sequelize.sync({ alter: true }).then(() => console.log("DB synced"));

module.exports = app;

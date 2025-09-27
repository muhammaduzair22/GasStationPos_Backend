const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const masterRecordRoutes = require("./routes/masterRecordRoutes");
const stationRoutes = require("./routes/stationRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/masterrecords", masterRecordRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/users", userRoutes);

sequelize.sync().then(() => console.log("DB synced"));

module.exports = app;

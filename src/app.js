const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const masterRecordRoutes = require("./routes/masterRecordRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/masterrecords", masterRecordRoutes);

sequelize.sync().then(() => console.log("DB synced"));

module.exports = app;

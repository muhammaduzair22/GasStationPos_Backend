const express = require("express");
const cors = require("cors");
const recordRoutes = require("./routes/record.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const uploadRoutes = require("./routes/upload.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/records", recordRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", uploadRoutes);
module.exports = app;

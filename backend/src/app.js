// src/app.js
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const shortageRoutes = require("./routes/shortageRoutes");
const cookieParser = require("cookie-parser");
const patientRoutes = require("./routes/patientRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
// Routes
app.use("/api/auth", authRoutes );
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/resources/shortages", shortageRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/patients", patientRoutes);



module.exports = app;

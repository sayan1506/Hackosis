const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");

router.post("/suggest", patientController.suggestHospitals);

module.exports = router;
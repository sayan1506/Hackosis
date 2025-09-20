const express = require("express");
const router = express.Router();
const hospitalController = require("../controllers/hospitalController");
const authMiddleware = require("../middleware/authMiddleware"); 

// CRUD ke basic op
router.post("/", authMiddleware(["admin"]), hospitalController.createHospital); 
router.get("/", authMiddleware(), hospitalController.getHospitals);              
router.get("/:id", authMiddleware(), hospitalController.getHospitalById);       
router.put("/:id", authMiddleware(["admin"]), hospitalController.updateHospital); 
router.delete("/:id", authMiddleware(["admin"]), hospitalController.deleteHospital); 
module.exports = router;

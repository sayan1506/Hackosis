const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resourceController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware(["admin", "hospital"]), resourceController.upsertResource);

router.get("/", authMiddleware(), resourceController.getAllResources);

router.get("/:hospitalId", authMiddleware(), resourceController.getResourceByHospital);

router.delete("/:id", authMiddleware(["admin", "hospital"]), resourceController.deleteResource);

module.exports = router;

const express = require("express");
const router = express.Router();
const shortageController = require("../controllers/shortageController");
const authMiddleware = require("../middleware/authMiddleware");
 
router.get("/", authMiddleware(["admin", "hospital"]), shortageController.getShortages);


module.exports = router;

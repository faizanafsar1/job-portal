const express = require("express");
const router = express.Router();
const EmployerController = require("../controllers/EmployerController");
const { requireRole, verifyToken } = require("../middleware/Auth");

router.get("/dashboard-data", verifyToken, requireRole("employer"), EmployerController.dashboardData);
module.exports = router;

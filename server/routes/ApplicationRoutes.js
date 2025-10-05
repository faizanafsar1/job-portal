const router = require("express").Router();
const applicationController = require("../controllers/ApplicationController");
const { verifyToken } = require("../middleware/Auth");

// // User
router.post("/apply-job/:id", verifyToken, applicationController.applyToJob);
router.get("/application-detail/:id", applicationController.getApplicationDetail);
router.get("/all-applicants", verifyToken, applicationController.getAllApplicants);
router.get("/check-if-applied/:id", verifyToken, applicationController.checkApplied);

module.exports = router;

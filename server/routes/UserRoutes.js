const express = require("express");
const { verifyToken, requireRole } = require("../middleware/Auth");
const userController = require("../controllers/UserController");
const upload = require("../config/multerConfig");
const router = express.Router();

router.get("/profile", verifyToken, requireRole("jobseeker"), userController.userDetails);

router.put("/profile", verifyToken, upload.single("resume"), requireRole("jobseeker"), userController.updateUserData);

router.delete("/profile/delete-resume", verifyToken, requireRole("jobseeker"), userController.deleteResume);
router.post("/apply-job", verifyToken, requireRole("jobseeker"), userController.JobApplication);

module.exports = router;

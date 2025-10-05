const router = require("express").Router();
const jobController = require("../controllers/JobController");
const { verifyToken, requireRole } = require("../middleware/Auth");

router.get("/", jobController.getAllJobs);
router.get("/getjob/:id", jobController.getJobById);
router.put("/update-job-details/:id", jobController.updateJobDetails);

router.get("/all-jobs", verifyToken, requireRole("employer"), jobController.getAllJobsForEmployer);
router.get("/job-details/:id", verifyToken, requireRole("employer"), jobController.getJobDetails);
router.delete("/delete-job/:id", verifyToken, requireRole("employer"), jobController.deleteJob);

module.exports = router;

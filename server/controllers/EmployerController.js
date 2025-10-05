const Job = require("../models/Job");
const JobApplication = require("../models/JobApplication");
const Employer = require("../models/Employer");

exports.dashboardData = async (req, res) => {
  const userId = req.user.userId;
  const employer = await Employer.findById(userId);

  const jobs = await Job.find({ companyEmail: employer.email });
  const jobIds = jobs.map((job) => job._id);
  const applications = await JobApplication.find({ jobId: { $in: jobIds } })
    .populate("jobId")
    .populate("userId");

  const totalApplications = applications.length;
  const totalJobsPosted = jobs.length;

  res.status(200).send({ totalApplications, applications, totalJobsPosted, jobs });
};

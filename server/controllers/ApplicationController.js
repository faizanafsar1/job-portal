const Employer = require("../models/Employer");
const JobApplication = require("../models/JobApplication");
const Job = require("../models/Job");
exports.applyToJob = async (req, res) => {
  try {
    const { userId } = req.body;
    const jobId = req.params.id;

    const existingApplication = await JobApplication.findOne({ jobId, userId });

    if (existingApplication) {
      return res.status(400).send({ message: "You have already applied for this job" });
    }
    const newJobApplication = new JobApplication({
      userId,
      jobId,
    });
    await newJobApplication.save();
    res.status(200).send({ message: "Application Submitted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to apply", error: error.message });
  }
};

exports.getApplicationDetail = async (req, res) => {
  const id = req.params.id;

  const application = await JobApplication.findById(id).populate("jobId").populate("userId");

  if (!application) {
    return res.status(404).send({ message: "didnot find job application matching this id" });
  }
  res.status(200).json(application);
}; // User's applications

exports.getAllApplicants = async (req, res) => {
  const userId = req.user.userId;
  const employer = await Employer.findById(userId).select("email");
  const jobs = await Job.find({ companyEmail: employer.email }).select("_id");
  const applications = await JobApplication.find({ jobId: { $in: jobs } })
    .populate({
      path: "userId",
      select: "-password -role -refreshToken",
    })
    .populate("jobId");
  res.status(200).json(applications);
}; // Applications for a job
exports.checkApplied = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user.userId;
  const applications = await JobApplication.find({ jobId, userId });

  if (applications.length > 0) {
    return res.status(400).json({ message: "Already applied" });
  } else {
    return res.status(200).json({ message: "Not applied yet" });
  }
};

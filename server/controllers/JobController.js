const jobCollection = require("../models/Job");
const Employer = require("../models/Employer");
const JobApplication = require("../models/JobApplication");
exports.getAllJobs = async (req, res) => {
  const jobs = await jobCollection.find();
  res.status(200).send(jobs);
};
exports.getJobById = async (req, res) => {
  const id = req.params.id;
  const job = await jobCollection.findById(id);
  res.status(200).send(job);
};
exports.jobPost = async (req, res) => {
  try {
    const newJob = new jobCollection({ ...req.body });
    await newJob.save();
    res.status(200).json({ message: "job saved successfully" });
  } catch (error) {
    console.log("error while saving ", error);
  }
};

exports.getAllJobsForEmployer = async (req, res) => {
  const userId = req.user.userId;
  const employer = await Employer.findById(userId);
  const jobs = await jobCollection.find({ companyEmail: employer.email });

  res.status(200).send(jobs);
};
exports.getJobDetails = async (req, res) => {
  const id = req.params.id;
  const job = await jobCollection.findById(id);

  const applicants = await JobApplication.find({ jobId: id })
    .populate({
      path: "userId",
      select: "-password -role -refreshToken",
    })
    .populate("jobId");
  res.status(200).send({ applicants, job });
};

exports.updateJobDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updatedJob = await jobCollection.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({
      message: "Job updated successfully",
      updatedJob,
    });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
exports.deleteJob = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedJob = await jobCollection.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    await jobCollection.deleteMany({ jobId: id });

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

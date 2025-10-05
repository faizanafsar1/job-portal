const User = require("../models/User");
const cloudinary = require("cloudinary").v2;
const Job = require("../models/Job");
const JobApplication = require("../models/JobApplication");

exports.userDetails = async (req, res) => {
  const userId = req.user.userId;
  const user = await User.findById(userId).select("-password -refreshToken");
  res.json(user);
};

exports.updateUserData = async (req, res) => {
  const userId = req.user.userId;
  const updates = req.body;
  if (req.file) {
    const user = await User.findById(userId);
    if (user.resume?.public_id) {
      console.log("Old public_id:", user.resume.public_id);
      await cloudinary.uploader.destroy(user.resume.public_id, {
        resource_type: "raw",
      });
    }
    const { filename, mimetype, size, path } = req.file;

    const publicId = path
      .split("/")
      .slice(-2)
      .join("/")
      .replace(/\.[^/.]+$/, "");

    updates.resume = {
      filename,
      filepath: path,
      mimetype,
      size,
      uploadedAt: new Date(),
      public_id: publicId,
    };
  }

  const updated = await User.findByIdAndUpdate(userId, updates, { new: true });
  res.json({ message: "Updated User Data", updated });
};

exports.deleteResume = async (req, res) => {
  const userId = req.user.userId;
  const user = await User.findById(userId);

  if (!user.resume?.public_id) {
    return res.status(404).json({ message: "Resume not found" });
  }

  await cloudinary.uploader.destroy(user.resume.public_id, {
    resource_type: "raw",
  });

  user.resume = null;
  await user.save();

  res.json({ message: "Resume deleted successfully" });
};

exports.JobApplication = async (req, res) => {
  const userId = req.user.userId;
  const { jobId } = req.body;
  const job = await Job.findById(jobId);
  const user = await User.findById(userId);

  const existingApplication = await JobApplication.findOne({
    "jobDetails.jobId": jobId,
    "userDetails.email": user.email,
  });
  if (existingApplication) {
    return res.status(400).send({ message: "You have already applied for this post" });
  }

  const newJobApplication = new JobApplication({
    jobDetails: { ...job, jobId: jobId },
    userDetails: { ...user },
  });
  HOW;
  await newJobApplication.save();
  res.status(200).send({ message: "Application Submitted Successfully" });
};

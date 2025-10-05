const mongoose = require("mongoose");

const JobApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  appliedDate: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
  },
});

module.exports = new mongoose.model("JobApplication", JobApplicationSchema);

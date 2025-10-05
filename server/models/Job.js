const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobTitle: { type: String, default: "" },
  jobDescription: { type: String, default: "" },
  jobType: { type: String, default: "" },
  jobLocationType: { type: String, default: "" },
  salary: { type: String, default: "" },
  totalHires: { type: Number, default: 1 },
  individualEmailUpdates: { type: Boolean, default: false },
  resumeRequired: { type: Boolean, default: true },
  companyName: { type: String, default: "" },
  companyEmail: { type: String, default: "" },
  companyDescription: { type: String, default: "" },
  companyLocation: { type: String, default: "" },
  jobPostedOn: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
  },
});
module.exports = new mongoose.model("Job", jobSchema);

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { API } from "../../../config/config";
import { toast } from "react-toastify";

const EditJobDetails = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    jobType: "",
    jobLocationType: "",
    salary: "",
    totalHires: 1,
    individualEmailUpdates: false,
    resumeRequired: true,
    companyName: "",
    companyEmail: "",
    companyDescription: "",
    companyLocation: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  useEffect(() => {
    async function handleJobDetails() {
      const res = await fetch(`${API}/getjob/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const job = await res.json();
      console.log("job", job);
      setFormData(job);
    }
    handleJobDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const res = await fetch(`${API}/update-job-details/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (res.ok) {
      toast.success(data.message);
      navigate(`/employer/job-details/${id}`);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      {/* Header Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <i className="fas fa-edit text-primary-dark"></i>
                Edit Job Posting
              </h1>
              <p className="text-gray-600 mt-1">Manage your job listing details</p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/employer/dashboard"
                className="px-5 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all"
              >
                <i className="fas fa-times mr-2"></i>
                Discard
              </Link>
              <button
                onClick={() => handleSubmit()}
                className="px-5 py-2.5 rounded-lg bg-primary-dark text-white font-medium hover:bg-primary-darktext-primary-dark transition-all shadow-sm"
              >
                <i className="fas fa-check mr-2"></i>
                Publish Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Details Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-primary-dark to-primary-light text-primary-dark px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <i className="fas fa-briefcase"></i>
                  Job Details
                </h2>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData?.jobTitle}
                      onChange={handleChange}
                      placeholder="Enter job title"
                      className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent transition-all"
                    />
                    <i className="fas fa-heading absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="jobDescription"
                    value={formData?.jobDescription}
                    onChange={handleChange}
                    placeholder="Describe the role, responsibilities, requirements, and qualifications..."
                    rows="8"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent resize-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Job Type <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="jobType"
                        value={formData?.jobType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent bg-white appearance-none transition-all"
                      >
                        <option value="">Select type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                        <option value="Freelance">Freelance</option>
                      </select>
                      <i className="fas fa-clock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Location Type <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="jobLocationType"
                        value={formData?.jobLocationType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent bg-white appearance-none transition-all"
                      >
                        <option value="">Select location</option>
                        <option value="Remote">Remote</option>
                        <option value="On-site">On-site</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                      <i className="fas fa-location-dot absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      <i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Salary Range</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="salary"
                        value={formData?.salary}
                        onChange={handleChange}
                        placeholder="e.g. $80k - $100k"
                        className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent transition-all"
                      />
                      <i className="fas fa-dollar-sign absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Positions Available</label>
                    <div className="relative">
                      <input
                        type="number"
                        name="totalHires"
                        value={formData?.totalHires}
                        onChange={handleChange}
                        min="1"
                        className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent transition-all"
                      />
                      <i className="fas fa-users absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Application Settings Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ">
              <div className="bg-gradient-to-r from-primary-dark to-primary-light text-primary-dark px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <i className="fas fa-sliders"></i>
                  Settings
                </h2>
              </div>
              <div className="p-6 space-y-5">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center pt-1">
                      <input
                        type="checkbox"
                        name="resumeRequired"
                        checked={formData?.resumeRequired}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 text-primary-dark focus:ring-2 focus:ring-primary-dark cursor-pointer"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                        <i className="fas fa-file-alt text-primary-dark"></i>
                        Resume Required
                      </div>
                      <p className="text-sm text-gray-600">Applicants must submit a resume</p>
                    </div>
                  </label>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center pt-1">
                      <input
                        type="checkbox"
                        name="individualEmailUpdates"
                        checked={formData?.individualEmailUpdates}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 text-primary-dark focus:ring-2 focus:ring-primary-dark cursor-pointer"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                        <i className="fas fa-bell text-primary-dark"></i>
                        Email Notifications
                      </div>
                      <p className="text-sm text-gray-600">Get notified for each application</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Quick Tips Card */}
            <div className="rounded-xl border-2 border-primary-dark p-5">
              <div className="flex items-start gap-3">
                <div className="bg-primary-dark rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-lightbulb text-white"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-primary-dark mb-2">Pro Tips</h3>
                  <ul className="text-sm text-primary-dark space-y-1.5">
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-xs mt-1"></i>
                      <span>Use clear job titles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-xs mt-1"></i>
                      <span>Include salary range</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check text-xs mt-1"></i>
                      <span>List key requirements</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditJobDetails;

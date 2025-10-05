import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Icon from "../../../components/Icon";
import {
  faBriefcase,
  faCalendar,
  faCheckCircle,
  faClock,
  faDownload,
  faEdit,
  faEnvelope,
  faFileAlt,
  faMapPin,
  faPhone,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../context/AuthContext";
import { API } from "../../../config/config";
import { useDeleteJob } from "../../../hooks/useDelete";
import IconAndLabelBtn from "../../../components/IconLabelAndBtn";

export function ViewJobPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [jobApplicants, setJobApplicants] = useState();
  const [activeTab, setActiveTab] = useState("details");

  const { accessToken } = useAuth();

  useEffect(() => {
    async function handleJobDetails() {
      const res = await fetch(`${API}/job-details/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      console.log("applicationid", data.applicants[0]);
      setJobApplicants(data.applicants);
      setJob(data.job);
    }
    handleJobDetails();
  }, [id]);
  const deleteJob = useDeleteJob();
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 capitalize">{job?.jobTitle}</h1>
                  <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Icon icon={faMapPin} size="sm" />
                      {job?.companyLocation}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon icon={faBriefcase} size="sm" />
                      {job?.jobType}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon icon={faClock} size="sm" />
                      {job?.jobLocationType}
                    </span>
                  </div>
                </div>
                <span className="px-4 py-2 bg-green-50 text-green-700 text-sm font-semibold rounded-full">Active</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <StatCard icon={faUsers} label="Total Applicants" value={jobApplicants?.length} />
                <StatCard icon={faCheckCircle} label="Shortlisted" value="12" />
                <StatCard icon={faBriefcase} label="Vacancies" value={job?.totalHires} />
                <StatCard icon={faCalendar} label="Posted On" value={job?.postedOn} />
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-6 pt-6 border-t border-gray-200">
            <Link to={`/employer/edit-job-details/${job?._id}`}>
              <button className="px-4 py-2 bg-primary-dark hover:bg-primary-dark/90 text-white rounded-lg flex items-center gap-2 transition-colors">
                <Icon icon={faEdit} size="sm" />
                Edit Job
              </button>
            </Link>

            <button
              onClick={() => deleteJob(job?._id)}
              className="px-4 py-2 border border-red-300 hover:bg-red-50 text-red-700 rounded-lg transition-colors"
            >
              Delete Job
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab("details")}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "details"
                    ? "border-primary-dark text-primary-dark"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Job Details
              </button>
              <button
                onClick={() => setActiveTab("applicants")}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "applicants"
                    ? "border-primary-dark text-primary-dark"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Applicants ({jobApplicants?.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === "details" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
                  <p className="text-gray-700 leading-relaxed">{job?.jobDescription}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Salary Range</h4>
                    <p className="text-gray-700">{job?.salary}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Job Type</h4>
                    <p className="text-gray-700 capitalize">{job?.jobType}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Work Location</h4>
                    <p className="text-gray-700 capitalize">{job?.jobLocationType}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "applicants" && (
              <div className="space-y-4">
                {jobApplicants?.map(({ userId, appliedDate, _id }, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-primary-dark/40 transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Left Section - User Info */}
                      <div className="flex-1 space-y-4">
                        {/* Name and Title */}
                        <div className="border-b border-gray-100 pb-3">
                          <h4 className="text-xl font-bold text-gray-900 mb-1">
                            {userId?.firstName} {userId?.lastName}
                          </h4>
                          {userId?.jobTitle && (
                            <p className="text-base font-medium text-primary-dark">
                              {userId.jobTitle}
                              {userId?.jobCompany && <span className="text-gray-600"> at {userId.jobCompany}</span>}
                            </p>
                          )}
                        </div>

                        {/* Contact Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-8 h-8 rounded-full bg-primary-dark/10 flex items-center justify-center flex-shrink-0">
                              <Icon icon={faEnvelope} size="sm" className="text-primary-dark" />
                            </div>
                            <span className="text-gray-700 truncate">{userId?.email}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-8 h-8 rounded-full bg-primary-dark/10 flex items-center justify-center flex-shrink-0">
                              <Icon icon={faPhone} size="sm" className="text-primary-dark" />
                            </div>
                            <span className="text-gray-700">{userId?.contact}</span>
                          </div>
                        </div>

                        {/* Professional Details */}
                        <div className="flex flex-wrap gap-2">
                          {userId?.yearsExperience && (
                            <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                              {userId.yearsExperience} Experience
                            </span>
                          )}
                          {userId?.educationLevel && (
                            <span className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                              {userId.educationLevel}
                            </span>
                          )}
                          {userId?.studyField && (
                            <span className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                              {userId.studyField}
                            </span>
                          )}
                        </div>

                        {/* Skills */}
                        {userId?.skill && (
                          <div className="pt-2">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Skills</p>
                            <p className="text-sm text-gray-700">{userId.skill}</p>
                          </div>
                        )}

                        {/* Location */}
                        {userId?.address?.cityState && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <span>{userId.address.cityState}</span>
                          </div>
                        )}
                      </div>

                      {/* Right Section - Actions */}
                      <div className="border-2  flex flex-col justify-between  items-start lg:items-end gap-3 lg:border-l lg:border-gray-100 lg:pl-6">
                        <div className="text-left mb-5 lg:text-right">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Applied Date</p>
                          <p className="text-sm text-gray-700 font-medium">{appliedDate || "N/A"}</p>
                        </div>
                        <div className="flex  flex-col gap-5">
                          <Link to={`/employer/applicant-details/${_id}`}>
                            <IconAndLabelBtn
                              icon={faFileAlt}
                              className={"w-full text-primary-dark border border-primary-dark"}
                              label={"View  Details"}
                            ></IconAndLabelBtn>
                          </Link>
                          {userId?.resume?.filepath && (
                            <Link to={userId.resume.filepath} target="_blank" rel="noopener noreferrer">
                              <IconAndLabelBtn
                                icon={faDownload}
                                className={"text-white duration-300 hover:!bg-primary-light !bg-primary-dark "}
                                label={"View Resume"}
                              ></IconAndLabelBtn>
                            </Link>
                          )}{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2 text-primary-dark mb-2">
        <Icon icon={icon} size="sm"></Icon>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-600 mt-1">{label}</p>
    </div>
  );
}

// ============= PAGE 4: JOB POSTING FAILED =============
// export function JobPostingFailedPage() {
//   const [errorDetails] = useState({
//     errorCode: 'ERR_500',
//     errorMessage: 'Failed to publish job posting',
//     timestamp: new Date().toLocaleString()
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="max-w-2xl w-full">
//         <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-12 text-center">
//           {/* Error Icon */}
//           <div className="flex justify-center mb-6">
//             <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
//               <XCircle className="text-red-600" size={48} />
//             </div>
//           </div>

//           {/* Error Message */}
//           <h1 className="text-3xl font-bold text-gray-900 mb-3">Job Posting Failed</h1>
//           <p className="text-gray-600 mb-6">
//             We encountered an error while trying to publish your job posting.
//             Please try again or contact our support team if the problem persists.
//           </p>

//           {/* Error Details */}
//           <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left">
//             <div className="flex items-start gap-3">
//               <AlertCircle className="text-red-600 mt-0.5 flex-shrink-0" size={20} />
//               <div className="flex-1">
//                 <h3 className="font-semibold text-red-900 mb-2">Error Details</h3>
//                 <div className="space-y-1 text-sm text-red-800">
//                   <p><span className="font-medium">Error Code:</span> {errorDetails.errorCode}</p>
//                   <p><span className="font-medium">Message:</span> {errorDetails.errorMessage}</p>
//                   <p><span className="font-medium">Time:</span> {errorDetails.timestamp}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Common Issues */}
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
//             <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
//               <AlertCircle size={18} />
//               Common Issues & Solutions
//             </h3>
//             <ul className="space-y-2 text-sm text-blue-800">
//               <li className="flex gap-2">
//                 <span className="text-blue-600 font-bold">•</span>
//                 <span>Check your internet connection and try again</span>
//               </li>
//               <li className="flex gap-2">
//                 <span className="text-blue-600 font-bold">•</span>
//                 <span>Ensure all required fields are properly filled</span>
//               </li>
//               <li className="flex gap-2">
//                 <span className="text-blue-600 font-bold">•</span>
//                 <span>Verify that the job description meets minimum character requirements</span>
//               </li>
//               <li className="flex gap-2">
//                 <span className="text-blue-600 font-bold">•</span>
//                 <span>Clear your browser cache and cookies</span>
//               </li>
//             </ul>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link to="/postjob" className="flex-1 sm:flex-initial">
//               <button className="w-full px-6 py-3 bg-primary-dark hover:bg-primary-dark/90 text-white rounded-lg flex items-center justify-center gap-2 transition-colors font-medium">
//                 <RefreshCw size={18} />
//                 Try Again
//               </button>
//             </Link>
//             <Link to="/employer/jobs" className="flex-1 sm:flex-initial">
//               <button className="w-full px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium">
//                 <ArrowLeft size={18} />
//                 Back to My Jobs
//               </button>
//             </Link>
//           </div>

//           {/* Support Section */}
//           <div className="mt-8 pt-8 border-t border-gray-200">
//             <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
//             <p className="text-sm text-gray-600 mb-4">
//               Our support team is here to help you resolve this issue
//             </p>
//             <div className="flex flex-col sm:flex-row gap-3 justify-center">
//               <a href="mailto:support@jobportal.com" className="px-4 py-2 text-primary-dark hover:bg-primary-dark/10 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2">
//                 <Mail size={16} />
//                 support@jobportal.com
//               </a>
//               <a href="tel:+1234567890" className="px-4 py-2 text-primary-dark hover:bg-primary-dark/10 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2">
//                 <Phone size={16} />
//                 +1 (234) 567-890
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

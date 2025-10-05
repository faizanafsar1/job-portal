import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/Icon";
import {
  faUsers,
  faBriefcase,
  faEnvelope,
  faPhone,
  faDollarSign,
  faDownload,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { API } from "../../../config/config";
import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import IconAndLabelBtn from "../../../components/IconLabelAndBtn";
import Button from "../../../components/Button";

function ApplicantCard({ applicant }) {
  const job = applicant.jobId;
  const user = applicant.userId;
  console.log("applicant", applicant);
  return (
    <div className="group relative bg-white rounded-xl border border-gray-200 hover:border-primary-dark/30 hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Gradient accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-dark/50 via via-primary-light to-primary-dark/50"></div>

      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left Section - Applicant Info */}
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-sm font-medium text-primary-dark">Applied for: {job.jobTitle}</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Icon icon={faEnvelope} size="sm" className="text-blue-600" />
                </div>
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="flex-shrink-0 w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                  <Icon icon={faPhone} size="sm" className="text-green-600" />
                </div>
                <span>{user.contact}</span>
              </div>
            </div>

            {/* Job Details */}
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                <Icon icon={faBriefcase} size="sm" />
                <span>{job.yearsExperience} experience</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                <Icon icon={faDollarSign} size="sm" />
                <span>{job.salary}</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                <Icon icon={faCalendar} size="sm" />
                <span>{new Date(applicant.appliedDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:min-w-[200px]">
            <Link to={`/employer/applicant-details/${applicant._id}`} className="w-full">
              <Button style={"secondary"} label={"View Details"} className="w-full"></Button>
            </Link>
            <Link to={user.resume.filepath} target="_blank" className="w-full">
              <IconAndLabelBtn
                icon={faDownload}
                className="border-2 border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-white transition-colors w-full justify-center"
                label="Resume"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ApplicantsPage() {
  const [applicants, setApplicants] = useState([]);
  const { accessToken } = useAuth();

  useEffect(() => {
    async function handleApplicantsDetails() {
      const res = await fetch(`${API}/all-applicants`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      setApplicants(data);
    }
    handleApplicantsDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900"> Applicants</h1>
            </div>
          </div>
        </div>

        {/* Applicants List */}
        <div className="space-y-4">
          {applicants.map((applicant) => (
            <ApplicantCard key={applicant?._id} applicant={applicant} />
          ))}

          {applicants?.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 py-20">
              <div className="text-center text-gray-400">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <Icon icon={faUsers} size="lg" />
                </div>
                <p className="text-lg font-medium text-gray-600">No applicants yet</p>
                <p className="text-sm text-gray-500 mt-1">Applications will appear here when candidates apply</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

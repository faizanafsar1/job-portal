import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/Icon";
import { faBriefcase, faEdit, faEye, faMapPin, faPlus, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../context/AuthContext";
import { useEffect } from "react";
import { API } from "../../../config/config";
import { useDeleteJob } from "../../../hooks/useDelete";

function JobCard({ job }) {
  const deleteJob = useDeleteJob();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 border border-gray-200 hover:border-primary-dark/30 hover:bg-gray-50 rounded-lg transition-all">
      <div className="lg:col-span-2">
        <h3 className="font-semibold capitalize text-lg text-gray-900">{job.jobTitle}</h3>
        <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Icon icon={faBriefcase} size="sm" />
            {job.jobType}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Icon icon={faMapPin} size="sm" />
            {job.jobLocationType}
          </span>
        </div>
        <p className="text-sm mt-2 text-gray-700 font-medium">{job?.salary}</p>
      </div>

      <div className="flex flex-col justify-center">
        <div className="text-sm mb-2">
          <span className="font-semibold text-gray-900">{job.totalHires}</span>
          <span className="text-gray-600"> Vacancies</span>
        </div>
        <div className="text-sm text-gray-600 mb-2">
          <span className="font-semibold text-gray-900">{job.applicantsCount}</span>
          <span className="text-gray-600"> Applicants</span>
        </div>
        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-50 text-green-700 w-fit">
          Active
        </span>
      </div>

      <div className="flex items-center justify-start lg:justify-end gap-2">
        <Link to={`/employer/job-details/${job?._id}`}>
          <button className="p-2 text-primary-dark hover:bg-primary-dark/10 rounded-lg transition-colors" title="View Details">
            <Icon icon={faEye} size="sm" />
          </button>
        </Link>
        <Link to={`/employer/job-details/${job?._id}`}>
          <button className="p-2 text-primary-dark hover:bg-primary-dark/10 rounded-lg transition-colors" title="View Applicants">
            <Icon icon={faUsers} size="sm" />
          </button>
        </Link>
        <Link to={`/employer/edit-job-details/${job?._id}`}>
          <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors" title="Edit">
            <Icon icon={faEdit} size="sm" />
          </button>
        </Link>
        <button
          onClick={() => deleteJob(job?._id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete"
        >
          <Icon icon={faTrash} size="sm" />
        </button>
      </div>
    </div>
  );
}

export default function MyJobsPage() {
  const [jobs, setJobs] = useState([]);
  const { accessToken } = useAuth();

  useEffect(() => {
    async function handleJobs() {
      const res = await fetch(`${API}/all-jobs`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      setJobs(data);
    }
    handleJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Job Listings</h1>
              <p className="text-sm text-gray-500 mt-1">{jobs?.length} total jobs posted</p>
            </div>
            <Link to="/postjob">
              <button className="bg-primary-dark hover:bg-primary-dark/90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <Icon icon={faPlus} size="sm" />
                Post New Job
              </button>
            </Link>
          </div>

          {/* Jobs List */}
          <div className="space-y-4">
            {jobs?.map((job) => (
              <JobCard key={job?._id} job={job} />
            ))}
            {jobs?.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Icon icon={faBriefcase} size="lg" className="mx-auto mb-4 text-gray-300" />
                <p>No jobs found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

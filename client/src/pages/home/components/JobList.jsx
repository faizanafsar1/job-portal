// JobList.jsx
import { faBuilding, faMapMarkerAlt, faDollarSign, faUsers } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../../components/Icon";

// 🔹 Single Job Card Component
function JobCard({ job, isSelected, onClick }) {
  // single on-brand badge color
  const badgeClass = "px-3 py-1 rounded-full text-xs font-medium bg-primary-dark-100 text-primary-dark-700";

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl p-5 cursor-pointer transition-all duration-200 border-2 ${
        isSelected ? "border-primary-dark shadow-lg" : "border-transparent shadow hover:shadow-md"
      }`}
    >
      {/* Job Title + Job Type Badge */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg text-gray-900 leading-tight">{job.jobTitle}</h3>
        <span className={badgeClass}>{job.jobType}</span>
      </div>

      {/* Company Name */}
      <div className="flex items-center text-gray-600 mb-2">
        <Icon icon={faBuilding} size="sm" className="mr-2 text-primary-dark" />
        <span className="text-sm">{job.companyName}</span>
      </div>

      {/* Location */}
      <div className="flex items-center text-gray-600 mb-2">
        <Icon icon={faMapMarkerAlt} size="sm" className="mr-2 text-primary-dark" />
        <span className="text-sm">
          {job.jobLocationType} • {job.companyLocation}
        </span>
      </div>

      {/* Salary */}
      <div className="flex items-center text-gray-600 mb-3">
        <Icon icon={faDollarSign} size="sm" className="mr-2 text-primary-dark" />
        <span className="text-sm font-medium">{job.salary}</span>
      </div>

      {/* Footer: Hires + Resume Required */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center text-xs text-gray-500">
          <Icon icon={faUsers} size="sm" className="mr-1 text-primary-dark" />
          <span>
            {job.totalHires} {job.totalHires === 1 ? "position" : "positions"}
          </span>
        </div>

        {/* Show text only if resumeRequired is true */}
        {job.resumeRequired && <span className="text-xs text-primary-dark font-medium">Resume required</span>}
      </div>
    </div>
  );
}

// 🔹 Job List Component (shows multiple JobCards)
export default function JobList({ jobs, selectedJob, onSelectJob }) {
  return (
    <div className="w-1/3 space-y-4 overflow-y-auto">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} isSelected={selectedJob?.id === job.id} onClick={() => onSelectJob(job)} />
      ))}
    </div>
  );
}

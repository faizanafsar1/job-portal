import { faEdit, faFilter, faPlus, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../../../../../components/Icon";
import IconAndLabelBtn from "../../../../../../components/IconLabelAndBtn";
import IconButton from "../../../../../../components/IconButton";
import { Link } from "react-router-dom";
import { API } from "../../../../../../config/config";
import { useAuth } from "../../../../../../context/AuthContext";
import { toast } from "react-toastify";
import { useDeleteJob } from "../../../../../../hooks/useDelete";

export default function EmployerJobs({ jobsPosted = [] }) {
  const { accessToken } = useAuth();

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-lg font-semibold">My Job Listings</h2>
        <div className="flex space-x-3">
          <Link to="/employer/post-job">
            <IconAndLabelBtn
              className="bg-primary-dark text-primary-dark border border-primary-dark"
              icon={faPlus}
              type="secondary"
              label="Post New Job"
            />
          </Link>

          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
            <Icon icon={faFilter} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {jobsPosted.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
}

function JobCard({ job }) {
  const deleteJob = useDeleteJob();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border-b hover:bg-gray-50 rounded-lg">
      <div>
        <p className="font-medium capitalize text-lg">{job.jobTitle}</p>
        <p className="text-sm capitalize text-gray-500">
          {job.jobType} • {job.jobLocationType}
        </p>
        <p className="text-sm mt-1 capitalize">{job.salary}</p>
      </div>

      <div className="flex flex-col">
        <div className="text-sm">
          <span className="font-medium">{job.totalHires}</span> Vacancies
        </div>
        <div className="text-sm text-gray-500">Posted: {job.jobPostedOn}</div>
        <span className={`mt-2 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-50 `}>
          {/* {job.status.charAt(0).toUpperCase() + job.status.slice(1)} */}
          Active
        </span>
      </div>

      <div className="flex items-center justify-end space-x-2">
        <Link
          to={`/employer/job-details/${job._id}`}
          className="text-primary-dark hover:text-primary-dark/80 p-2"
          title="View Applicants"
        >
          <Icon icon={faUsers} />
        </Link>
        <Link to={`/employer/edit-job-details/${job._id}`} className="text-yellow-600 hover:text-yellow-900 p-2">
          <Icon icon={faEdit} title="Edit" />
        </Link>
        <button onClick={() => deleteJob(job?._id)} className="text-red-600 hover:text-red-900 p-2">
          <Icon icon={faTrash} title="Delete" />
        </button>
      </div>
    </div>
  );
}

import {
  faFileAlt,
  faSyncAlt,
  faSearch,
  faFilter,
  faUserCircle,
  faChevronRight,
  faUsers,
  faUser,
  faEye,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import Icon from "../../../../../../components/Icon";
import IconAndLabelBtn from "../../../../../../components/IconLabelAndBtn";
import { Link } from "react-router-dom";
export default function Applicants({ applications = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-lg font-semibold">Recent Applicants</h2>
        <div className="flex space-x-3 w-full sm:w-auto">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search applicants..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent"
            />
            <Icon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
            <Icon icon={faFilter} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {applications.map((application, i) => (
          <ApplicantCard key={i} application={application} />
        ))}
      </div>

      <Link
        to={"/employer/view-all-applicants"}
        className="mt-4 flex items-center text-primary-dark hover:text-primary-dark/80 font-medium"
      >
        View all applicants <Icon icon={faChevronRight} className="ml-1" />
      </Link>
    </div>
  );
}

function ApplicantCard({ application }) {
  console.log("application", application);
  const { userId, jobId, _id } = application;
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border-b hover:bg-gray-50 rounded-lg">
      <div className="md:col-span-2">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
            <Icon icon={faUserCircle} className="text-gray-400 text-xl" />
          </div>
          <div>
            <div className="font-medium">
              {userId?.firstName} {userId?.lastName}
            </div>
            <div className="text-sm text-gray-500">{userId?.email}</div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-sm font-medium">{jobId?.jobTitle}</div>
        {userId.yearsExperience && <div className="text-xs text-gray-500">{userId?.yearsExperience} experience</div>}
      </div>

      <div>
        <div className="flex flex-wrap gap-1 mb-2">
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">{userId?.skill}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="flex items-center"></div>

        <div className="flex space-x-2 justify-end">
          <Link to={`/employer/applicant-details/${_id}`}>
            <IconAndLabelBtn icon={faFileAlt} className={"text-primary-dark"} label={"View Details"}></IconAndLabelBtn>
          </Link>
        </div>
      </div>
    </div>
  );
}

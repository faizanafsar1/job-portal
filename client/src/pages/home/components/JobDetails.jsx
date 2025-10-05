import {
  faBuilding,
  faMapMarkerAlt,
  faDollarSign,
  faUsers,
  faFileAlt,
  faBriefcase,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import Icon from "../../../components/Icon";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../../config/config";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
function InfoCard({ icon, label, value, bgColor, iconColor }) {
  return (
    <div className={`flex items-center ${bgColor} rounded-lg p-3`}>
      <Icon icon={icon} className={`mr-3 ${iconColor}`} size="sm" />
      <div>
        <div className="text-xs text-gray-500 font-medium">{label}</div>
        <div className="text-sm font-semibold text-gray-900">{value}</div>
      </div>
    </div>
  );
}

export default function JobDetails({ job }) {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const handleApply = async () => {
    const res = await fetch(`${API}/check-if-applied/${job._id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(res);
    if (res.ok) {
      navigate(`/jobseeker/applyjob/${encodeURIComponent(job._id)}`);
    } else {
      toast.error("Already Applied");
    }
  };
  const getTypeColor = (type) => {
    if (type === "Full-time") return "bg-green-100 text-green-700";
    if (type === "Pa rt-time") return "bg-primary-dark/10 text-primary-dark"; // replaced blue
    return "bg-purple-100 text-purple-700";
  };

  return (
    <div
      className="flex-1 bg-white rounded-2xl shadow-lg h-full p-8 border border-gray-100 overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 20px)" }}
    >
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{job.jobTitle}</h2>
            <div className="flex items-center text-gray-600 mb-2">
              <Icon icon={faBuilding} size="sm" className="mr-2 text-primary-dark" />
              <span className="text-lg font-medium">{job.companyName}</span>
            </div>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getTypeColor(job.jobType)}`}>{job.jobType}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <InfoCard
            icon={faMapMarkerAlt}
            label="Location Type"
            value={job.jobLocationType}
            bgColor="bg-primary-light/10"
            iconColor="text-primary-dark"
          />
          <InfoCard
            icon={faDollarSign}
            label="Salary Range"
            value={job.salary}
            bgColor="bg-green-50"
            iconColor="text-green-600"
          />
          <InfoCard
            icon={faUsers}
            label="Open Positions"
            value={job.totalHires}
            bgColor="bg-purple-50"
            iconColor="text-purple-600"
          />
          <InfoCard
            icon={faFileAlt}
            label="Resume"
            value={job.resumeRequired ? "Required" : "Optional"}
            bgColor="bg-orange-50"
            iconColor="text-orange-600"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
            <Icon icon={faBriefcase} size="sm" className="mr-2 text-primary-dark" />
            Job Description
          </h3>
          <p className="text-gray-700 leading-relaxed">{job.jobDescription}</p>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
            <Icon icon={faBuilding} size="sm" className="mr-2 text-primary-dark" />
            About {job.companyName}
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">{job.companyDescription}</p>
          <div className="flex items-center text-gray-600 mb-2">
            <Icon icon={faMapMarkerAlt} size="sm" className="mr-2 text-gray-400" />
            <span className="text-sm">{job.companyLocation}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Icon icon={faEnvelope} size="sm" className="mr-2 text-gray-400" />
            <span className="text-sm">{job.companyEmail}</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={() => handleApply()}
            className="w-full bg-gradient-to-r from-primary-dark to-primary-light text-white font-semibold py-4 rounded-xl hover:from-primary-dark hover:to-primary-dark transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

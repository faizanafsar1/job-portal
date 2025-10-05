import { faBriefcase, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useEmployer } from "../../../../../context/EmployerContext";
import EmployerJobs from "./components/EmployerJobs";
import Applicants from "./components/Applicants";
import Card from "./components/Card";
export default function Dashboard() {
  const dashboardData = useEmployer();
  if (!dashboardData) {
    return <div className=" flex items-center justify-center text-gray-500">Loading profile...</div>;
  }
  const { applications, jobs, totalApplications, totalJobsPosted } = dashboardData;

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card icon={faBriefcase} title="jobs posted" count={totalJobsPosted} />
        <Card icon={faUsers} title="Applications" count={totalApplications} />
      </div>

      <div className=" gap-6 mb-8">
        <EmployerJobs jobsPosted={jobs} />
      </div>

      <Applicants applications={applications} />
    </div>
  );
}

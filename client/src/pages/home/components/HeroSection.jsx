import { useEffect, useState } from "react";
import Icon from "../../../components/Icon";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import JobList from "./JobList";
import JobDetails from "./JobDetails";
import { API } from "../../../config/config";

function Header() {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Dream Job</h1>
      <p className="text-gray-600">Discover opportunities that match your skills and aspirations</p>
    </div>
  );
}

function SearchFilters({ searchQuery, setSearchQuery, filterType, setFilterType, filterLocation, setFilterLocation }) {
  return (
    <div className="mb-6 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Icon icon={faSearch} size={"sm"} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 " />
          <input
            type="text"
            placeholder="Search jobs or companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent bg-white"
        >
          <option value="all">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>
        <select
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent bg-white"
        >
          <option value="all">All Locations</option>
          <option value="Remote">Remote</option>
          <option value="On-site">On-site</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>
    </div>
  );
}

// Main Component
export default function HeroSection() {
  const [jobsData, setJobsData] = useState([]);
  const [selectedJob, setSelectedJob] = useState({});

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch(`${API}`);
      const jobsData = await res.json();
      setJobsData(jobsData);
      setSelectedJob(jobsData[0]);
    };
    fetchJobs();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");

  const filteredJobs = jobsData?.filter((job) => {
    const matchesSearch =
      job?.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job?.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || job?.jobType === filterType;
    const matchesLocation = filterLocation === "all" || job?.jobLocationType === filterLocation;
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className=" bg-gradient-to-br from-primary-dark/5 via-white to-primary-light/10">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Header />
        <SearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterType={filterType}
          setFilterType={setFilterType}
          filterLocation={filterLocation}
          setFilterLocation={setFilterLocation}
        />
        <div className="flex gap-6 h-screen">
          <JobList jobs={filteredJobs} selectedJob={selectedJob} onSelectJob={setSelectedJob} />

          <JobDetails job={selectedJob} />
        </div>{" "}
      </div>
    </div>
  );
}

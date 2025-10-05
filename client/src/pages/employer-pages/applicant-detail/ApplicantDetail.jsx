import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../../../config/config";
import { toast } from "react-toastify";

// Mock data based on schema
const mockApplicationData = {
  jobDetails: {
    jobId: "JOB-2024-001",
    jobTitle: "Senior Full Stack Developer",
    jobDescription:
      "We are seeking an experienced Full Stack Developer to join our dynamic team. The ideal candidate will have strong experience in React, Node.js, and database management.",
    jobType: "Full-time",
    jobLocationType: "Remote",
    salary: "$80,000 - $120,000",
    totalHires: 2,
    companyName: "TechCorp Solutions",
    companyEmail: "hr@techcorp.com",
    companyDescription:
      "Leading technology solutions provider specializing in enterprise software development and digital transformation services.",
    companyLocation: "San Francisco, CA",
  },
  userDetails: {
    role: "Applicant",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    contact: "+1 (555) 123-4567",
    educationLevel: "Bachelor's Degree",
    studyField: "Computer Science",
    jobTitle: "Full Stack Developer",
    jobCompany: "Digital Innovations Inc.",
    skill: "React, Node.js, MongoDB, TypeScript, AWS",
    yearsExperience: "5",
    address: {
      streetAddress: "123 Main Street, Apt 4B",
      cityState: "New York, NY",
      postal: "10001",
    },
    resume: {
      filename: "john_doe_resume.pdf",
      filepath: "/uploads/resumes/john_doe_resume.pdf",
      mimetype: "application/pdf",
      size: "245KB",
      public_id: "resume_12345",
    },
  },
};

// Header Component
const Header = ({ firstName, lastName, jobTitle, yearsExperience }) => {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center shadow-sm">
            <i className="fas fa-user text-primary-dark text-3xl"></i>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary-dark mb-1">
              {firstName} {lastName}
            </h1>
            <p className="text-gray-600 text-lg">
              {jobTitle} • {yearsExperience} years experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Section Component
const Section = ({ title, icon, children, className = "" }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
          <i className={`${icon} text-primary-dark text-lg`}></i>
        </div>
        <h2 className="text-xl font-semibold text-primary-dark">{title}</h2>
      </div>
      {children}
    </div>
  );
};

// Info Item Component
const InfoItem = ({ icon, label, value }) => {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-2">
      <i className={`${icon} text-gray-400 text-sm mt-1`}></i>
      <div className="flex-1">
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="text-gray-900">{value}</p>
      </div>
    </div>
  );
};

// Contact Information Component
const ContactInfo = ({ email, contact, address }) => {
  return (
    <Section title="Contact Information" icon="fas fa-address-card">
      <div className="space-y-3">
        <InfoItem icon="fas fa-envelope" label="Email Address" value={email} />
        <InfoItem icon="fas fa-phone" label="Phone Number" value={contact} />
        <InfoItem
          icon="fas fa-map-marker-alt"
          label="Location"
          value={`${address.streetAddress}, ${address.cityState} ${address.postal}`}
        />
      </div>
    </Section>
  );
};

// Professional Background Component
const ProfessionalBackground = ({ userDetails }) => {
  return (
    <Section title="Professional Background" icon="fas fa-briefcase">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Current Position</p>
          <p className="text-gray-900 font-medium">{userDetails.jobTitle}</p>
          <p className="text-gray-600">{userDetails.jobCompany}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">Skills</p>
          <div className="flex flex-wrap gap-2">
            {userDetails.skill.split(",").map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

// Education Component
const Education = ({ educationLevel, studyField }) => {
  return (
    <Section title="Education" icon="fas fa-graduation-cap">
      <div>
        <p className="text-gray-900 font-medium">{educationLevel}</p>
        <p className="text-gray-600 mt-1">{studyField}</p>
      </div>
    </Section>
  );
};

// Job Application Details Component

const JobApplicationDetails = ({ jobDetails }) => {
  return (
    <Section title="Applied Position" icon="fas fa-file-alt">
      <div className="space-y-4">
        <div>
          <p className="text-lg font-semibold text-primary-dark">{jobDetails.jobTitle}</p>
          <p className="text-gray-600 mt-1">
            {jobDetails.companyName} • {jobDetails.companyLocation}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <i className="fas fa-briefcase text-gray-400"></i>
            <span className="text-gray-700">{jobDetails.jobType}</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-map-pin text-gray-400"></i>
            <span className="text-gray-700">{jobDetails.jobLocationType}</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-dollar-sign text-gray-400"></i>
            <span className="text-gray-700">{jobDetails.salary}</span>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">Job Description</p>
          <p className="text-gray-700 leading-relaxed">{jobDetails.jobDescription}</p>
        </div>
      </div>
    </Section>
  );
};

// Resume Component
const Resume = ({ resume }) => {
  return (
    <Section title="Resume" icon="fas fa-file-pdf">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
            <i className="fas fa-file-pdf text-red-600 text-xl"></i>
          </div>
          <div>
            <p className="font-medium text-gray-900">{resume.filename.split("-")[1]}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            <i className="fas fa-eye mr-2"></i>
            View
          </button>
          <Link
            target="__blank"
            to={`${resume.filepath}`}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <i className="fas fa-download mr-2"></i>
            Download
          </Link>
        </div>
      </div>
    </Section>
  );
};

// Action Bar Component
const ActionBar = () => {
  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button className="px-6 py-3 bg-white border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors font-medium">
            <i className="fas fa-times mr-2"></i>
            Reject
          </button>
          <button className="px-6 py-3 bg-white border-2 border-primary-dark text-primary-dark rounded-lg hover:bg-gray-50 transition-colors font-medium">
            <i className="fas fa-calendar mr-2"></i>
            Schedule Interview
          </button>
          <button className="px-6 py-3 bg-primary-dark text-white rounded-lg hover:opacity-90 transition-opacity font-medium">
            <i className="fas fa-check mr-2"></i>
            Accept Application
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const ApplicantDetails = () => {
  const [data, setData] = useState({
    userDetails: null,
    jobDetails: null,
  });
  const { userDetails, jobDetails } = data;
  const { id } = useParams();

  useEffect(() => {
    async function handleApplicantDetails() {
      const res = await fetch(`${API}/application-detail/${id}`);
      const data = await res.json();
      setData({
        userDetails: data.userId,
        jobDetails: data.jobId,
      });
    }
    handleApplicantDetails();
  }, [id]);
  return (
    <div className="  bg-gray-50 ">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      {userDetails && (
        <>
          <Header
            firstName={userDetails?.firstName}
            lastName={userDetails?.lastName}
            jobTitle={userDetails?.jobTitle}
            yearsExperience={userDetails?.yearsExperience}
          />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <JobApplicationDetails jobDetails={jobDetails} />
                <ProfessionalBackground userDetails={userDetails} />
                <Resume resume={userDetails?.resume} />
              </div>

              <div className="space-y-6">
                <ContactInfo email={userDetails?.email} contact={userDetails?.contact} address={userDetails?.address} />
                <Education educationLevel={userDetails?.educationLevel} studyField={userDetails?.studyField} />
              </div>
            </div>
          </div>
        </>
      )}
      <ActionBar />
    </div>
  );
};

export default ApplicantDetails;

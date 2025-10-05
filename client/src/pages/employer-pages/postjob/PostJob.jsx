import { useState } from "react";
import JobPreview from "./components/JobPreview";
import JobBasics from "./components/JobBasics";
import AddJobDetails from "./components/AddJobDetails";
import AddPayAndBenefits from "./components/AddPayAndBenefits";
import AddJobDescription from "./components/AddJobDescription";
import SetPreferences from "./components/SetPrefrences";
import PreScreenApplicants from "./components/PreScreenApplicants";
import JobPosted from "./components/JobPosted";
import PageLayout from "../../../components/PageLayout";
export default function PostJob() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    jobType: "",
    jobLocationType: "",
    salary: "",
    totalHires: 1,
    individualEmailUpdates: null,
    resumeRequired: null,
    companyName: "",
    companyEmail: "",
    companyDescription: "",
    companyLocation: "",
  });
  const sendData = async () => {
    console.log("running function");
    try {
      const res = await fetch("http://localhost:5000/post-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      alert(data.message);
      console.log("data submitted");
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to submit data");
    }
  };
  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);
  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
    console.log(formData);
  };
  const steps = ["Job Basics", "Job Details", "Pay and Benefits", "Job Description", "Preferences", "Preview", "Job Posted"];

  return (
    <div className="max-w-3xl min-h-screen  mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-start gap-2 justify-between">
          {steps.map((label, index) => (
            <div key={index} className="flex-1 text-center">
              <div
                className={`text-sm font-medium rounded-full w-8 h-8 mx-auto mb-1 flex items-center justify-center ${
                  currentStep === index + 1 ? "bg-primary-dark text-white" : "bg-gray-300 text-gray-800"
                }`}
              >
                {index + 1}
              </div>
              <div className={`text-xs ${currentStep === index + 1 ? "font-semibold text-primary-dark" : "text-gray-500"}`}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
      {currentStep === 1 && <JobBasics formData={formData} updateFormData={updateFormData} nextStep={nextStep} />}
      {currentStep === 2 && (
        <AddJobDetails formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />
      )}
      {currentStep === 3 && <AddPayAndBenefits updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />}
      {currentStep === 4 && (
        <AddJobDescription formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />
      )}
      {currentStep === 5 && (
        <SetPreferences formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />
      )}
      {/* {currentStep === 6 && (
          <PreScreenApplicants
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )} */}
      {currentStep === 6 && <JobPreview nextStep={nextStep} prevStep={prevStep} formData={formData} sendData={sendData} />}
      {currentStep === 7 && <JobPosted />}
    </div>
  );
}

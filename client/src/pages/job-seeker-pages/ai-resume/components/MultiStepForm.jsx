import { useState } from "react";
import PersonalInfoStep from "./PersonalInfoStep";
import ExperienceStep from "./ExperienceStep";
import EducationStep from "./EducationStep";
import SkillsStep from "./SkillStep";
import TemplateStep from "./TemplateStep";
import ProgressBar from "./ProgressBar";

const MultiStepForm = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    jobTitle: "",
    experience: "",
    summary: "",
    workExperience: "",
    education: "",
    skills: "",
    certifications: "",
    template: "modern",
  });

  const totalSteps = 5;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return !!(formData.fullName && formData.email && formData.jobTitle);
      case 2:
        return !!(formData.experience && formData.workExperience);
      case 3:
        return !!formData.education;
      case 4:
        return !!formData.skills;
      case 5:
        return !!formData.template;
      default:
        return false;
    }
  };

  const handleNext = () => {
    // if (!validateStep(currentStep)) {
    //   alert("Please fill in all required fields");
    //   return;
    // }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      // window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onComplete(formData);
    }
  };
  const handleCurrentStep = (step) => {
    setCurrentStep(step);
  };
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep formData={formData} onChange={handleChange} />;
      case 2:
        return <ExperienceStep formData={formData} onChange={handleChange} />;
      case 3:
        return <EducationStep formData={formData} onChange={handleChange} />;
      case 4:
        return <SkillsStep formData={formData} onChange={handleChange} />;
      case 5:
        return <TemplateStep formData={formData} onChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    <section id="form-section" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProgressBar handleCurrentStep={handleCurrentStep} currentStep={currentStep} totalSteps={totalSteps} />

        <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 sm:p-8 lg:p-10">
          {renderStep()}

          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-3 rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              className="flex-1 bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              {currentStep === totalSteps ? "Generate Resume" : "Next Step"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultiStepForm;

import { useState } from "react";
import Hero from "./components/Hero";
import MultiStepForm from "./components/MultiStepForm";
import ResumePreview from "./components/ResumePreview";

export default function AIResumeWriter() {
  const [generatedResume, setGeneratedResume] = useState(null);
  const [step, setStep] = useState(1);
  const handleComplete = (formData) => {
    setGeneratedResume(formData);
    setTimeout(() => {
      document.getElementById("preview-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleEdit = () => {
    setGeneratedResume(null);
    setTimeout(() => {
      document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {step === 1 && <Hero />}
      {step === 2 &&
        (!generatedResume ? (
          <MultiStepForm onComplete={handleComplete} />
        ) : (
          <ResumePreview resumeData={generatedResume} onEdit={handleEdit} />
        ))}
    </div>
  );
}

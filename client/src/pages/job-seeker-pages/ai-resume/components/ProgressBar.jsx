import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../../../components/Icon";

const ProgressBar = ({ currentStep, handleCurrentStep }) => {
  const steps = [
    { number: 1, label: "Personal Info" },
    { number: 2, label: "Experience" },
    { number: 3, label: "Education" },
    { number: 4, label: "Skills" },
    { number: 5, label: "Template" },
  ];

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="mb-12">
      <div className="relative max-w-3xl mx-auto px-4 sm:px-0">
        <div className="flex z-0 relative items-center justify-between">
          {/* Background Line - positioned between first and last circle */}
          <div className="bg-gray-200 rounded-2xl absolute h-1 top-5 sm:top-6 left-5 sm:left-6 right-5 sm:right-6 -z-10"></div>

          {/* Active Progress Line - grows from first circle */}
          <div
            className="bg-primary-dark rounded-2xl absolute h-1 top-5 sm:top-6 left-5 sm:left-6 -z-[8] transition-all duration-300"
            style={{
              width: `calc((100% - 2.5rem) * ${progressPercentage / 100})`,
            }}
          ></div>

          {steps.map((step) => (
            <div onClick={() => handleCurrentStep(step.number)} key={step.number} className="flex flex-col items-center z-10">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  step.number < currentStep
                    ? "bg-primary-dark text-white shadow-md"
                    : step.number === currentStep
                    ? "bg-primary-dark text-white shadow-lg scale-110"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step.number < currentStep ? <Icon icon={faCheckCircle} className="w-5 h-5 sm:w-6 sm:h-6" /> : step.number}
              </div>
              <span
                className={`mt-2 text-xs sm:text-sm font-medium transition-colors text-center ${
                  step.number <= currentStep ? "text-primary-dark" : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

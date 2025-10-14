import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../../../components/Icon";

const TemplateStep = ({ formData, onChange }) => {
  const templates = [
    {
      id: "modern",
      name: "Modern",
      desc: "Clean and minimalist design",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "professional",
      name: "Professional",
      desc: "Traditional corporate style",
      color: "from-slate-600 to-slate-800",
    },
    {
      id: "creative",
      name: "Creative",
      desc: "Bold and eye-catching",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "minimal",
      name: "Minimal",
      desc: "Simple and elegant",
      color: "from-gray-400 to-gray-600",
    },
  ];

  return (
    <div className="space-y-6 animate-slide-in">
      <div>
        <h2 className="text-2xl font-bold text-primary-dark mb-2">Choose Your Template</h2>
        <p className="text-gray-600">Select a design that matches your style</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onChange("template", template.id)}
            className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
              formData.template === template.id
                ? "border-primary-dark shadow-lg scale-105"
                : "border-gray-300 hover:border-gray-500 hover:shadow-md"
            }`}
          >
            <div className={`h-32 bg-gradient-to-br ${template.color} opacity-80 group-hover:opacity-90 transition-opacity`} />
            <div className="p-5 bg-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg text-gray-800">{template.name}</h3>
                {formData.template === template.id && (
                  <div className="w-6 h-6 rounded-full bg-primary-dark flex items-center justify-center">
                    <Icon icon={faCheckCircle} className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600">{template.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateStep;

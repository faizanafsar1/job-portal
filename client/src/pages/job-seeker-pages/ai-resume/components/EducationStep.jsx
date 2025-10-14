const EducationStep = ({ formData, onChange }) => {
  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-primary-dark mb-2">Education & Certifications</h2>
        <p className="text-gray-500">Your academic background and professional certifications</p>
      </div>

      {/* Education Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Education *</label>
        <textarea
          value={formData.education}
          onChange={(e) => onChange("education", e.target.value)}
          rows={5}
          className="w-full  outline-none px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent transition-all bg-white text-gray-800 resize-none"
          placeholder={`Bachelor of Science in Computer Science
Stanford University | 2016 - 2020
GPA: 3.8/4.0

Relevant Coursework: Data Structures, Algorithms, Machine Learning`}
        />
        <p className="text-xs text-gray-500 mt-2">Include degree, institution, graduation year, and relevant details</p>
      </div>

      {/* Certifications Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
        <textarea
          value={formData.certifications}
          onChange={(e) => onChange("certifications", e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent  outline-none transition-all bg-white text-gray-800 resize-none"
          placeholder={`AWS Certified Solutions Architect | 2023
Google Cloud Professional Developer | 2022
Certified Scrum Master (CSM) | 2021`}
        />
        <p className="text-xs text-gray-500 mt-2">Optional: List professional certifications and credentials</p>
      </div>
    </div>
  );
};

export default EducationStep;

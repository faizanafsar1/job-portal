const ExperienceStep = ({ formData, onChange }) => {
  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-primary-dark mb-2">Work Experience</h2>
        <p className="text-gray-500">Tell us about your professional journey</p>
      </div>

      {/* Experience Level */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level *</label>
        <select
          value={formData.experience}
          onChange={(e) => onChange("experience", e.target.value)}
          className="w-full outline-none px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent transition-all bg-white text-gray-800"
        >
          <option value="">Select experience level</option>
          <option value="fresher">Fresher / Entry Level</option>
          <option value="1-3">1-3 years</option>
          <option value="3-5">3-5 years</option>
          <option value="5-10">5-10 years</option>
          <option value="10+">10+ years</option>
        </select>
      </div>

      {/* Work Experience */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Work Experience *</label>
        <textarea
          value={formData.workExperience}
          onChange={(e) => onChange("workExperience", e.target.value)}
          rows={8}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent transition-all bg-white text-gray-800 resize-none"
          placeholder={`Senior Software Engineer | TechCorp Inc. | Jan 2020 - Present
• Led development of microservices architecture serving 1M+ users
• Mentored team of 5 junior developers
• Implemented CI/CD pipeline reducing deployment time by 60%

Software Developer | StartupXYZ | Jun 2018 - Dec 2019
• Developed full-stack web applications using React and Node.js
• Collaborated with design team to improve user experience`}
        />
        <p className="text-xs text-gray-500 mt-2">List your positions with company name, dates, and key achievements</p>
      </div>
    </div>
  );
};

export default ExperienceStep;

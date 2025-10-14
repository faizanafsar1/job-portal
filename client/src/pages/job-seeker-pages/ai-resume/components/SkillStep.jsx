const SkillsStep = ({ formData, onChange }) => {
  const skillCategories = [
    { label: "Programming Languages", placeholder: "JavaScript, Python, Java, C++, TypeScript" },
    { label: "Frameworks & Libraries", placeholder: "React, Node.js, Django, Spring Boot" },
    { label: "Tools & Technologies", placeholder: "Git, Docker, AWS, MongoDB, PostgreSQL" },
    { label: "Soft Skills", placeholder: "Leadership, Communication, Problem Solving, Team Collaboration" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-primary-dark mb-2">Skills & Expertise</h2>
        <p className="text-gray-500">Highlight your technical and professional skills</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 mb-2">All Skills *</label>
        <textarea
          value={formData.skills}
          onChange={(e) => onChange("skills", e.target.value)}
          rows={6}
          className="w-full px-4  outline-none py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-transparent transition-all bg-white text-gray-900 resize-none"
          placeholder="JavaScript, Python, React, Node.js, AWS, Docker, Git, PostgreSQL, MongoDB, REST APIs, GraphQL, Agile/Scrum, Leadership, Communication"
        />
        <p className="text-xs text-gray-500 mt-2">Separate skills with commas</p>
      </div>

      <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-3">💡 Skill Categories to Consider:</h4>
        <ul className="space-y-2">
          {skillCategories.map((category, index) => (
            <li key={index} className="text-sm text-gray-600">
              <span className="font-medium text-gray-800">{category.label}:</span> {category.placeholder}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SkillsStep;

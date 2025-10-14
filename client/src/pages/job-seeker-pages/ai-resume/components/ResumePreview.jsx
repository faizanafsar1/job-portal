const ResumePreview = ({ resumeData, onEdit }) => {
  const handleDownload = () => {
    alert("PDF download functionality would be implemented here with a backend service");
  };

  const skillsArray = resumeData.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <section id="preview-section" className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary-dark mb-2">Your Resume is Ready! 🎉</h2>
          <p className="text-gray-600">Review and download your professionally crafted resume</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          {/* Resume Content */}
          <div className="p-8 sm:p-12">
            {/* Header */}
            <div className="mb-8 pb-6 border-b-2 border-primary-dark/20">
              <h1 className="text-4xl font-bold text-primary-dark mb-2">{resumeData.fullName}</h1>
              <p className="text-xl font-semibold text-primary-dark mb-3">{resumeData.jobTitle}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span>📧 {resumeData.email}</span>
                {resumeData.phone && <span>📱 {resumeData.phone}</span>}
                {resumeData.location && <span>📍 {resumeData.location}</span>}
              </div>
            </div>

            {/* Summary */}
            {resumeData.summary && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-primary-dark mb-3 flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary-dark rounded-full" />
                  Professional Summary
                </h2>
                <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
              </div>
            )}

            {/* Skills */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-primary-dark rounded-full" />
                Skills & Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {skillsArray.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-primary-dark px-4 py-2 rounded-lg text-sm font-medium border border-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Work Experience */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-primary-dark rounded-full" />
                Work Experience
              </h2>
              <div className="space-y-1 text-gray-700 whitespace-pre-line leading-relaxed">{resumeData.workExperience}</div>
              <div className="mt-3 text-sm">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-600">{resumeData.experience} experience</span>
              </div>
            </div>

            {/* Education */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-primary-dark rounded-full" />
                Education
              </h2>
              <div className="text-gray-700 whitespace-pre-line leading-relaxed">{resumeData.education}</div>
            </div>

            {/* Certifications */}
            {resumeData.certifications && (
              <div>
                <h2 className="text-xl font-bold text-primary-dark mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary-dark rounded-full" />
                  Certifications
                </h2>
                <div className="text-gray-700 whitespace-pre-line leading-relaxed">{resumeData.certifications}</div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-100 px-8 py-6 flex flex-wrap gap-4 border-t border-gray-200">
            <button
              onClick={onEdit}
              className="flex-1 min-w-[200px] border-2 border-primary-dark text-primary-dark px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark hover:text-white transition-all duration-300"
            >
              Edit Resume
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 min-w-[200px] bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumePreview;

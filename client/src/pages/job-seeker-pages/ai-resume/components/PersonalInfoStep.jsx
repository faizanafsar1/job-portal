// Step 1: Personal Info
const PersonalInfoStep = ({ formData, onChange }) => {
  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-primary-dark mb-2">Personal Information</h2>
        <p className="text-gray-500">Let's start with your basic details</p>
      </div>

      {/* Grid Inputs */}
      <div className="grid sm:grid-cols-2 gap-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 outline-none focus:ring-primary-dark focus:border-transparent transition-all bg-white text-gray-800"
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 outline-none focus:ring-primary-dark focus:border-transparent transition-all bg-white text-gray-800"
            placeholder="john@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent transition-all bg-white text-gray-800"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => onChange("location", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent transition-all bg-white text-gray-800"
            placeholder="San Francisco, CA"
          />
        </div>
      </div>

      {/* Job Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
        <input
          type="text"
          value={formData.jobTitle}
          onChange={(e) => onChange("jobTitle", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent transition-all bg-white text-gray-800"
          placeholder="Senior Software Engineer"
        />
      </div>

      {/* Professional Summary */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
        <textarea
          value={formData.summary}
          onChange={(e) => onChange("summary", e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent transition-all bg-white text-gray-800 resize-none"
          placeholder="A brief overview of your professional background, key achievements, and career objectives..."
        />
      </div>
    </div>
  );
};

export default PersonalInfoStep;

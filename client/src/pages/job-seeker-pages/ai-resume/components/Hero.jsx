const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white min-h-screen flex items-center justify-center">
      {/* Decorative background blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-dark/10 blur-3xl rounded-full -z-10"></div>

      <div className="max-w-5xl mx-auto text-center px-6 sm:px-8 lg:px-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 bg-primary-dark/10 rounded-full shadow-sm">
          <span className="text-sm font-medium text-primary-dark">✨ AI-Powered Resume Builder</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-5">
          Build a <span className="text-primary-dark">Professional Resume</span> <br className="hidden sm:block" /> in Minutes —
          Powered by AI
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Choose how you want to create your resume — either step-by-step through a guided form or instantly through an AI-powered
          chat experience.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-8">
          {/* Form Resume Button */}
          <button
            onClick={() => document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-primary-dark text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            📝 Create Resume by Filling Form
          </button>

          {/* AI Chat Resume Button */}
          <button
            onClick={() => document.getElementById("chat-section")?.scrollIntoView({ behavior: "smooth" })}
            className="border-2 border-primary-dark text-primary-dark px-10 py-4 rounded-xl font-semibold text-lg hover:bg-primary-dark hover:text-white hover:shadow-md transition-all duration-300 w-full sm:w-auto"
          >
            💬 Create Resume via AI Chat
          </button>
        </div>

        {/* Decorative small text */}
        <p className="mt-10 text-sm text-gray-500">No sign-up required · Completely free to start</p>
      </div>
    </section>
  );
};

export default Hero;

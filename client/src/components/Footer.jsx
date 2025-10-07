export default function Footer() {
  return (
    <footer className="w-full bg-white border-t px-4 py-4 md:px-8 text-sm text-gray-700">
      <div className="flex flex-wrap justify-between gap-4">
        {/* Left Section */}
        <div className="flex flex-wrap gap-4">
          <a href="#" className="hover:text-blue-600">
            Browse jobs
          </a>
          <a href="#" className="hover:text-blue-600">
            Browse companies
          </a>
          <a href="#" className="hover:text-blue-600">
            Countries
          </a>
          <a href="#" className="hover:text-blue-600">
            About
          </a>
          <a href="#" className="hover:text-blue-600">
            Help
          </a>
          <a href="#" className="hover:text-blue-600">
            ESG at Talento
          </a>
        </div>

        {/* Right Section */}
        <div className="flex flex-wrap gap-4">
          <span>© 2025 Talento</span>
          <a href="#" className="hover:text-blue-600">
            Accessibility at Talento
          </a>
          <a href="#" className="hover:text-blue-600">
            Privacy Center and Ad Choices
          </a>
          <a href="#" className="hover:text-blue-600">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}

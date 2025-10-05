import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../../components/Icon";
import { faCircle, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

export default function JobPostingFailed() {
  const [errorDetails] = useState({
    errorCode: "ERR_500",
    errorMessage: "Failed to publish job posting",
    timestamp: new Date().toLocaleString(),
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-12 text-center">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <Icon icon={faCircle} size="sm"></Icon>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Job Posting Failed</h1>
          <p className="text-gray-600 mb-6">
            We encountered an error while trying to publish your job posting. Please try again or contact our support team if the
            problem persists.
          </p>

          {/* Error Details */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left">
            <div className="flex items-start gap-3">
              {" "}
              <Icon className="text-red-600 mt-0.5 flex-shrink-0" icon={faCircle} size="sm"></Icon>
              <div className="flex-1">
                <h3 className="font-semibold text-red-900 mb-2">Error Details</h3>
                <div className="space-y-1 text-sm text-red-800">
                  <p>
                    <span className="font-medium">Error Code:</span> {errorDetails.errorCode}
                  </p>
                  <p>
                    <span className="font-medium">Message:</span> {errorDetails.errorMessage}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span> {errorDetails.timestamp}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Common Issues */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Icon icon={faCircle} size="sm"></Icon>
              Common Issues & Solutions
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Check your internet connection and try again</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Ensure all required fields are properly filled</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Verify that the job description meets minimum character requirements</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Clear your browser cache and cookies</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/postjob" className="flex-1 sm:flex-initial">
              <button className="w-full px-6 py-3 bg-primary-dark hover:bg-primary-dark/90 text-white rounded-lg flex items-center justify-center gap-2 transition-colors font-medium">
                <Icon icon={faCircle} size="sm"></Icon>
                Try Again
              </button>
            </Link>
            <Link to="/employer/jobs" className="flex-1 sm:flex-initial">
              <button className="w-full px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium">
                <Icon icon={faCircle} size="sm"></Icon>
                Back to My Jobs
              </button>
            </Link>
          </div>

          {/* Support Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-4">Our support team is here to help you resolve this issue</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:support@jobportal.com"
                className="px-4 py-2 text-primary-dark hover:bg-primary-dark/10 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                <Icon icon={faEnvelope} size="sm"></Icon>
                support@jobportal.com
              </a>
              <a
                href="tel:+1234567890"
                className="px-4 py-2 text-primary-dark hover:bg-primary-dark/10 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                <Icon icon={faPhone} size="sm"></Icon>
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

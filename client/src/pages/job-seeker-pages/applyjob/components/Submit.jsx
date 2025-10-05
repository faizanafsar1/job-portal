import { faCheck, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../../../components/Icon";
import { Link } from "react-router-dom";

export default function Submit({ userData }) {
  return (
    <div className="flex flex-col items-center justify-center  p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Paper Airplane Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center">
            <Icon icon={faPaperPlane} size="2xl" className="text-4xl  text-emerald-400" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Your application has been submitted!</h1>

        {/* Email Confirmation Message */}
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-4 mb-6">
          <Icon icon={faCheck} size="sm" className=" text-emerald-400" />
          <p className="text-gray-600">
            You will get an email confirmation at &nbsp;
            <span className="font-medium">{userData.email}</span>
          </p>
        </div>

        {/* Track Applications Section */}
        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-800 mb-2">Keep track of your applications</p>
          <p className="text-gray-600">
            To keep track of your applications, go to{" "}
            <Link to="/" className="text-primary-dark  underline">
              My Jobs
            </Link>
          </p>
        </div>

        {/* Return Button */}
        <Link
          to="/"
          className=" bg-white border-2 border-primary-dark text-primary-dark py-2 px-5 block w-full text-center rounded-lg hover:bg-primary-light/10 mx-auto  transition-colors duration-200"
        >
          Return to job search
        </Link>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Having an issue with this application?{" "}
            <Link to="/help" className="text-primary-dark underline">
              Tell us more
            </Link>
          </p>
          <p className="mt-2">
            This site is protected by reCAPTCHA and the Google
            <Link to="/privacy" className="text-primary-dark">
              Privacy Policy
            </Link>
            and{" "}
            <Link to="/terms" className="text-primary-dark">
              Terms of Service
            </Link>{" "}
            apply.
          </p>
        </div>
      </div>
    </div>
  );
}

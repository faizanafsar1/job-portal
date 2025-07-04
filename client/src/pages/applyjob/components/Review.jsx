import { faArrowLeft, faFile } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/Button";
import Icon from "../../../components/Icon";

export default function Review({
  handleJobApply,
  nextStep,
  prevStep,
  userData,
}) {
  return (
    <div className="max-w-2xl  mx-auto p-4">
      <Icon icon={faArrowLeft} onClick={prevStep} size="lg" className="my-5" />

      <h1 className="text-2xl font-bold mb-8">
        Please review your application
      </h1>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-600">Contact information</h2>
          <button className="text-blue-600">Edit</button>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600">Full Name</label>
              <div className="mt-1 capitalize text-gray-900">
                {userData.firstName} {userData.lastName}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600">
                Email Address
              </label>
              <div className="mt-1 text-gray-900">{userData.email}</div>
            </div>
            <div>
              <label className="block text-sm text-gray-600">City, State</label>
              <div className="mt-1 text-gray-900">
                {userData.address.cityState}
              </div>
              <label className="block text-sm text-gray-600">Postal Code</label>
              <div className="mt-1 text-gray-900">
                {userData.address.postal}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600">
                Phone Number
              </label>
              <div className="mt-1 text-gray-900">{userData.contact}</div>
            </div>
          </div>
        </div>
      </div>

      {/* CV Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-600">CV</h2>
          <button className="text-blue-600">Edit</button>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded">
              <Icon icon={faFile} size="2xl" className="text-primary-dark" />
            </div>
            <span className="ml-3 text-primary-dark">
              {userData.resume.filename?.split("-").splice(1).join("-")}
            </span>
          </div>
        </div>
      </div>

      {/* Email Updates Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <span className="text-gray-900">
            Get email updates for the latest graphic design intern jobs in
            Pakistan
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          By creating a job alert, you agree to our Terms. You can change your
          consent settings at any time by unsubscribing or as detailed in our
          terms.
        </p>
      </div>

      {/* Terms and Privacy */}
      <div className="text-sm text-gray-600 mb-8 bg-gray-100 p-4 rounded-md leading-relaxed">
        <p className="font-semibold mb-2">By pressing apply, you:</p>
        <ul className="list-decimal list-inside space-y-2">
          <li>
            Agree to our <span className="underline">Terms</span>,{" "}
            <span className="underline">Cookie</span> &{" "}
            <span className="underline">Privacy Policies</span>.
          </li>
          <li>
            Consent to your application being transmitted to the employer
            <span className="italic"> (Indeed does not guarantee receipt)</span>
            , and processed & analyzed in accordance with both the employer’s
            and Indeed’s terms & privacy policies.
          </li>
          <li>
            Acknowledge that applying to jobs outside your country may involve
            sending your personal data to countries with lower levels of data
            protection.
          </li>
          <li>
            Understand that we may hide your contact information until the
            employer moves forward with your application.
          </li>
        </ul>
      </div>

      <Button
        label="Review and submit"
        className="place-self-end flex"
        style="primary"
        onClick={() => {
          nextStep();
          handleJobApply();
        }}
      />
    </div>
  );
}

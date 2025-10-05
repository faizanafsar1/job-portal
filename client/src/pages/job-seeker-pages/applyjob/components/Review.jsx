import { faFile, faPencil } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../components/Button";
import Icon from "../../../../components/Icon";
import IconButton from "../../../../components/IconButton";
import { useState } from "react";
import { useUser } from "../../../../context/UserContext";

export default function Review({ handleJobApply, nextStep, userData }) {
  const [isEditing, setIsEditing] = useState(false);
  const { handleSave } = useUser();
  const [data, setData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    contact: userData.contact,
    cityState: userData.cityState,
    postal: userData.postal,
  });
  return (
    <div className="shadow-lg max-w-3xl rounded-xl bg-white mx-auto p-8 md:p-10 border border-gray-200">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Please review your application</h1>

      <div className="mb-10">
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h2 className="text-lg font-semibold text-gray-700">Contact Information</h2>
          {!isEditing ? (
            <IconButton
              icon={faPencil}
              onClick={() => setIsEditing(!isEditing)}
              size="lg"
              className="text-primary-dark hover:text-primary transition"
            />
          ) : (
            <div className="flex gap-2">
              <Button
                style="secondary"
                label="Cancel"
                onClick={() => {
                  setData(userData);
                  setIsEditing(false);
                }}
                size="sm"
              />
              <Button
                style="primary"
                label="Save"
                onClick={() => {
                  handleSave(data);
                  setIsEditing(false);
                }}
                size="sm"
              />
            </div>
          )}
        </div>

        <div className="space-y-6">
          {!isEditing ? (
            <InputAndLabel isEditing={isEditing} label="Full Name" value={`${data?.firstName} ${data?.lastName}`} />
          ) : (
            <>
              <InputAndLabel
                isEditing={isEditing}
                onChange={(e) => setData({ ...data, firstName: e.target.value })}
                label="First Name"
                value={data?.firstName}
              />
              <InputAndLabel
                onChange={(e) => setData({ ...data, lastName: e.target.value })}
                isEditing={isEditing}
                label="Last Name"
                value={data?.lastName}
              />
            </>
          )}
          <InputAndLabel
            onChange={(e) => setData({ ...data, email: e.target.value })}
            isEditing={isEditing}
            label="Email Address"
            value={data?.email}
          />
          <InputAndLabel
            onChange={(e) => setData({ ...data, contact: e.target.value })}
            isEditing={isEditing}
            label="Phone Number"
            value={data?.contact}
          />
          <InputAndLabel
            onChange={(e) => setData({ ...data, cityState: e.target.value })}
            isEditing={isEditing}
            label="City, State"
            value={data?.address?.cityState}
          />
          <InputAndLabel
            onChange={(e) => setData({ ...data, postal: e.target.value })}
            isEditing={isEditing}
            label="Postal Code"
            value={data?.address?.postal}
          />
        </div>
      </div>

      {/* CV Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-600 text-lg font-semibold">Resume</h2>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded">
              <Icon icon={faFile} size="2xl" className="text-primary-dark" />
            </div>
            <span className="ml-3 text-primary-dark">{userData?.resume.filename?.split("-").splice(1).join("-")}</span>
          </div>
        </div>
      </div>

      {/* Email Updates Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <span className="text-gray-900">Get email updates for the latest graphic design intern jobs in Pakistan</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          By creating a job alert, you agree to our Terms. You can change your consent settings at any time by unsubscribing or as
          detailed in our terms.
        </p>
      </div>

      {/* Terms and Privacy */}
      <div className="text-sm text-gray-600 mb-8 bg-gray-100 p-4 rounded-md leading-relaxed">
        <p className="font-semibold mb-2">By pressing apply, you:</p>
        <ul className="list-decimal list-inside space-y-2">
          <li>
            Agree to our <span className="underline">Terms</span>, <span className="underline">Cookie</span> &{" "}
            <span className="underline">Privacy Policies</span>.
          </li>
          <li>
            Consent to your application being transmitted to the employer
            <span className="italic"> (Indeed does not guarantee receipt)</span>, and processed & analyzed in accordance with both
            the employer’s and Indeed’s terms & privacy policies.
          </li>
          <li>
            Acknowledge that applying to jobs outside your country may involve sending your personal data to countries with lower
            levels of data protection.
          </li>
          <li>Understand that we may hide your contact information until the employer moves forward with your application.</li>
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

function InputAndLabel({ label, value, isEditing, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        onChange={onChange}
        disabled={!isEditing}
        className={`w-full  rounded-md border-gray-300 text-gray-900 text-sm px-3 py-2 shadow-sm focus:ring-2 focus:ring-primary-dark focus:border-primary-dark transition-all
          ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "bg-white border"} `}
        type="text"
        value={value}
      />
    </div>
  );
}

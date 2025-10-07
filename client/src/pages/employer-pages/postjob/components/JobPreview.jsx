import { faArrowLeft, faPencil } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../../../components/Icon";
import Button from "../../../../components/Button";
export default function JobPreview({ nextStep, prevStep, formData, sendData }) {
  return (
    <div className="space-y-4 mt-20">
      <div className="p-3 border border-gray-300 rounded-lg w-fit flex items-center text-primary-dark" onClick={prevStep}>
        <Icon icon={faArrowLeft} size="lg" className="text-primary-dark mx-2" />
        Back
      </div>
      <div className="p-16 mb-10 bg-primary-light/10 rounded-2xl">
        <h2 className="text-3xl font-bold">Job Preview</h2>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Job details</h2>
      <div className="border-b border-gray-300 pb-5">
        <JobDetailField label="Job title" value={formData.jobTitle} />

        <JobDetailField label="Number of openings" value={formData.totalHires} />
        <JobDetailField label="Location" value={formData.jobLocationType} />
        <JobDetailField label="Job type" value={formData.jobType} />
        <JobDetailField label="Pay" value={formData.salary} />
        <JobDetailField label="Job description" value={formData.jobDescription} />
        <JobDetailField label="Resume Require?" value={formData.resumeRequired ? "Yes" : "No"} />
        <JobDetailField label="Updates via Email" value={formData.individualEmailUpdates ? "Yes" : "No"} />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Company Information </h2>
      <div className="border-b border-gray-300 pb-5">
        <JobDetailField label="Company Name" value={formData.companyName} />
        <JobDetailField label="Company Email" value={formData.companyEmail} />
        <JobDetailField label="Company Location" value={formData.companyLocation} />
        <JobDetailField label="Company Description" value={formData.companyDescription} />
      </div>

      <p className="text-sm text-gray-800">
        By selecting Confirm, you agree that this job post reflects your requirements, and agree it will be posted and
        applications will be processed following Talento's Terms, Cookie, and Privacy Policies.
      </p>
      <div className="ml-auto w-fit">
        <Button
          label="Confirm"
          style="primary"
          onClick={() => {
            nextStep();
            sendData();
          }}
        />
      </div>
    </div>
  );
}

function JobDetailField({ label, value }) {
  return (
    <div className="flex justify-between items-center">
      <label className="flex-1 text-gray-700 text-base font-semibold">{label}</label>
      <div className="flex flex-2 justify-between gap-10 hover:bg-primary-light/5 rounded-2xl py-3 px-4">
        <span className="text-gray-900 whitespace-pre-line">{value}</span>
        <Icon icon={faPencil} size="lg" />
      </div>
    </div>
  );
}

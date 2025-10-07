import Icon from "../../../../components/Icon";
import { faEnvelope, faPhone, faMapMarkerAlt, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ManageResume from "./profile-components/ManageResume";

export default function ProfileSection({ onEdit, userData }) {
  return (
    <div className=" bg-gray-50 p-6">
      <div className="max-w-xl  mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold capitalize">
            {userData?.firstName} {userData?.lastName}
          </h1>
          <span className="w-16 h-16 bg-gray-800 text-white uppercase rounded-full flex items-center justify-center text-2xl font-semibold">
            {userData?.firstName[0]}
            {userData?.lastName[0]}
          </span>
        </div>

        <div className="space-y-2 mb-6 relative text-gray-700">
          <Icon
            icon={faChevronRight}
            onClick={() => onEdit("EditGeneralInfo")}
            size="sm"
            className="absolute top-1/2 -translate-y-1/2 right-2 hover:bg-gray-100 p-3 rounded-lg cursor-pointer text-gray-600"
          />

          <div className="flex items-center gap-2">
            <Icon icon={faEnvelope} size="sm" className="text-gray-600" />
            <span>{userData?.email}</span>
          </div>
          {userData?.contact && (
            <div className="flex items-center gap-2">
              <Icon icon={faPhone} size="sm" className="text-gray-600" />
              <span>{userData?.contact}</span>
            </div>
          )}
          {userData?.address?.streetAddress && (
            <div className="flex items-center gap-2">
              <Icon icon={faMapMarkerAlt} size="sm" className="text-gray-600" />
              <span>{userData?.address?.streetAddress}</span>
            </div>
          )}
        </div>
        <ManageResume />

        <div className="space-y-5">
          <h2 className="text-xl font-semibold">Improve your job matches</h2>

          <div className="relative border-b pb-4">
            <Icon
              icon={faChevronRight}
              onClick={() => onEdit("EditEducation")}
              size="sm"
              className="absolute top-1/2 -translate-y-1/2 right-2 hover:bg-gray-100 p-3 rounded-lg cursor-pointer text-gray-600"
            />
            <p className="font-medium">Qualifications</p>
            <p className="text-gray-500 text-sm">Highlight your skills and experience.</p>
          </div>
        </div>

        <footer className="text-center text-xs text-gray-400 mt-10">
          ©2025 Talento -
          <a href="#" className="underline">
            Cookies, Privacy and Terms
          </a>
        </footer>
      </div>
    </div>
  );
}

import { faArrowLeft, faPencilAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import InputModal from "./InputModal";
import { useState } from "react";
import IconButton from "../../../../../components/IconButton";

const EditEducationInfo = ({ handleActiveForm, existingData, handleSave }) => {
  const [activeModal, setActiveModal] = useState(null);
  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="bg-gray-50 p-6">
      <div className="max-w-xl  mx-auto bg-white rounded-lg shadow-md p-6">
        <IconButton onClick={() => handleActiveForm()} icon={faArrowLeft} size="2xl" className="mb-5 " />
        {activeModal === "Education" && (
          <InputModal
            handleSave={handleSave}
            activeModal={activeModal}
            handleCloseModal={handleCloseModal}
            existingData={existingData}
            title={"Edit education"}
            labelOne="Level of education *"
            labelTwo="Field of study"
            schemaKeyOne="educationLevel"
            schemaKeyTwo="studyField"
          />
        )}

        {activeModal === "Experience" && (
          <InputModal
            handleSave={handleSave}
            activeModal={activeModal}
            handleCloseModal={handleCloseModal}
            existingData={existingData}
            title={"Add most recent work experience"}
            labelOne="Job Title"
            labelTwo="Company"
            schemaKeyOne="jobTitle"
            schemaKeyTwo="jobCompany"
          />
        )}
        {activeModal === "Skill" && (
          <InputModal
            handleSave={handleSave}
            activeModal={activeModal}
            handleCloseModal={handleCloseModal}
            existingData={existingData}
            title={"Add Skills"}
            labelOne="Skill *"
            labelTwo="Years of Experience"
            schemaKeyOne="skill"
            schemaKeyTwo="yearsExperience"
          />
        )}

        <h2 className="text-2xl font-semibold mb-1">Qualifications</h2>
        <p className="text-gray-500 mb-4 text-sm">
          We use these details to show you jobs that match your unique skills and experience.
        </p>

        {existingData.jobTitle ? (
          <AddedItem
            title="Most Recent Work Experience"
            labelOne={existingData?.jobTitle}
            labelTwo={existingData?.jobCompany}
            onClick={() => setActiveModal("Experience")}
          />
        ) : null}
        {existingData.educationLevel ? (
          <AddedItem
            title="Education"
            labelOne={existingData?.educationLevel}
            labelTwo={existingData?.studyField}
            onClick={() => setActiveModal("Education")}
          />
        ) : null}

        {existingData.skill ? (
          <AddedItem
            title="Skill"
            labelOne={existingData?.skill}
            labelTwo={`${existingData?.yearsExperience} Years`}
            onClick={() => setActiveModal("Skill")}
          />
        ) : null}
        {existingData.educationLevel ? null : <AddItem title="Add Education" onClick={() => setActiveModal("Education")} />}
        {existingData.jobTitle ? null : <AddItem title="Add Experience" onClick={() => setActiveModal("Experience")} />}

        {existingData.skill ? null : <AddItem title="Add Skill" onClick={() => setActiveModal("Skill")} />}

        <footer className="text-center text-xs text-gray-400 mt-8">
          ©2025 Talento –{" "}
          <a href="#" className="underline">
            Cookies, Privacy and Terms
          </a>
        </footer>
      </div>
    </div>
  );
};

const AddItem = ({ title, onClick }) => (
  <div className="flex items-center my-3 justify-between border-b last:border-b-0 py-3">
    <span className="text-primary-dark font-medium cursor-pointer">{title}</span>
    <IconButton icon={faPlus} onClick={onClick} className="text-primary-dark" size="lg" />
  </div>
);

const AddedItem = ({ labelOne, labelTwo, title, onClick }) => (
  <div className="border relative p-3 mb-5 border-gray-300 rounded-xl ">
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-base ">
      <span className="font-semibold mr-2">{labelOne}</span>
      <span className="text-gray-500">{labelTwo}</span>
    </p>

    <IconButton icon={faPencilAlt} size="xl" onClick={onClick} className=" absolute top-1/2 -translate-y-1/2 right-5" />
  </div>
);

export default EditEducationInfo;

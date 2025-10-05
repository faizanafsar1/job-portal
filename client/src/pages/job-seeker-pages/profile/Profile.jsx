import { useState } from "react";

import ProfileSection from "./components/ProfileSection";
import EditGeneralInfo from "./components/profile-components/EditGeneralInfo";
import EditEducationInfo from "./components/profile-components/EditEducationInfo";
import { useUser } from "../../../context/UserContext";
import PageLayout from "../../../components/PageLayout";

export default function Profile() {
  const [activeForm, setActiveForm] = useState(null);
  const handleActiveForm = () => {
    setActiveForm(null);
  };
  const { handleSave, userData } = useUser();

  if (!userData || userData === undefined) {
    setTimeout(() => {
      return <div className=" flex items-center justify-center text-gray-500">Loading profile...</div>;
    }, 1000);
  }
  return (
    <>
      {!activeForm && <ProfileSection userData={userData} onEdit={setActiveForm} />}
      {activeForm === "EditGeneralInfo" && (
        <EditGeneralInfo existingData={userData} handleSave={handleSave} handleActiveForm={handleActiveForm} />
      )}
      {activeForm === "EditEducation" && (
        <EditEducationInfo existingData={userData} handleSave={handleSave} handleActiveForm={handleActiveForm} />
      )}
    </>
  );
}

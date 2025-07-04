import { useState } from "react";

import PageLayout from "../../components/PageLayout";
import ProfileSection from "./components/ProfileSection";
import EditGeneralInfo from "./components/profile-components/EditGeneralInfo";
import EditEducationInfo from "./components/profile-components/EditEducationInfo";
import { useUser } from "../../context/UserContext";

export default function Profile() {
  const [activeForm, setActiveForm] = useState(null);
  const handleActiveForm = () => {
    setActiveForm(null);
  };
  const { handleSave, userData } = useUser();

  if (!userData || userData === undefined) {
    return (
      <div className=" flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }
  return (
    <PageLayout>
      {!activeForm && (
        <ProfileSection userData={userData} onEdit={setActiveForm} />
      )}
      {activeForm === "EditGeneralInfo" && (
        <EditGeneralInfo
          existingData={userData}
          handleSave={handleSave}
          handleActiveForm={handleActiveForm}
        />
      )}
      {activeForm === "EditEducation" && (
        <EditEducationInfo
          existingData={userData}
          handleSave={handleSave}
          handleActiveForm={handleActiveForm}
        />
      )}
    </PageLayout>
  );
}

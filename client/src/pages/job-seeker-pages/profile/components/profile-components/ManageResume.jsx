import { faDownload, faEllipsis, faFileAlt, faFileImport, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../../../../components/Icon";
import IconButton from "../../../../../components/IconButton";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../../../../context/UserContext";
import { useAuth } from "../../../../../context/AuthContext";
import ResumeModal from "./ResumeModal";
import { toast } from "react-toastify";

export default function ManageResume() {
  const [activeModal, setActiveModal] = useState(null);
  const handleCloseModal = () => {
    setActiveModal(null);
  };
  const { handleSave, userData } = useUser();
  const { accessToken } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete your resume?");
    if (!confirmDelete) return;

    const res = await fetch("http://localhost:5000/profile/delete-resume", {
      method: "DELETE",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();
    toast.success(data.message);
    if (res.ok) {
      handleSave({ resume: undefined });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: userData,
  });
  return (
    <div className="mb-6 ">
      <h2 className="text-xl font-semibold mb-2">Resume</h2>
      {/* modal  */}
      <ResumeModal handleSave={handleSave} activeModal={activeModal} handleCloseModal={handleCloseModal} />
      {userData?.resume ? (
        <div className="  flex items-center gap-3 p-4 border rounded-md bg-gray-50">
          <Icon icon={faFileAlt} size="2xl" className="text-primary-dark" />
          <div>
            <p className="font-medium">{userData.resume.filename?.split("-").slice(1).join("-")}</p>
            {userData.resume && (
              <p className="text-sm text-gray-500">Added {new Date(userData?.resume?.uploadedAt).toLocaleDateString()}</p>
            )}
          </div>
          <div ref={dropDownRef} className="relative ml-auto">
            <IconButton icon={faEllipsis} onClick={() => setIsOpen(!isOpen)} size="xl" className="ml-auto" />
            {isOpen && (
              <div className="border z-10 absolute left-0 top-10 border-gray-400 shadow-lg rounded-xl p-3 flex-col bg-white flex gap-2">
                <IconAndLabelBtn
                  onClick={() => window.open(userData.resume.filepath, "_blank")}
                  label="Download"
                  icon={faDownload}
                />
                <IconAndLabelBtn onClick={() => setActiveModal(true)} label="Replace" icon={faFileImport} />
                <IconAndLabelBtn onClick={() => handleDelete()} label="Delete" className="text-red-600" icon={faTrash} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <form className="border rounded-lg justify-items-center p-3 mb-2 bg-gray-50  " onSubmit={handleSubmit(handleSave)}>
          <IconAndLabelBtn label="Upload Resume" type="submit" icon={faUpload} />
          <input
            type="file"
            {...register("resume", { required: "Please upload resume" })}
            className="border p-2 rounded-lg border-gray-300 mt-2  cursor-pointer"
          />
          {errors?.resume && <p className=" capitalize text-sm text-red-600">{errors?.resume.message}</p>}
        </form>
      )}
    </div>
  );
}

function IconAndLabelBtn({ label, type, onClick, icon, className }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`p-2.5 cursor-pointer items-center flex gap-3 rounded-lg bg-white text-gray-700 hover:bg-gray-100 focus:shadow-inner focus:bg-gray-200 ${className}`}
    >
      <Icon icon={icon} size="lg" />
      <label>{label}</label>
    </button>
  );
}

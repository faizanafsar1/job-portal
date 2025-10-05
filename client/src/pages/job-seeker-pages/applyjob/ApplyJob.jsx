import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../../../components/PageLayout";
import RelevantExperience from "./components/RelevantExperience";
import Review from "./components/Review";
import Submit from "./components/Submit";
import { useUser } from "../../../context/UserContext";
import ManageResumeForApply from "./components/ManageResumeForApply";
import { useAuth } from "../../../context/AuthContext";
import { API } from "../../../config/config";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../../components/IconButton";
import IconAndLabelBtn from "../../../components/IconLabelAndBtn";
import { toast } from "react-toastify";
import JobPostingFailed from "../../employer-pages/postjob/components/JobPostingFail";

const ApplyJob = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { userData } = useUser();
  const [step, setStep] = useState(1);
  const [jobDetails, setJobDetails] = useState({});
  const { id } = useParams();

  const nextStep = () =>
    setStep((prev) => {
      return prev + 1;
    });
  const prevStep = () => setStep((prev) => prev - 1);

  useEffect(() => {
    const fetchJob = async () => {
      const res = await fetch(`${API}/getjob/${id}`);
      const data = await res.json();
      setJobDetails(data);
    };
    fetchJob();
  }, [id]);

  const handleJobApply = async () => {
    const res = await fetch(`${API}/apply-job/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userData._id }),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success("Application Submitted Successfully");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="p-10  container  mx-auto">
      {step < 3 && (
        <IconAndLabelBtn
          label={"Back"}
          icon={faArrowLeft}
          onClick={() => (step !== 1 ? prevStep() : navigate("/"))}
          size="2xl"
          className="mb-5 border border-primary-light text-primary-dark hover:bg-primary-light/10 focus:bg-primary-light/20"
        />
      )}
      {step === 1 && <ManageResumeForApply {...jobDetails} userData={userData} nextStep={nextStep} />}
      {/* {step === 2 && !userData.jobTitle && <RelevantExperience nextStep={nextStep} prevStep={prevStep} />} */}
      {step === 2 && <Review handleJobApply={handleJobApply} userData={userData} nextStep={nextStep} prevStep={prevStep} />}

      {step === 3 && <Submit userData={userData} />}
    </div>
  );
};

export default ApplyJob;

import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Index";
import PostJob from "./pages/employer-pages/postjob/PostJob";
import Profile from "./pages/job-seeker-pages/profile/Profile";
import Login from "./pages/login/Login";
import ProtectedRouteJobSeeker from "./components/ProtectedRouteJobSeeker";
import ProtectedRouteEmployer from "./components/ProtectedRouteEmployer";
import EmployerDashboard from "./pages/employer-pages/employer-dashboard/EmployerDashboard";
import SignUp from "./pages/signup/SignUp";
import ApplyJob from "./pages/job-seeker-pages/applyjob/ApplyJob";
import { ViewJobPage } from "./pages/employer-pages/job-details/JobDetails";
import PageLayoutEmployer from "./components/PageLayoutEmployer";
import PageLayout from "./components/PageLayout";
import ApplicantDetails from "./pages/employer-pages/applicant-detail/ApplicantDetail";
import ApplicantsPage from "./pages/employer-pages/applicants-page/AllApplicants";
import EditJobDetails from "./pages/employer-pages/edit-job-details/EditJobDetails";
import MyJobsPage from "./pages/employer-pages/my-jobs/MyJobs";
import AIResumeWriter from "./pages/job-seeker-pages/ai-resume/AIResume";

function App() {
  return (
    <Routes>
      {/* protected routes for employer */}
      <Route
        path="/employer"
        element={
          <ProtectedRouteEmployer>
            <PageLayoutEmployer />
          </ProtectedRouteEmployer>
        }
      >
        <Route path="post-job" element={<PostJob />}></Route>
        <Route path="dashboard" element={<EmployerDashboard />}></Route>
        <Route path="view-all-jobs" element={<MyJobsPage />}></Route>
        <Route path="view-all-applicants" element={<ApplicantsPage />}></Route>
        <Route path="job-details/:id" element={<ViewJobPage />}></Route>
        <Route path="edit-job-details/:id" element={<EditJobDetails />}></Route>
        <Route path="applicant-details/:id" element={<ApplicantDetails />}></Route>
      </Route>
      {/* protected routes for jobseeker */}
      <Route
        path="/jobseeker"
        element={
          <ProtectedRouteJobSeeker>
            <PageLayout />
          </ProtectedRouteJobSeeker>
        }
      >
        <Route path="profile" element={<Profile />}></Route>
        <Route path="applyjob/:id" element={<ApplyJob />}></Route>
      </Route>
      {/* open routes */}{" "}
      <Route path="/" element={<PageLayout />}>
        <Route path="" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="/ai" element={<AIResumeWriter />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
      </Route>
    </Routes>
  );
}

export default App;

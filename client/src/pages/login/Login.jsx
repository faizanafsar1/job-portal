import { useState } from "react";
import Icon from "../../components/Icon";
import { Link, useNavigate } from "react-router-dom";
import { faEnvelope, faLock, faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { API } from "../../config/config";
import PageLayout from "../../components/PageLayout";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };
  const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "email":
        if (!value) {
          error = "Please enter your email";
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          error = "Invalid email format";
        }
        break;
      case "password":
        if (!value) {
          error = "please enter a password";
        }
        break;
      case "role":
        if (!value) {
          error = "please select a role";
        }
        break;
    }
    return error;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) validationErrors[key] = error;
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const res = await fetch(`${API}/login`, {
      method: "POST",
      body: JSON.stringify(formData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      setAccessToken(data.accessToken);

      if (formData.role === "employer") {
        navigate("/employer/dashboard");
      } else {
        navigate("/jobseeker/profile");
      }
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-[#f4f8fb]">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Log In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1" htmlFor="role">
                Role <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-3 flex items-center pointer-events-none">
                  <Icon icon={faUser} size="sm" className="text-gray-400" />
                </div>
                <select
                  value={formData.role}
                  onChange={handleChange("role")}
                  id="role"
                  type="role"
                  name="role"
                  className="w-full pl-10
                pr-4 py-2 border border-gray-200 rounded-md focus:outline-none
                focus:ring-2 focus:ring-primary-light bg-[#f4f8fb]"
                  placeholder="Enter your email"
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="jobseeker">Job Seeker</option>
                  <option value="employer">Employer (or Recruiter / Company)</option>
                </select>
              </div>
              {errors.role && <span className="bg-red-50 text-red-600 text-xs">{errors.role}</span>}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1" htmlFor="email">
                Email <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-3 flex items-center pointer-events-none">
                  <Icon icon={faEnvelope} size="sm" className="text-gray-400" />
                </div>
                <input
                  value={formData.email}
                  onChange={handleChange("email")}
                  id="email"
                  type="email"
                  name="email"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light bg-[#f4f8fb]"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <span className="bg-red-50 text-red-600 text-xs">{errors.email}</span>}
            </div>

            <div className="">
              <label className="block text-xs font-medium text-gray-500 mb-1" htmlFor="password">
                Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-3 flex items-center pointer-events-none">
                  <Icon icon={faLock} size="sm" className="text-gray-400" />
                </div>
                <input
                  value={formData.password}
                  onChange={handleChange("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light bg-[#f4f8fb]"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center text-gray-400 focus:outline-none"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  <Icon icon={showPassword ? faEyeSlash : faEye} size="sm" />
                </button>
              </div>
              {errors.password && <span className="bg-red-50 p-1 rounded-lg text-red-600 text-xs">{errors.password}</span>}
            </div>

            <Button style="primary" label="Login" className="w-full"></Button>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-200" />
            <span className="mx-2 text-gray-400 text-xs">or</span>
            <div className="flex-grow h-px bg-gray-200" />
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-md py-2 bg-white hover:bg-gray-50 transition">
              <span className="text-gray-700 text-sm font-medium">Continue with Google</span>
            </button>
            <button className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-md py-2 bg-white hover:bg-gray-50 transition">
              <span className="text-gray-700 text-sm font-medium">Continue with Facebook</span>
            </button>
          </div>

          <p className="mt-4 text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary-light cursor-pointer hover:underline">
              Sign Up
            </Link>
          </p>
          <p className="mt-4 text-xs text-center text-gray-400">
            By loging in I accept Company's{" "}
            <span className="text-primary-light cursor-pointer hover:underline">Terms of Use</span> and{" "}
            <span className="text-primary-light cursor-pointer hover:underline">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

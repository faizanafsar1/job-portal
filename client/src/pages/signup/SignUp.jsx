import { useState } from "react";
import Icon from "../../components/Icon";
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { API } from "../../config/config";

const SignUp = () => {
  const schema = yup.object().shape({
    role: yup.string(),
    firstName: yup.string().required("this field is required"),
    lastName: yup.string().required("this field is required"),
    email: yup.string().email("invalid email address").required("this field is required"),
    password: yup.string().min(8, "Password must be 8 characters long").required("this field is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "passwords do not match ")
      .required("confirm password is required"),
    contact: yup
      .string()
      .matches(/^[0-9]{11}$/, "Contact must be 11 digits")
      .required("this field is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (formData) => {
    const res = await fetch(`${API}/signup`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    if (res.ok) {
      const data = await res.json();
      setAccessToken(data.accessToken);

      if (formData.role === "employer") {
        navigate("/employer/dashboard");
      } else {
        navigate("/jobseeker/profile");
      }

      alert(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center py-10 bg-[#f4f8fb]">
      <div className="w-full max-w-md p-5 md:p-8 bg-white rounded-2xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1" htmlFor="role">
              Signup as:
            </label>
            <div className="relative">
              <div className="absolute top-1/2 -translate-y-1/2 left-3 flex items-center pointer-events-none">
                <Icon icon={faUser} size="sm" className="text-gray-400" />
              </div>
              <select
                {...register("role")}
                id="role"
                name="role"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light bg-[#f4f8fb]"
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="jobseeker">Job Seeker</option>
                <option value="employer">Employer (or Recruiter / Company)</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1" htmlFor="firstName">
                First Name <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-3 flex items-center pointer-events-none">
                  <Icon icon={faUser} size="sm" className="text-gray-400" />
                </div>
                <input
                  {...register("firstName")}
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light bg-[#f4f8fb]"
                />
              </div>
              <span className="capitalize text-red-600 text-xs">{errors.firstName?.message}</span>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1" htmlFor="lastName">
                Last Name <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-3 flex items-center pointer-events-none">
                  <Icon icon={faUser} size="sm" className="text-gray-400" />
                </div>
                <input
                  {...register("lastName")}
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light bg-[#f4f8fb]"
                />
              </div>
              <span className="capitalize text-red-600 text-xs">{errors.lastName?.message}</span>
            </div>
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
                {...register("email")}
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light bg-[#f4f8fb]"
              />
            </div>
            <span className="capitalize text-red-600 text-xs">{errors.email?.message}</span>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1" htmlFor="contact">
              Contact <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute top-1/2 -translate-y-1/2 left-3 flex items-center pointer-events-none">
                <Icon icon={faUser} size="sm" className="text-gray-400" />
              </div>
              <input
                {...register("contact")}
                id="contact"
                type="text"
                name="contact"
                placeholder="e.g. 03001234567"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light bg-[#f4f8fb]"
              />
            </div>
            <span className="capitalize text-red-600 text-xs">{errors.contact?.message}</span>
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
                {...register("password")}
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a strong password"
                className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light bg-[#f4f8fb]"
              />
              <button
                type="button"
                className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
              >
                <Icon icon={showPassword ? faEyeSlash : faEye} size="sm" />
              </button>
            </div>
            <span className="capitalize rounded-lg text-red-600 text-xs">{errors.password?.message}</span>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1" htmlFor="confirmPassword">
              Confirm Password <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <div className="absolute top-1/2 -translate-y-1/2 left-3 flex items-center pointer-events-none">
                <Icon icon={faLock} size="sm" className="text-gray-400" />
              </div>
              <input
                {...register("confirmPassword")}
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Re-enter your password"
                className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light bg-[#f4f8fb]"
              />
              <button
                type="button"
                className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
              >
                <Icon icon={showPassword ? faEyeSlash : faEye} size="sm" />
              </button>
            </div>
            <span className="capitalize rounded-lg text-red-600 text-xs">{errors.confirmPassword?.message}</span>
          </div>

          <Button style="primary" label="SignUp" className="w-full"></Button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="mx-2 text-gray-400 text-xs">or</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-md py-2 bg-white hover:bg-gray-50 transition">
            <span className="text-gray-700 text-sm font-medium">Sign up with Google</span>
          </button>
          <button className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-md py-2 bg-white hover:bg-gray-50 transition">
            <span className="text-gray-700 text-sm font-medium">Sign up with Facebook</span>
          </button>
        </div>

        <p className="mt-4 text-sm text-center text-gray-500">
          Already have an account?
          <a href="/login" className="text-primary-light cursor-pointer hover:underline">
            Log in
          </a>
        </p>
        <p className="mt-4 text-xs text-center text-gray-400">
          By signing up to create an account I accept Company's
          <span className="text-primary-light cursor-pointer hover:underline">Terms of Use</span>
          and
          <span className="text-primary-light cursor-pointer hover:underline">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default SignUp;

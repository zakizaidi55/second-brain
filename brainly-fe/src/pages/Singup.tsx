import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const toastId = toast.loading("Creating account...");
    try {
      await axios.post(`${BACKEND_URL}/api/v1/signup`, data);
      toast.success("Account created!");
      navigate("/signin");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="relative h-screen w-screen bg-[url('/background.jpg')] bg-cover bg-center overflow-hidden">
      {/* Blur and overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-0" />
      <div className="relative z-10 flex justify-center items-center h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white bg-opacity-95 p-10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] w-full max-w-lg space-y-6"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>

          <div>
            <input
              {...register("firstName", { required: "First name is required" })}
              placeholder="First Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>

          <div>
            <input
              {...register("lastName", { required: "Last name is required" })}
              placeholder="Last Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>

          <div>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <input
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Must be 10 digits",
                },
              })}
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
            </span>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", { required: "Please confirm password" })}
              placeholder="Confirm Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
            </span>
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full mt-2 bg-indigo-600 text-white font-bold p-4 rounded-lg hover:bg-indigo-700 shadow-lg transition duration-200"
          >
            Create Account
          </button>
          <div className="text-center cursor-pointer" onClick={()=> navigate("/signin")}>
            Already have an account
          </div>


          </div>
        </form>
      </div>
    </div>
  );
}

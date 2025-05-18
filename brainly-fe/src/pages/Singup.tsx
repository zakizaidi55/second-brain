import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { BACKEND_URL } from "../config";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

// Define the type for form data
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
  // Use the FormData type with useForm
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async(data) => {
    if(data.password !== data.confirmPassword) {
        toast.error("Password and confirm password is not matched");
    }
    const toastId = toast.loading("Loading.....")
    try {
      await axios.post(`${BACKEND_URL}/api/v1/signup`, data);
    } catch(error) {
        console.log("Error in singup endpoint");
        console.log(error)
    }

    finally{
        toast.dismiss(toastId);
        navigate("/signin");
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center bg-opacity-50 backdrop-blur-md">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96 space-y-4"
      >
        <div>
          <label htmlFor="firstName" className="block text-sm font-semibold">First Name</label>
          <input
            id="firstName"
            {...register('firstName', { required: 'First name is required' })}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
          />
          {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-semibold">Last Name</label>
          <input
            id="lastName"
            {...register('lastName', { required: 'Last name is required' })}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
          />
          {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold">Email</label>
          <input
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: 'Invalid email format',
              },
            })}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-semibold">Phone Number</label>
          <input
            id="phoneNumber"
            {...register('phoneNumber', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Phone number must be 10 digits',
              },
            })}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>}
        </div>

        <div className="relative">
          <label htmlFor="password" className="block text-sm font-semibold">Password</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
          />
           <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
            </span>
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}

        </div>

        <div className="relative">
          <label htmlFor="confirmPassword" className="block text-sm font-semibold">Confirm Password</label>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            {...register('confirmPassword', {
              required: 'Confirm password is required',
            })}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
          />
            <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
            </span>
          {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
        </div>

        <div>
          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">Submit</button>
        </div>
      </form>
    </div>
  );
}

import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setToken } from "../reducers/slices/AuthSlice";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export function Signin() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const isFormValid = email.trim() !== "" && password.trim() != "";

    useEffect(() => {
        // Trigger mount animation
        setTimeout(() => setVisible(true), 10);
    }, []);

    async function signin() {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !password) {
            toast.error("Please enter both email and password");
            return;
        }

        const toastId = toast.loading("Signing in...");
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/signin`, { email, password });
            //@ts-ignore
            const token = res?.data?.token;

            if (!token) {
                toast.error("No token received");
                return;
            }

            localStorage.setItem("token", token);
            dispatch(setToken(token));
            setVisible(false);
            setTimeout(() => navigate("/dashboard"), 300); // delay for exit animation
        } catch (error: any) {
            console.error("Sign-in error:", error);
            if (error.response) {
                toast.error(error.response.data.message || "Invalid credentials");
            } else {
                toast.error("Network error");
            }
        } finally {
            toast.dismiss(toastId);
        }
    }

    function handleClose() {
        setVisible(false);
        setTimeout(() => navigate("/"), 300); // wait for animation to finish
    }
    return (
        <div className="relative h-screen w-screen bg-[url('/background.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />
            <div className="relative z-10 flex justify-center items-center h-full">
                <div
                    className={`relative bg-white bg-opacity-90 p-10 pt-12 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-out ${
                        visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
                    }`}>
                    <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
                        onClick={handleClose}
                        aria-label="Close"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign In</h2>
                    <input
                        ref={emailRef}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e?.target?.value)}
                        placeholder="Email"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    />
                    <input
                        ref={passwordRef}
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-[50px] top-[188px] cursor-pointer"
                        >
                        {showPassword ? (
                            <AiOutlineEyeInvisible size={24} />
                        ) : (
                            <AiOutlineEye size={24} />
                        )}
                    </span>
                    <button
                        onClick={signin}
                        disabled={!isFormValid}
                        className={`w-full text-white font-semibold p-3 rounded-lg shadow transition duration-200 ${isFormValid ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"}`}>
                        Login
                    </button>
                    <div className="mt-6 text-center text-sm text-gray-700 space-y-2">
                        <p
                            className="cursor-pointer hover:underline"
                            onClick={() => navigate("/signup")}
                        >
                            Don't have an account? Sign up
                        </p>
                        <p
                            className="cursor-pointer hover:underline"
                            onClick={handleClose}
                        >
                            Back to Home
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

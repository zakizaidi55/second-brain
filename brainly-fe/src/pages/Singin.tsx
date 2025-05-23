import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setToken } from "../reducers/slices/AuthSlice";

export function Signin() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            navigate("/dashboard");

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

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-[url('/background.jpg')] bg-cover bg-center">
            {/* Blurred Overlay with reduced blur */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />

            {/* Foreground Sign-in Form */}
            <div className="relative z-10 flex justify-center items-center h-full">
                <div className="bg-white bg-opacity-90 p-10 rounded-xl shadow-2xl w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign In</h2>

                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />
                    <div className="flex flex-col justify-between gap-4">
                        <button
                            onClick={signin}
                            className="w-full mt-4 bg-indigo-600 text-white font-bold p-4 rounded-lg hover:bg-indigo-700 shadow-md transition duration-200"
                        >
                            Login
                        </button>
                        <div className="text-center cursor-pointer" onClick={()=>navigate("/signup")}>
                            Don't have an account
                        </div>
                        <div className="text-center cursor-pointer" onClick={()=>navigate("/signup")}>
                            Home
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

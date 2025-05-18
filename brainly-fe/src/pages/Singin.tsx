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
        <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>

                <input
                    ref={emailRef}
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 mb-4 border rounded"
                />

                <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 mb-6 border rounded"
                />

                <div className="flex justify-between gap-4">
                    <button
                        onClick={signin}
                        className="flex-1 bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => navigate("/signup")}
                        className="flex-1 bg-gray-200 text-gray-800 p-3 rounded hover:bg-gray-300 transition"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}
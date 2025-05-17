import { useRef } from "react";
import axios from "axios";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function Signin() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null); 
    const navigate = useNavigate();

    async function signin() {
        const email = emailRef?.current?.value;
        const password = passwordRef?.current?.value;
        
        if (!email || !password) {
            toast.error("Enter email Id and password")
            return;
        }
        
        const toastId = toast.loading("Loading.....")
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                email,
                password,
            });
    
            
            // @ts-ignore
            const token = res?.data?.token;
            if (!token) {
                return;
            }
    
            localStorage.setItem("token", token);
            navigate("/dashboard");

    
        } catch (error:any) {
            console.error("Axios Error:", error);
    
            // Axios stores response errors in `error.response`
            if (error.response) {
                console.log("Error Response Data:", error.response.data);
                
            } else if (error.request) {
                console.log("No response received:", error.request);

            } else {
                console.log("Unexpected Error:", error.message);
                
            }
        }

        finally {
            toast.dismiss(toastId);
        }
    
    }

    
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border p-12 max-w-[430px]">
            <Input reference={emailRef} placeholder="Email" textType={"email"}/>
            <Input reference={passwordRef} placeholder="Password" textType={"password"} />
            <div className="flex justify-center items-center rounded pt-4"> 
                {/* <Button onClick={signin} loading={false} variant="primary" text="signup" fullWidth={true}/> */}
                <div className="flex gap-2 mx-3">
                    <button className="rounded-md border p-4 min-w-20 max-w-24" onClick={signin}>Sign in</button>
                    <button className="rounded-md border p-4 min-w-20 max-w-24 " onClick={()=> navigate("/signup")}>Create</button>
                </div>
                
            </div>
        </div>
    </div>
}
import { useRef } from "react";
import { Button } from "../components/Button";
import axios from "axios";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export function Signin() {
    const userNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null); 
    const navigate = useNavigate();

    async function signin() {
        console.log("button Clicked");
        const userName = userNameRef?.current?.value;
        const password = passwordRef?.current?.value;
    
        if (!userName || !password) {
            return;
        }
    
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                userName,
                password,
            });
    
            console.log("API Response:", res);
            
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
    
    }

    
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input reference={userNameRef} placeholder="Username"/>
            <Input reference={passwordRef} placeholder="Password" />
            <div className="flex justify-center items-center rounded pt-4"> 
                {/* <Button onClick={signin} loading={false} variant="primary" text="signup" fullWidth={true}/> */}
                <button onClick={signin}>Sign in</button>
            </div>
        </div>
    </div>
}
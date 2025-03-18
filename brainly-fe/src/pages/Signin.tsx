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
        console.log("button clicked")
        const userName = userNameRef?.current?.value;
        const password = passwordRef?.current?.value;

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            userName,
            password
        })
        //@ts-ignore
        const jwt = response?.data?.token;
        localStorage.setItem("token", jwt);
        navigate("/dashboard")
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
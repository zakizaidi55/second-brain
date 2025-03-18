import { useRef } from "react";
import { Button } from "../components/Button";
import axios from "axios";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";

export function Signup() {

    const userNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null); 

    async function signup() {
        console.log("button clicked")
        const userName = userNameRef?.current?.value;
        const password = passwordRef?.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            userName,
            password
        })

        alert("You have signed up")
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input reference={userNameRef} placeholder="Username"/>
            <Input reference={passwordRef} placeholder="Password" />
            <div className="flex justify-center items-center rounded pt-4"> 
                <button onClick={signup}>Sign up</button>
                {/* <Button onClick={Signup} loading={false} variant="primary" text="signup" fullWidth={true}/> */}
            </div>
        </div>
    </div>
}
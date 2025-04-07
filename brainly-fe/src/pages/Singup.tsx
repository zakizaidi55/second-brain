import { useRef } from "react";
import { Button } from "../components/Button";
import axios from "axios";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signup() {

    const userNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    async function signup() {
        const userName = userNameRef?.current?.value;
        const password = passwordRef?.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            userName,
            password
        })

        alert("You have signed up")
        if (userNameRef?.current) 
            userNameRef.current.value = "";
        if (passwordRef?.current)
             passwordRef.current.value = "";

    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border p-12 max-w-[430px]">
            <Input reference={userNameRef} placeholder="Username" textType={"text"}/>
            <Input reference={passwordRef} placeholder="Password" textType={"password"} />
            <div className="flex justify-center items-center rounded pt-4"> 
                <div className="flex gap-2">
                    <button className="rounded-md border p-4 max-w-36" onClick={signup}>Sign up</button>
                    <button className="rounded-md border p-4 max-w-36" onClick={()=> navigate("/signin")}>Already have an account</button>
                </div>
                {/* <Button onClick={Signup} loading={false} variant="primary" text="signup" fullWidth={true}/> */}
            </div>
        </div>
    </div>
}
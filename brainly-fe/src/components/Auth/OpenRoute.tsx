import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function OpenRoute({children} : any) {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    
    useEffect(() => {
        if(token) {
            navigate("/dashboard")
        }
    }, [token, navigate]);


    if(!token) 
        return <div>{children}</div>
}
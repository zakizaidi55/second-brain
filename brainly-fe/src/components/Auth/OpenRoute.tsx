import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function OpenRoute({children} : any) {
    const {token} = useSelector((state:any) => state.auth);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(token) {
            navigate("/dashboard")
        }
    }, [token, navigate]);


    if(!token) 
        return <div>{children}</div>
}
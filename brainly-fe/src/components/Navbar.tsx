
import { useNavigate } from "react-router-dom";
import profilePic from "../assets/images/profilePic.png"
import { useEffect, useState } from "react";
interface NavbarProps {
    toggleSidebar: () => void;
}


export function Navbar({toggleSidebar, authModal, setAuthModal}:any) {
  // const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const token  = localStorage.getItem("token");

  useEffect(()=>{
    console.log('token',token);

  },[navigate,token])

  useEffect(() => {
    if (!token) {
      navigate("/");
    } 
    else {
      navigate("/dashboard");
    }
  }, [token]);

  function logout() {
    localStorage.removeItem("token");
  }
    
  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white shadow-md">
        

      <button onClick={toggleSidebar} className="text-2xl">☰</button>
        {
            !token && 
            <div className="flex gap-2 p-2">
                <button className="text-white text-xl border p-3 rounded-md" onClick={() => navigate("/signin")}>Login</button>
                <button className="text-white text-xl border p-3 rounded-md" onClick={() => navigate("/signup")}>Signup</button>
            </div> 
        }
        {
            token && <div className="flex">
                <img src={profilePic} alt="profile" className="h-9 w-9 rounded-full"/>
                <button className="text-white text-xl border p-3 rounded-md" onClick={logout}>Logout</button>
            </div>
        }
         
        
    </header>
  );
}



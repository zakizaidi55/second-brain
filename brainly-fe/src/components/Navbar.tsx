
import { useNavigate } from "react-router-dom";
import profilePic from "../assets/images/profilePic.png"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../reducers/slices/AuthSlice";
import logo from "../../src/assets/logo/logo.png"


export function Navbar({toggleSidebar}:any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {token} = useSelector((state:any) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate("/");
    } 
    else {
      navigate("/");
    }
  }, [token]);

  function logout() {
    dispatch(setToken(null));
    localStorage.removeItem("token");
    console.log("token after resetting null ", token);
    navigate("/");
  }
    
  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white shadow-md mx-auto">  
      <div className="flex gap-3">
        <div className="md:hidden">
          <button onClick={toggleSidebar} className="text-2xl">☰</button>
        </div>
        <img src={logo} className="h-12 w-12 rounded-full cursor-pointer" onClick={() => navigate("/")}/>
      </div>
      {
        !token && 
        <div className="flex gap-2 p-2 md:visible">
          <button className="text-white text-xl border p-3 rounded-md" onClick={() => navigate("/signin")}>Login</button>
          <button className="text-white text-xl border p-3 rounded-md" onClick={() => navigate("/signup")}>Signup</button>
        </div> 
      }
      {
        token && <div className="flex md:visible">
          <img src={profilePic} alt="profile" className="h-9 w-9 rounded-full"/>
          <button className="text-white text-xl border p-3 rounded-md" onClick={logout}>Logout</button>
        </div>
      } 
    </header>
  );
}



import profilePic from "../assets/images/profilePic.png"
interface NavbarProps {
    toggleSidebar: () => void;
}


export function Navbar({toggleSidebar, authModal, setAuthModal}:any) {
    const token = localStorage.getItem("token")

  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white shadow-md">
      <button onClick={toggleSidebar} className="text-2xl">☰</button>
        {
            !token && 
            <div className="flex gap-2 p-2">
                <button className="text-white text-xl border p-3 rounded-md" onClick={()=> setAuthModal((prev:any) => !prev)}>Login</button>
                <button className="text-white text-xl border p-3 rounded-md">Signup</button>
            </div> 
        }

        {
            token && <div>
                <img src={profilePic} alt="profile" className="h-9 w-9 rounded-full"/>
            </div>
        }
         
        
    </header>
  );
}



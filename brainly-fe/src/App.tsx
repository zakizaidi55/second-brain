import { useState } from "react"
import { OpenRoute } from "./components/Auth/OpenRoute"
import { PrivateRoute } from "./components/Auth/PrivateRoute"
import { Navbar } from "./components/Navbar"
import { Dashboard } from "./pages/dashboard"
import { ErrorPage } from "./pages/ErrorPage"
import  LandingPage  from "./pages/LandingPage"
import { Signin } from "./pages/Singin"
import { Signup } from "./pages/Singup"
import { Routes, Route, useLocation } from "react-router-dom"
import { Sidebar } from "./components/Sidebar"


function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(prev => !prev);
    const location = useLocation();
    const hideNavbar = location.pathname === '/signin' || location.pathname === '/signup';

    {sidebarOpen && (
      <div
        onClick={toggleSidebar}
        className="fixed inset-0 bg-black bg-opacity-50 z-30"
      />
    )}
  return (  <div className="overflow-hidden">
   {!hideNavbar && <Navbar className="fixed top-0" toggleSidebar={toggleSidebar} />}
  <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
    <Routes>
      <Route path="/signup" element={
        <OpenRoute>
        <Signup/>
      </OpenRoute>
      }/>
      <Route path="/signin" element={
        <OpenRoute>
          <Signin/>
        </OpenRoute>
      }/>
      <Route path="/dashboard" 
      element = {
        <PrivateRoute>
          <Dashboard/>
        </PrivateRoute>
      }/>
      <Route path="*"
        element = {
          <ErrorPage/>
        }
      />
      <Route path="/"
      element={
        <LandingPage/>
      }
      />
    </Routes>
  </div>)
}

export default App

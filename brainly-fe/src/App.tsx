import { OpenRoute } from "./components/Auth/OpenRoute"
import { PrivateRoute } from "./components/Auth/PrivateRoute"
import { Dashboard } from "./pages/dashboard"
import { ErrorPage } from "./pages/ErrorPage"
import  LandingPage  from "./pages/LandingPage"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Singup"
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {
  return  <BrowserRouter>
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
  </BrowserRouter>
}

export default App

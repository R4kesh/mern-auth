import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"
import AdminPrivateroute from "./components/AdminPrivateroute"
import PrivateRoute from "./components/PrivateRoute"
import AdminLogin from "./pages/AdminLogin"
import AdminHome from "./pages/AdminHome"


function App() {
  return (
    <BrowserRouter>
   
    <Routes>
   
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/sign-in" element={<Signin/>}/>
    <Route path="/sign-up" element={<Signup/>}/>
   
    <Route element={<PrivateRoute/>}>

    <Route path="/profile" element={<Profile/>}/>
    </Route>

    <Route path="/admin-login" element={<AdminLogin/>}/>

   

    <Route path="/admin-home" element={<AdminHome/>}/>
 
    
    </Routes>
    
    </BrowserRouter>
  )
}

export default App

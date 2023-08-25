import {BrowserRouter, Route, Routes} from "react-router-dom";
import BootstrapNavbar from "./components/BootstrapNavbar.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Storage from "./pages/Storage.jsx";
import Login from "./pages/Login.jsx";
import SignUpPage from "./pages/SignUp.jsx";
import "react-toastify/dist/ReactToastify.css"
import {ToastContainer} from "react-toastify"
import PrivateRoute from "./components/PrivateRoute.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";


function App() {
    return (<>
            <BrowserRouter>
                <BootstrapNavbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/profile" element={<PrivateRoute/>}>
                        <Route path="/profile" element={<Profile/>}/>
                    </Route>
                    <Route path="/storage" element={<PrivateRoute/>}>
                        <Route path="/storage" element={<Storage/>}/>
                    </Route>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/sign-up" element={<SignUpPage/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                </Routes>
            </BrowserRouter>
            <ToastContainer/>
        </>
    );
}

export default App;

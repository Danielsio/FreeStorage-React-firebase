import {BrowserRouter, Route, Routes} from "react-router-dom";
import BootstrapNavbar from "./components/BootstrapNavbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import StoragePage from "./pages/StoragePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import "react-toastify/dist/ReactToastify.css"
import {ToastContainer} from "react-toastify"
import PrivateRoute from "./components/PrivateRoute.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";


function App() {
    return (<>
            <BrowserRouter>
                <BootstrapNavbar/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/profile" element={<PrivateRoute/>}>
                        <Route path="/profile" element={<ProfilePage/>}/>
                    </Route>
                    <Route path="/storage" element={<PrivateRoute/>}>
                        <Route path="/storage" element={<StoragePage/>}/>
                    </Route>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/sign-up" element={<SignUpPage/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                </Routes>
            </BrowserRouter>
            <ToastContainer/>
        </>
    );
}

export default App;

import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import {toast} from "react-toastify";
import GoogleOAuth from "../components/GoogleOAuth.jsx";
import {Button, Checkbox, Container, FormControlLabel, TextField} from "@mui/material";
import {auth} from "../config/firebase.js";

function LoginPage() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    });
    const {email, password} = formData;

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const login = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            if (userCredential.user) {
                navigate("/storage");
            }
        } catch (error) {
            toast.error("Bad User Credentials");
        }
    };

    return (
        <Container maxWidth="sm">
            <div>
                <h1>Welcome !</h1>
                <p>Please enter your credentials to log in.</p>
            </div>
            <form onSubmit={login}>
                <TextField
                    type="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    id="email"
                    value={email}
                    onChange={handleInputChange}
                />

                <div>
                    <TextField
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        id="password"
                        value={password}
                        onChange={handleInputChange}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={showPassword}
                                onChange={() => setShowPassword((prevState) => !prevState)}
                            />
                        }
                        label="Show Password"
                    />
                </div>

                <Link to="/forgot-password">Forgot Password</Link>

                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        size="large"
                    >
                        Login
                    </Button>
                </div>
            </form>
            <div style={{marginTop: "20px", textAlign: "center"}}>
                <hr style={{width: "100%"}}/>
                <p style={{marginTop: "10px", background: "white", padding: "0 10px"}}>or</p>
            </div>
            <GoogleOAuth/>
            <div style={{marginTop: "10px", textAlign: "center"}}>
                <Link to="/sign-up">First Time? Sign Up Here.</Link>
            </div>
        </Container>
    );
}

export default LoginPage;

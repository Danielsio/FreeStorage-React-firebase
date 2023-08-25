import {Link, useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {db} from "../config/firebase.js";
import {doc, serverTimestamp, setDoc} from "firebase/firestore";
import {toast} from "react-toastify";
import GoogleOAuth from "../components/GoogleOAuth.jsx";
import {Button, Container, TextField, Checkbox, FormControlLabel} from "@mui/material";
import {useState} from "react";
import {auth} from "../config/firebase.js";

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const {name, email, password} = formData;

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const signUp = async (e) => {
        e.preventDefault();

        console.log("creating user");
        createUserWithEmailAndPassword(auth, email, password)
            .then(response => {
                console.log(response);

                const {user} = response;
                console.log(user)
                updateProfile(auth.currentUser, {
                    displayName: name,
                });

                const formDataCopy = {...formData};
                delete formDataCopy.password;

                console.log(formData);
                formDataCopy.timestamp = serverTimestamp();

                setDoc(doc(db, "users", user.uid), formDataCopy);

                navigate("/");
            }).catch((e) => {
            console.log(e)
            toast.error("Something Went Wrong, Please Try Again Later.");
        })
    }

    return (
        <Container maxWidth="sm">
            <div>
                <h1>Join Us Today!</h1>
                <p>Sign up for an account and start exploring.</p>
            </div>
            <form onSubmit={signUp}>
                <TextField
                    type="text"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    id="name"
                    value={name}
                    onChange={handleInputChange}
                />
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
                <div style={{marginTop: "10px"}}>
                    <Button variant="contained" color="primary" type="submit" fullWidth size="large">
                        Sign Up
                    </Button>
                </div>
            </form>
            <GoogleOAuth/>
            <div style={{marginTop: "20px", textAlign: "center"}}>
                <Link to="/login">Already Have an Account? Login Here.</Link>
            </div>
        </Container>
    );
}

export default SignUp;

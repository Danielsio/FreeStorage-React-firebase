import {useState} from "react";
import {Link} from "react-router-dom";
import {sendPasswordResetEmail} from "firebase/auth";
import {toast} from "react-toastify";
import {auth} from "../config/firebase.js";
import {Button, Container, TextField, Typography, CircularProgress} from "@mui/material";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onChange = (e) => setEmail(e.target.value);

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success("Password Reset Email Sent.");
                setIsSubmitting(false);
            })
            .catch(() => {
                toast.error("Something went wrong, please try again later.");
                setIsSubmitting(false);
            });
    };

    return (
        <Container maxWidth="sm">
            <header>
                <Typography variant="h4">Forgot Password</Typography>
            </header>
            <main>
                <form onSubmit={onSubmit}>
                    <TextField
                        type="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        id="email"
                        value={email}
                        onChange={onChange}
                    />
                    <Link to="/login">Return to Login</Link>
                    <div style={{marginTop: "20px"}}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            size="large"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <CircularProgress size={24}/> : "Send Reset Link"}
                        </Button>
                    </div>
                </form>
            </main>
        </Container>
    );
}

export default ForgotPassword;

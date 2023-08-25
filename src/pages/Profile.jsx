import {auth} from "../config/firebase.js";
import {Container, Paper, Typography} from "@mui/material";

function Profile() {
    const currentUser = auth.currentUser;

    return (
        <Container maxWidth="sm">
            <div>
                <h1>Your Profile</h1>
                <p>Welcome to your profile page!</p>
            </div>
            {/* User Information */}
            <Paper elevation={3} style={{padding: "20px", marginTop: "20px"}}>
                <Typography variant="h5">User Information</Typography>
                <Typography variant="body1">
                    <strong>Name:</strong> {currentUser.displayName}
                </Typography>
                <Typography variant="body1">
                    <strong>Email:</strong> {currentUser.email}
                </Typography>
            </Paper>
        </Container>
    );
}

export default Profile;

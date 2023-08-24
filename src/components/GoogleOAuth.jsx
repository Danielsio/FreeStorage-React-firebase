import {useLocation, useNavigate} from "react-router-dom"
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import {doc, getDoc, serverTimestamp, setDoc} from "firebase/firestore"
import {db} from "../config/firebase.js"
import {toast} from "react-toastify"
import {FcGoogle} from "react-icons/fc";
import {Button} from "@mui/material";

function GoogleOAuth() {
    const navigate = useNavigate()
    const location = useLocation()

    const onGoogleClick = async () => {
        try {
            // get the result from the sign-in action
            const result = await signInWithPopup(getAuth(), new GoogleAuthProvider())

            // get hold of the user
            const user = result.user

            // create reference to the document on firestore
            const docRef = doc(db, "users", user.uid)

            // read the document from the db
            const docSnap = await getDoc(docRef)

            // if user doesn't exist, create the user
            if (!docSnap.exists()) {
                await setDoc(doc(db, "users", user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp(),
                })
            }
            navigate("/storage")
        } catch (error) {
            toast.error("something went wrong, please try again later")
        }
    }

    return (
        <div style={{marginTop: "20px", textAlign: "center"}}>
            <Button onClick={onGoogleClick}
                    variant="contained"
                    color="secondary"
                    endIcon={<FcGoogle/>}
            >
                {location.pathname === "/sign-up" ? "Sign Up" : "Login"} with Google
            </Button>
        </div>
    )
}

export default GoogleOAuth
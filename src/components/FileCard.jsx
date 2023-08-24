import {Card, CardContent, Typography, Button} from "@mui/material";
import {storage} from "../config/firebase.js";
import {ref, deleteObject} from "firebase/storage";
import {toast} from "react-toastify";
import {auth} from "../config/firebase.js";
import {ClipLoader} from "react-spinners";
import {useState} from "react"; // Import ClipLoader

// eslint-disable-next-line react/prop-types
function FileCard({file, index, refreshFiles}) {
    const [deleting, setDeleting] = useState(false);

    const handleDelete = () => {
        setDeleting(true);

        const user = auth.currentUser;
        if (!user) {
            return;
        }

        // eslint-disable-next-line react/prop-types
        const userStorageRef = ref(storage, `users/${user.uid}/${file.name}`);

        deleteObject(userStorageRef)
            .then(() => {
                toast.success("File Deleted Successfully.");
                refreshFiles();
            })
            .catch((error) => {
                console.error("Error deleting file:", error);
                toast.error("Error deleting file: " + error.message);
            })
            .finally(() => {
                setDeleting(false);
            });
    };

    return (
        <Card key={index} style={{margin: "10px 0", backgroundColor: "#f5f5f5"}}>
            <CardContent>
                <Typography variant="h6" component="div">
                    {/* eslint-disable-next-line react/prop-types */}
                    {file.name}
                </Typography>
                <div
                    style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px"}}>
                    {/* eslint-disable-next-line react/prop-types */}
                    <Button variant="outlined" color="primary" href={file.url} target="_blank"
                            rel="noopener noreferrer">
                        View File
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleDelete}>
                        {deleting ? (
                            <ClipLoader color="#fff" loading={true} size={20}/>
                        ) : (
                            "Delete File"
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default FileCard;

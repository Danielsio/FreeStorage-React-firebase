import {Card, CardContent, Typography, Button} from "@mui/material";
import {storage} from "../config/firebase.js";
import {ref, deleteObject} from "firebase/storage";
import {toast} from "react-toastify";
import {auth} from "../config/firebase.js"

// eslint-disable-next-line react/prop-types
function FileCard({file, index, refreshFiles}) {
    const handleDelete = () => {

        const user = auth.currentUser;
        if (!user) {
            return;
        }

        // eslint-disable-next-line react/prop-types
        const userStorageRef = ref(storage, `users/${user.uid}/${file.name}`); // Assuming you have 'path' information in your file object

        deleteObject(userStorageRef)
            .then(() => {
                toast.success("File Deleted Successfully.");
                refreshFiles(); // Refresh the files after deletion
            })
            .catch((error) => {
                console.error("Error deleting file:", error);
                toast.error("Error deleting file: " + error.message);
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
                        Delete File
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default FileCard;

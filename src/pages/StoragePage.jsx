import {useEffect, useState} from "react";
import {Button, Container, Paper, Typography} from "@mui/material";
import {storage} from "../config/firebase.js";
import {ref, uploadBytes, getDownloadURL, listAll} from "firebase/storage";
import {toast} from "react-toastify";
import {auth} from "../config/firebase.js";
import {ClipLoader} from "react-spinners";
import FileCard from "../components/FileCard.jsx";

function StoragePage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false); // Add uploading state

    useEffect(() => {
        console.log(files)
    }, [files]);

    useEffect(() => {
        const fetchFiles = async () => {
            const user = auth.currentUser; // Assuming you have the Firebase auth imported as 'auth'
            if (!user) {
                return;
            }

            const userStorageRef = ref(storage, `users/${user.uid}`);

            listAll(userStorageRef)
                .then((fileList) => {
                    const filePromises = fileList.items.map((fileRef) => {
                        return getDownloadURL(fileRef)
                            .then((downloadURL) => ({name: fileRef.name, url: downloadURL}))
                            .catch((error) => {
                                console.error("Error fetching download URL:", error);
                                return null;
                            });
                    });

                    Promise.all(filePromises)
                        .then((fileInfoList) => {
                            console.log(fileInfoList)
                            setFiles(fileInfoList.filter((fileInfo) => fileInfo !== null));
                        })
                        .catch((error) => {
                            console.error("Error fetching files:", error);
                        });
                })
                .catch((error) => {
                    console.error("Error listing files:", error);
                    toast.error("Error listing files: " + error.message);
                });
        };


        fetchFiles();
    }, []);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            return;
        }

        setUploading(true); // Set uploading to true

        const user = auth.currentUser;
        if (!user) {
            return;
        }

        const userStorageRef = ref(storage, `users/${user.uid}/${selectedFile.name}`);

        uploadBytes(userStorageRef, selectedFile)
            .then(() => {
                toast.success("File Uploaded Successfully.");
                setSelectedFile(null);
            })
            .catch((error) => {
                toast.error("Error uploading file: " + error.message);
            })
            .finally(() => {
                setUploading(false); // Reset uploading after upload is done
            });
    };

    return (
        <Container maxWidth="sm">
            <div>
                <h1>Welcome To Storage</h1>
                <p>Here you can Upload and view your Uploaded files.</p>
            </div>
            {/* File Upload */}
            <Paper elevation={3} style={{padding: "20px", marginTop: "20px"}}>
                <Typography variant="h5">Upload File</Typography>
                <input type="file" onChange={handleFileChange}/>
                <Button variant="contained" color="success" onClick={handleUpload}>
                    Upload
                </Button>
                {uploading && (
                    <div style={{marginTop: "10px"}}>
                        <ClipLoader color="#3f51b5" loading={true} size={20}/>
                    </div>
                )}
            </Paper>
            {/* Uploaded Files */}
            <Paper elevation={3} style={{padding: "20px", marginTop: "20px"}}>
                <Typography variant="h5">Uploaded Files</Typography>
                {files.map((file, index) =>
                    <FileCard
                        key={file.url}
                        file={file}
                        index={index}
                        refreshFiles={() => window.location.reload()}
                    />)}
            </Paper>
        </Container>
    );
}

export default StoragePage;

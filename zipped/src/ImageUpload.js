import React, {useState} from 'react';
import { Button } from '@material-ui/core';
import {storage, db, firebaseApp} from './firebase';
import './firebase';
import './ImageUpload.css';

function ImageUpload({username}) {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [captions, setCaptions] = useState('');

    const handleChange = (e) => {
        if (e.target.files(0)){
            setImage(e.target.files(0))
        }
    }

    const handleUpload = () => 
    {
        const uploadTask = storage.ref('images/${image.name}').put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            },
            (error) => {
                console.log(error);
                alert(error.message); 
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("posts").add({
                            //timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            captions: captions,
                            imageUrl: url,
                            username: username
                        });

                        setProgress(0);
                        setCaptions("");
                        setImage(null);
                    })
            }
        )
    }
    return (
        <div className = "ImageUpload">
            <progress className="ImageUpload_progress" value={progress} max="100" />
            <input type = "text" placeholder='Enter information' onChange={event => setCaptions(event.target.value)}value={captions}/>
            <input type = "file" onChange= {handleChange} />
            <Button onClick={handleUpload}>
                Upload
            </Button>

        </div>
    )
}

export default ImageUpload

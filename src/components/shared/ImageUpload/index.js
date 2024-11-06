import React from 'react';
import "./index.css"
import {useState} from "react";
import {storage} from "../../../services/firbase";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import {Upload, Button, message, Progress, Image} from "antd"
import {UploadOutlined} from "@ant-design/icons"


const ImageUpload = () => {

    const [uploading, setUploading] = useState(false) // to show upload process
    const [progress, setProgress] = useState(0) // to show progress
    const [url, setUrl] = useState("");

    const handleUpload = ({file}) => { // TODO
        // console.log(file, ">>>>>>>>>>")
        setUploading(true) // to start progress
        const storageRef =  ref(storage, `profileImages/${file.name}`); // to create a image
        const uploadTask = uploadBytesResumable(storageRef, file) // to store a image

        uploadTask.on("state_changed", (snapshot)=>{
            console.log(snapshot)

            const progVal = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)

            setProgress(progVal)
        },
            (error)=>{
                setUploading(false)
                setProgress(0)
                message.error(`Error Uploading File ${error.message} `)
            }, ()=>{
                getDownloadURL(uploadTask.snapshot.ref )
                    .then((imgUrl)=>{
                        setUploading(false)
                        setProgress(0)
                        setUrl(imgUrl)
                        message.success(`Uploading File successfully`)
                    })

            }

        )


    }









    return (
        <div>

            <Upload
                customRequest={handleUpload}
                showUploadList={false}
            >
                <Button disabled={uploading} icon={<UploadOutlined/>}>

                    {
                        uploading ? "Uploading..." : "Upload Image"
                    }

                </Button>
            </Upload>
            {
                uploading && <Progress percent={progress}/>
            }
            {
                url &&  <div>  <Image src={url}  width={100}  /> </div>
            }
        </div>
    )
}


export default ImageUpload
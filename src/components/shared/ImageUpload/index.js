import React from 'react';
import "./index.css"
import {useState} from "react";
import {storage} from "../../../services/firbase";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import {Upload, message, Progress, Image, notification} from "antd"
import { PlusOutlined} from "@ant-design/icons"
import {STORAGE_PATH_NAMES, FIRESTORE_PATH__NAMES} from "../../../core/constants/constants";

import {useDispatch, useSelector} from "react-redux";
import {setImageProfileUrl} from "../../../state-management/slices/userProfile";

import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../../services/firbase";

const ImageUpload = () => {

    const {userData:{uid, imgUrl}} = useSelector(store=> store.userProfile.authUserInfo);

    const {userData} = useSelector(store=> store.userProfile.authUserInfo);

    console.log(userData, "PPPPP")

    const dispatch = useDispatch()



    const [uploading, setUploading] = useState(false) // to show upload process
    const [progress, setProgress] = useState(0) // to show progress


    const UpdateedUserProfileImage = async(imgUrl)=>{
        try{
            const  userDocRef = doc(db, FIRESTORE_PATH__NAMES.REGISTERED_USERS, uid )
            await updateDoc(userDocRef, {imgUrl})

        }catch(e){
            notification.error({
                message: "Error:"
            })
        }
    }







    const handleUpload = ({file}) => { // TODO
        // console.log(file, ">>>>>>>>>>")
        setUploading(true) // to start progress

        const storageRef =  ref(storage, `${STORAGE_PATH_NAMES.PROFILE_IMAGES}/${uid}`); // to create a image

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

                        UpdateedUserProfileImage(imgUrl)
                        dispatch(setImageProfileUrl(imgUrl))
                        message.success(`Uploading File successfully`)
                    })

            }

        )


    }


    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {uploading ? <Progress type="circle" size={80} percent={progress}/> : <PlusOutlined />}
        </button>
    );








    return (
        <div>

            <Upload
                customRequest={handleUpload}
                showUploadList={false}
                listType="picture-card"
            >
                {imgUrl ? <Image width={100} src={imgUrl} /> : uploadButton}
            </Upload>
        </div>
    )
}


export default ImageUpload
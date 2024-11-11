import React, { useEffect, useState } from 'react'
import {Button, Form, Input, message, notification, Tag} from "antd"
import {db, storage} from "../../services/firbase"
import { doc,  updateDoc } from 'firebase/firestore' // edit enq anum datan basaum

import "./index.css"
import {FIRESTORE_PATH__NAMES, STORAGE_PATH_NAMES} from '../../core/constants/constants'
import {useDispatch, useSelector} from "react-redux";
import ImageUpload from "../../components/shared/ImageUpload";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {setImageProfileUrl} from "../../state-management/slices/userProfile";


const Profile = () => {

const dispatch = useDispatch() ////////
const {authUserInfo: {userData}} = useSelector(store=> store.userProfile); /////////


const [form] = Form.useForm()
const [loading, setLoading] = useState(false)
const {uid, ...restData} = userData /////

    console.log(restData, "UUUUUUU")

const {name, lastname, email, position, imgUrl,  status} = restData ///////


useEffect(()=>{
  form.setFieldsValue(restData)
  // setImageUrl(image); // set image
  }, [restData, form])



const handleEditUserProfile = async (values)=>{
  setLoading(true)
 try{
  const  userDocRef = doc(db, FIRESTORE_PATH__NAMES.REGISTERED_USERS, uid )
  // const updatedValues = { ...values, imgUrl: ""  };  ///

  await updateDoc(userDocRef, values)

// dispatch(fetchUserProfileInfo(values))


  notification.success({
    message: "User Information successfully updated"
  })
 }catch(e){
  console.log(e)
  notification.error({
    message: " Error :( "
  })
 }finally{
  setLoading(false)
 }

}

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


  return (
      <div className='ProfileContainer'>


          <h2>User Profile</h2>

<div className="ProfileVisualPart">
              <div>
                  <img
                      src={imgUrl ||"https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-man-avatar-wearing-gray-suit-png-image_6102786.png"}
                      alt="sts"
                  />
              </div>
              <div className="VisualProfPart">

                  <h1>{name} {lastname}</h1>
                  <h4>{position}</h4>
                  <Tag className="tagStatus" color="magenta">{status}</Tag>
                  <span>{email}</span>

              </div>
          </div>

          <Form className="formCont" layout='vertical' form={form} onFinish={handleEditUserProfile}>

              <Form.Item
                  label="Image"
              >
                  <ImageUpload

                      handleUpload={handleUpload}
                      progress={progress}
                      uploading={uploading}

                  />

              </Form.Item>


              <Form.Item
                  label="Firstname"
                  name="name"
                  rules={[
                      {
                          required: true,
                          message: "Please input your first name!",
                      },
                  ]}

              >
                  <Input placeholder='Firstname'/>
              </Form.Item>

              <Form.Item
                  label="LastName"
                  rules={[
                      {
                          required: true,
                          message: "Please input your Last name!",
                      },
                  ]}
                  name="lastname"
              >
                  <Input placeholder='LastName'/>
              </Form.Item>

              <Form.Item
                  label="Email"
                  name="email"
              >
                  <Input readOnly placeholder='Email'/>
              </Form.Item>

              <Form.Item
                  label="Phone Number"
                  name="phonenumber"
                  rules={[
                      {
                          required: true,
                          message: "Please input your Phone Number!",
                      },
                  ]}
              >
                  <Input placeholder='Position'/>
              </Form.Item>

              <Form.Item
                  label="Position"
                  name="position"
                  rules={[
                      {
                          required: true,
                          message: "Please input your Position in Company!",
                      },
                  ]}
              >
                  <Input placeholder='Position'/>
              </Form.Item>

              <Form.Item
                  label="Gender"
                  name="gender"
                  rules={[
                      {
                          required: true,
                          message: "Please input your gender male, female or ... !",
                      },
                  ]}
              >
                  <Input placeholder='Gender male, female ....'/>
              </Form.Item>

              <Form.Item
                  label="Work Status"
                  name="status"
              >
                  <Input placeholder='Status..on Work, Vacation ...'/>
              </Form.Item>

              <Button loading={loading} type='primary' htmlType='submit'>Submit</Button>
          </Form>
      </div>
  )
}

export default Profile

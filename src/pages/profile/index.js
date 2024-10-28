import React, { useEffect, useState } from 'react'

import {Button, Form, Input, message, notification, Upload } from "antd"

import { PlusOutlined } from '@ant-design/icons';


import  {db} from "../../services/firbase"
import { doc,  updateDoc } from 'firebase/firestore' // edit enq anum datan basaum


// firebase storige i hamar
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';




import { AuthContext } from '../../Context/authContext'
import { useContext } from 'react'



import "./index.css"
import { FIRESTORE_PATH__NAMES } from '../../core/constants/constants'


const Profile = () => {

const {userProfileInfo, handleGetUserData} = useContext(AuthContext)
const [form] = Form.useForm()
const [loading, setLoading] = useState(false)
const {uid, image, ...restData} = userProfileInfo









// handle Image Upload and Preview

const [imageUrl, setImageUrl] = useState(image || null)
const storage = getStorage()


useEffect(()=>{
  form.setFieldsValue(restData)
  // setImageUrl(image); // set image
  }, [restData, form, userProfileInfo])
  
  



const handleUpload = (options)=>{

  const { file, onSuccess, onError } = options;

  const storigeref = ref(storage, `images/${uid}/${file.name}`)
  const uploadTask = uploadBytesResumable(storigeref, file)

uploadTask.on(
  "state_changed",
  null,
  (error)=> {
    message.error(`Upload failed: ${error.message}`)
    onError(error)
  },
  
  async ()=>{
    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
    setImageUrl(downloadUrl)

    console.log(downloadUrl, ">>>>>>>>>>>>>>>>>>>>>>>")

    onSuccess(null, file)
    message.success("Upload Successfull")
    
  }

)

}


console.log(imageUrl, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

// handle update user data 


const handleEditUserProfile = async (values)=>{
  setLoading(true)
 try{
  console.log(values)//
  const  userDocRef = doc(db, FIRESTORE_PATH__NAMES.REGISTERED_USERS, uid )


  const updatedValues = { ...values, image: imageUrl || userProfileInfo.image  };  ///


  await updateDoc(userDocRef, updatedValues)
  handleGetUserData(uid)
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






  return (
    <div className='FormPageCont'>
      <h2>User Profile</h2>
      <Form layout='vertical' form={form} onFinish={handleEditUserProfile}>


      <Form.Item
label="Profile Image"
name="image"
>

<Upload
listType="picture-card"
showUploadList={false}
customRequest={handleUpload}
>

{imageUrl ? <img src={imageUrl} alt="Uploaded" style={{ width: '100%' }} /> : <PlusOutlined />}

</Upload>

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
<Input placeholder='Firstname' />
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
<Input placeholder='LastName' />
</Form.Item>

<Form.Item
label="Email"
name="email"
>
<Input readOnly placeholder='Email' />
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
<Input placeholder='Position' />
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
<Input placeholder='Position' />
</Form.Item>

<Form.Item
label="gender"
name="gender"
rules={[
  {
    required: true,
    message: "Please input your gender male, female or ... !",
  },
]}
>
<Input placeholder='Gender male, female ....' />
</Form.Item>

<Button loading={loading} type='primary' htmlType='submit'>Submit</Button>

      </Form>
    </div>
  )
}

export default Profile

import React, { useEffect, useState } from 'react'
import {Button, Form, Input,  notification } from "antd"
import  {db} from "../../services/firbase"
import { doc,  updateDoc } from 'firebase/firestore' // edit enq anum datan basaum

// firebase storige i hamar
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { useDispatch} from "react-redux"; // vorpesi stori mej set u get anenq
import {increment, decrement} from "../../state-management/slices/userProfile";


import { AuthContext } from '../../Context/authContext'
import { useContext } from 'react'


import "./index.css"
import { FIRESTORE_PATH__NAMES } from '../../core/constants/constants'






const Profile = () => {


// const {count} = useSelector((store)=>store.userProfile)
const dispatch = useDispatch()





const {userProfileInfo, handleGetUserData} = useContext(AuthContext)
const [form] = Form.useForm()
const [loading, setLoading] = useState(false)
const {uid, image, ...restData} = userProfileInfo





useEffect(()=>{
  form.setFieldsValue(restData)
  // setImageUrl(image); // set image
  }, [restData, form, userProfileInfo])
  
  

const handleEditUserProfile = async (values)=>{
  setLoading(true)
 try{
  // console.log(values)

  const  userDocRef = doc(db, FIRESTORE_PATH__NAMES.REGISTERED_USERS, uid )


  const updatedValues = { ...values  };  ///


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

        {/*<button onClick={()=>dispatch(decrement())}>-</button>*/}
        {/*/!*<span>{count}</span>*!/*/}
        {/*<button onClick={()=>dispatch(increment())}>+</button>*/}


      <h2>User Profile</h2>
      <Form layout='vertical' form={form} onFinish={handleEditUserProfile}>


{/*      <Form.Item*/}
{/*label="Profile Image"*/}
{/*name="image"*/}
{/*>*/}

{/*<Upload*/}
{/*// listType="picture-card"*/}
{/*// showUploadList={false}*/}
{/*// customRequest={handleUpload}*/}
{/*>*/}

{/*/!* {imageUrl ? <img src={imageUrl} alt="Uploaded" style={{ width: '100%' }} /> : <PlusOutlined />} *!/*/}

{/*</Upload>*/}

{/*</Form.Item>*/}





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

import React, { useEffect, useState } from 'react'
import {Button, Form, Input,  notification, Tag } from "antd"
import  {db} from "../../services/firbase"
import { doc,  updateDoc } from 'firebase/firestore' // edit enq anum datan basaum



import "./index.css"
import { FIRESTORE_PATH__NAMES } from '../../core/constants/constants'
import {useDispatch, useSelector} from "react-redux";
import {fetchUserProfileInfo} from "../../state-management/slices/userProfile";


const Profile = () => {

    const dispatch = useDispatch() ////////
    const {authUserInfo: {userData}} = useSelector(store=> store.userProfile); /////////

// const {userProfileInfo, handleGetUserData} = useContext(AuthContext)
const [form] = Form.useForm()
const [loading, setLoading] = useState(false)
const {uid, ...restData} = userData /////


const {name, lastname, email, position, status} = userData ///////


useEffect(()=>{
  form.setFieldsValue(restData)
  // setImageUrl(image); // set image
  }, [restData, form])
  
  

const handleEditUserProfile = async (values)=>{
  setLoading(true)
 try{
  // console.log(values)

  const  userDocRef = doc(db, FIRESTORE_PATH__NAMES.REGISTERED_USERS, uid )


  const updatedValues = { ...values  };  ///


  await updateDoc(userDocRef, updatedValues)
dispatch(fetchUserProfileInfo)
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
<div className='ProfileContainer'>



<h2>User Profile</h2>

<div className="ProfileVisualPart">
        <div>
            <img
                src={ "https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-man-avatar-wearing-gray-suit-png-image_6102786.png"}
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
label="Gender"
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

    <Form.Item
        label="Work Status"
        name="status"
    >
        <Input placeholder='Status..on Work, Vacation ...' />
    </Form.Item>

<Button loading={loading} type='primary' htmlType='submit'>Submit</Button>
</Form>
</div>
  )
}

export default Profile

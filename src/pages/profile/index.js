import React, { useEffect } from 'react'

import {Button, Form, Input} from "antd"


import { AuthContext } from '../../Context/authContext'
import { useContext } from 'react'


import "./index.css"


const Profile = () => {

const {userProfileInfo} = useContext(AuthContext)
const [form] = Form.useForm()


useEffect(()=>{
const {uid, ...restData} = userProfileInfo
form.setFieldsValue(restData)
}, [form, userProfileInfo])

  return (
    <div>
      <h2>User Profile</h2>
      <Form layout='vertical' form={form}>

<Form.Item
label="Firstname"
name="name"

>
<Input placeholder='Firstname' />
</Form.Item>

<Form.Item
label="LastName"
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
>
<Input placeholder='Phone Number' />
</Form.Item>

<Button type='primary' htmlType='submit'>Submit</Button>

      </Form>
    </div>
  )
}

export default Profile

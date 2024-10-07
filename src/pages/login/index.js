import React, { useState } from "react";

import { Form, Input, Button } from "antd";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../services/firbase";


const Login = () => {
  const [form] = Form.useForm();


const [loading, setLoading] = useState(false)



  const handleLogin = async values => {
   
    setLoading(true)
    try{
  const {email ,password} = values
const resp = await signInWithEmailAndPassword(auth, email, password)
form.resetFields()
console.log(resp, ">>>>>")

    }catch(error){
      console.log(error)
    }finally{
      setLoading(false)
    }



  };

  return (
    <div className="logincont">
      <h2>Log In</h2>
      <Form layout="vertical" form={form} onFinish={handleLogin}>
        <Form.Item
          label="Email"
          name="email"
           tooltip="This field is for your Email"
          rules={[
            {
              required: true,
              message: "Pls enter your Eamil",
            },

          ]}
        >
        <Input type="email" placeholder="email" />
        </Form.Item>


        <Form.Item
          label="Password"
          name="password"
          tooltip="Password must be 6-16 characters, including at least one number and one..."
          rules={[
            {
              required: true,
              message: "Pls enter your Password",
            }
          ]}
        >
        <Input.Password placeholder="Password" />
        </Form.Item>


        <Button type="primary" htmlType="submit" loading={loading}> Login </Button>
          
      </Form>
    </div>
  );
};

export default Login;

import React, { useState } from "react";

import { Form, Input, Button, Flex } from "antd";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../../services/firbase";

import { Link } from "react-router-dom";

import { ROUTE_CONSTANTS } from "../../../core/constants/constants";

import LoginBanner from "../../../core/images/login.jpg"

import Wraper from "../../../components/shared/AuthWraper";


const Login = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const { email, password } = values;
      await signInWithEmailAndPassword(auth, email, password);
      form.resetFields();
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (

    
     <Wraper title="Sign In" banner={LoginBanner}>
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
         
          rules={[
            {
              required: true,
              message: "Pls enter your Password",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

<Flex wrap justify="center" align="center">
<Button
          style={{ width: "100%" }}
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Login
        </Button>
   
          <Link to={ROUTE_CONSTANTS.REGISTER}>
          <Button
          style={{ width: "100%" }}
          type="Link"
        >
          Create Acount
        </Button>
          </Link>
</Flex>

        

        
      </Form>
    </Wraper>

   
  );
};

export default Login;

import React, { useState } from "react";

import { Form, Input, Button } from "antd";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../services/firbase";

import { Link } from "react-router-dom";

import { ROUTE_CONSTANTS } from "../../core/constants/constants";

import { Flex } from "antd";

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
   <Flex gap="small" wrap justify="center" >
    
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
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Button
          style={{ width: "100%" }}
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Login
        </Button>
          <br></br>
          <Link to={ROUTE_CONSTANTS.REGISTER}>
          <Button
          style={{ width: "100%" }}
          type="Link"
        >
          Create Acount
        </Button>
          </Link>

        
      </Form>
    </div>

    <div className="loginImg">
      
    </div>
   </Flex>
  );
};

export default Login;

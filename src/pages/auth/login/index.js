import React from "react";

import { Form, Input, Button, Flex } from "antd";
import {notification} from "antd"
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "../../../services/firbase";

import { Link } from "react-router-dom";

import { ROUTE_CONSTANTS } from "../../../core/constants/constants";

import LoginBanner from "../../../core/images/login.jpg"

import Wraper from "../../../components/shared/AuthWraper";

import { FaGoogle } from "react-icons/fa";

import {fetchUserProfileInfo, setIsAuth} from "../../../state-management/slices/userProfile";
import {useDispatch} from "react-redux";

const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch(); /////



  const handleWithGoogle = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Successful Google Sign-In
      console.log("Google sign-in successful:", result.user);
    } catch (error) {
      notification.error({
        message: "Invalid Login Credentials", // Fixed message typo
      });
    }
  };



  const handleLogin = async (values) => {

    try {
      const { email, password } = values;
      await signInWithEmailAndPassword(auth, email, password);
      form.resetFields();
      dispatch(fetchUserProfileInfo()) ///////// setIsauth i poxaren anum enq sa
    } catch (error) {
      notification.error({
        message: "Invalid Login Credentials", // Fixed message typo
      });
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
          <Input type="email" placeholder="email" style={{ fontSize: '16px' }}/>
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

<Flex wrap justify="center" align="center" gap="10px">
<Button
          style={{ width: "100%" }}
          type="primary"
          htmlType="submit"
          // loading={loading}
        >
          Login
        </Button>
   
        <Button
            onClick={handleWithGoogle}
            style={{ width: "100%" }}
            type="default"
          >
           <FaGoogle></FaGoogle> Log In with Google
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

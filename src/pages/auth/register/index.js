import React, { useState } from "react";

import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { Form, Button, Input, Flex } from "antd";
import { auth, db } from "../../../services/firbase";

import {doc, setDoc} from "firebase/firestore"

import {
  FIRESTORE_PATH__NAMES,
  passWalidation,
  ROUTE_CONSTANTS,
} from "../../../core/constants/constants";

import Wraper from "../../../components/shared/AuthWraper";
import RegisterBanner from "../../../core/images/register.jpg";

import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

import "./index.css";


// class Register extends React.Component {
//   constructor () {
//     super();
//     this.state = {
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: '',
//       loading: false
//     }
//   }

//   handleChangeInput = e => {
//     const { name, value } = e.target;
//     this.setState({
//       [name]: value
//     });
//   }

//   handleRegister = async e => {
//     e.preventDefault();
//     this.setState({
//       loading: true
//     });

//     const { email, password }  = this.state;
//     try {
//      await createUserWithEmailAndPassword(auth, email, password);
//     }catch {

//     } finally {
//       this.setState({
//         loading: false
//       });
//     }
//   }
//   render () {
//     const { loading } = this.state;

//     return (
//       <div className="auth_container">
//           <Form layout="vertical">
//             <Form.Item label="First Name">
//               <Input type="text" name="firstName" placeholder="First Name" onChange={this.handleChangeInput}/>
//             </Form.Item>

//             <Form.Item label="Last Name">
//               <Input type="text" name="lastName" placeholder="Last Name" onChange={this.handleChangeInput}/>
//             </Form.Item>

//             <Form.Item label="Email">
//               <Input type="email" name="email" placeholder="Email" onChange={this.handleChangeInput}/>
//             </Form.Item>

//             <Form.Item label="Password">
//               <Input.Password type="password" name="password" placeholder="Password" onChange={this.handleChangeInput}/>
//             </Form.Item>

//             <Button type="primary" onClick={this.handleRegister} loading={loading}>Register</Button>
//           </Form>
//       </div>
//     )
//   }
// };

// export default Register;

// import { useContext } from "react";
// import { AuthContext } from "../../../Context/authContext";



const Register = () => {




  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleWithGoogle = async (e) => {
    e.preventDefault();
    setLoading(true)
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const {user} = result
      const {uid, displayName, email} = user
      const [name, lastname] = displayName.split(" ")
      // Successful Google Sign-In
      // console.log("Google sign-in successful:", result.user);

      const createddoc = doc(db, FIRESTORE_PATH__NAMES.REGISTERED_USERS, uid)
      await setDoc(createddoc, {
        uid, name, lastname, email
      })

      // Navigate to the profile page after successful sign-in
      navigate(ROUTE_CONSTANTS.LOGIN);
    } catch (e) {
      console.log(e);
    }
  };

  const handleRegister = async (values) => {
    setLoading(true);
    const { name, lastname, email, password } = values;
    try {
      // avelacnum enq datan db -um ->
     const response =  await createUserWithEmailAndPassword(auth, email, password); // vercreci responsey
     const {uid} = response.user; // estexic uid -n 
     const createddoc = doc(db,  FIRESTORE_PATH__NAMES.REGISTERED_USERS, uid) // (1-databasan, papkan vortex qcum enq, u et user i idn)
     await setDoc(createddoc, {
      uid, name, lastname, email
     }) // set enq anum datan 
      console.log(values )
      navigate(ROUTE_CONSTANTS.LOGIN);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };





  return (
    <Wraper title="Register" banner={RegisterBanner}>
      <Form layout="vertical" form={form} onFinish={handleRegister}>
        <Form.Item
          label="First Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
          ]}
        >
          <Input type="text" placeholder="enter your name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastname"
          rules={[
            {
              required: true,
              message: "Please input your Last name!",
            },
          ]}
        >
          <Input type="text" placeholder="enter your surname" />
        </Form.Item>

        <Form.Item
          label="Eamil"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Last email!",
            },
          ]}
        >
          <Input type="text" placeholder="enter your name" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          tooltip="Password must be 6-16 characters, including at least one number and one..."
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
            {
              pattern: passWalidation,
              message:
                "Password must be 6-16 characters, including at least one number and one...",
            },
          ]}
        >
          <Input.Password type="text" placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirm"
          tooltip="Password must be 6-16 characters, including at least one number and one..."
          dependencies={["password"]} // sa nayum e password i popoxutyany talis enq label i name vor nayi dran
          rules={
            [
              {
                required: true,
                message: "Please input your Password!",
              },

              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error("The Password doesn't match")
                  );
                },
              }),
            ]
            // ays funkcian ant i funkcia e vory confirm e anum pass0y getfieldvalue- confirmi miji gracn e , value dependencieic ekac value
          }
        >
          <Input.Password type="text" placeholder="Confirm Password" />
        </Form.Item>

        <Flex wrap justify="center" align="center" gap="10px">
          <Button
            style={{ width: "100%" }}
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Register
          </Button>

          <Button
            onClick={handleWithGoogle}
            style={{ width: "100%" }}
            type="default"
          >
           <FaGoogle></FaGoogle> Register with Google
          </Button>


          <Link to={ROUTE_CONSTANTS.LOGIN}>
            <Button style={{ width: "100%" }} type="Link">
              Log In
            </Button>
          </Link>

         
        </Flex>
      </Form>
    </Wraper>
  );
};

export default Register;

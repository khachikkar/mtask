import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { Form, Button, Input, notification } from "antd";
import { auth } from "../../services/firbase";

import { passWalidation } from "../../core/constants/constants";


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

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    setLoading(true);
    const { email, password } = values;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registr">
        <h2>Register</h2>
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
            message: 'Please input your Last name!',
          }
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
            message: 'Please input your Last email!',
          }
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
            message: 'Please input your Password!',
          
          }, 
          {
            pattern:passWalidation,
            message: "Password must be 6-16 characters, including at least one number and one..."
          }
         ]}
        >
          <Input.Password type="text" placeholder="enter your password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading}>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;

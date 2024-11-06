import React from 'react'
import {Avatar, Dropdown,  Typography, Flex, theme} from "antd"
import {signOut} from "firebase/auth"
import { auth } from '../../../services/firbase'

import { useNavigate } from 'react-router-dom'


import { ROUTE_CONSTANTS } from '../../../core/constants/constants'

import {useDispatch} from "react-redux";


import "./index.css"
import {setIsAuth} from "../../../state-management/slices/userProfile";


const {Text } = Typography
const {useToken} = theme



const AuthProfileDropDown = ({userProfileInfo}) => {


const navigate = useNavigate()
const dispatch = useDispatch()



  const handleSignOut = async()=>{
    // console.log("signout")
    try{
      await signOut(auth) // taking auth that function know whom to sign out
        dispatch(setIsAuth(false)) /// for sign out
    }catch(e){
      console.log(e, "sign out message")
    }
  }
  
  
const handlefirstLetters =  ({name, lastname})=>{

if(name && lastname){
  return `${name[0]} ${lastname[0]}`
}
return "..."
}

  
  const items =[
      {
          label: "Profile",
          key: "0",
          onClick: ()=> navigate(ROUTE_CONSTANTS.PROFILE)
      },
      {
          label: "Cabinet",
          key:"1",
          onClick: ()=> navigate(ROUTE_CONSTANTS.CABINET)

      },
      {
          label: "Log Out",
          key: "logout",
          onClick: handleSignOut
  
      }
  ]






const {token} = useToken() // for design


// const {userProfileInfo} = useContext(AuthContext)
const {name, lastname, email, phonenumber, position} = userProfileInfo


  return (
    <Dropdown
     menu={{items}} 
    trigger={["click"]}
    dropdownRender={(menu)=>{
        return(
            <div 
            style={{
                borderRadius: token.borderRadiusLG,
                backgroundColor: token.colorBgElevated,
                boxShadow: token.boxShadowSecondary,
              }}
            >
                <Flex 
                style={{
                    padding:token.sizeMS
                }} 
                vertical align='center' justify='center'>
                    <Avatar src="https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-man-avatar-wearing-gray-suit-png-image_6102786.png"  />
                    <Text>{name} {lastname}</Text>
                    <Text type='secondary'>{email}</Text>
                    <Text type='secondary'>{phonenumber || ""}</Text>
                    <Text type='secondary'>{position || ""}</Text>


                </Flex>
                {menu}
            </div>
        )
    }}
    >
      <Avatar   className='userProfileAvatar' size="large" >
       

{
  handlefirstLetters(userProfileInfo)
}
      </Avatar>
    </Dropdown>
  )
}

export default AuthProfileDropDown

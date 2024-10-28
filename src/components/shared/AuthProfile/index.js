import React from 'react'
import {Avatar, Dropdown,  Typography, Flex, theme} from "antd"
import {signOut} from "firebase/auth"
import { auth } from '../../../services/firbase'

import { useNavigate } from 'react-router-dom'


import { ROUTE_CONSTANTS } from '../../../core/constants/constants'




import "./index.css"
// import { AuthContext } from '../../../Context/authContext'

const {Text } = Typography
const {useToken} = theme



const AuthProfileDropDown = ({userProfileInfo}) => {


const navigate = useNavigate()




  const handleSignOut = async()=>{
    // console.log("signout")
    try{
      await signOut(auth) // poxancum enq authy vor kaskana uma sign out anum
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






const {token} = useToken() // dizayni hamar e


// const {userProfileInfo} = useContext(AuthContext)
const {name, lastname, email, phonenumber, position, image} = userProfileInfo
console.log(userProfileInfo, "LLLLLLL")

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
                    <Avatar src={image || "https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-man-avatar-wearing-gray-suit-png-image_6102786.png"}  />
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
       
       {/* changed */}
      {image ? <img src={image} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} /> : handlefirstLetters(userProfileInfo)}     

      </Avatar>
    </Dropdown>
  )
}

export default AuthProfileDropDown

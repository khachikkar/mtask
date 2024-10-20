import React from 'react'
import {Avatar, Dropdown,  Typography, Flex, theme} from "antd"
import "./index.css"

import { useContext } from 'react'
import { AuthContext } from '../../../Context/authContext'



const {Text } = Typography
const {useToken} = theme
const items =[
    {
        label: "Profile",
        key: "0"
    },
    {
        label: "Cabinet",
        key:"1"
    },
    {
        label: "Log Out",
        key: "2"
    }
]

const AuthProfileDropDown = () => {

  const {nameD, gmail} = useContext(AuthContext) // vercnum em anuny


const {token} = useToken()

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
                    <Avatar src="https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-man-avatar-wearing-gray-suit-png-image_6102786.png" />
                    <Text>{nameD}</Text>
                    <Text type='secondary'>{gmail}</Text>
                </Flex>
                {menu}
            </div>
        )
    }}
    >
      <Avatar className='userProfileAvatar' size="large" >
        {
          nameD.split(" ").map(item=> item[0]).join("")
        }
      </Avatar>
    </Dropdown>
  )
}

export default AuthProfileDropDown

import React from 'react'
import {Avatar, Dropdown,  Typography, Flex, theme} from "antd"
import "./index.css"


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
                    <Text>John Smith</Text>
                    <Text type='secondary'>JohnSmith@gmail.com</Text>
                </Flex>
                {menu}
            </div>
        )
    }}
    >
      <Avatar className='userProfileAvatar' size="large" >
        JS
      </Avatar>
    </Dropdown>
  )
}

export default AuthProfileDropDown

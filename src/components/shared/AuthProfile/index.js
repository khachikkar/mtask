import React, { useEffect, useState } from 'react'
import {Avatar, Dropdown,  Typography, Flex, theme} from "antd"
import {signOut} from "firebase/auth"
import { auth } from '../../../services/firbase'

import { useNavigate } from 'react-router-dom'

import "./index.css"
import { ROUTE_CONSTANTS } from '../../../core/constants/constants'

// import { useContext } from 'react'
// import { AuthContext } from '../../../Context/authContext'


import {doc, getDoc} from "firebase/firestore"
import { db } from '../../../services/firbase'


const {Text } = Typography
const {useToken} = theme



const AuthProfileDropDown = () => {

  // const {nameD, gmail} = useContext(AuthContext) // vercnum em anuny
  const [userData, setUserData] =useState(null)


const navigate = useNavigate()

useEffect(()=>{
  const fetchUserData = async ()=>{
    const user = auth.currentUser
    if(user){
      try{
        const docRef = doc(db, "registerUsers", user.uid)
        const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
              setUserData(docSnap.data())
            }else{
              console.log("no such doc")
            }

      }catch(e){
        console.log(e, "user Error message")
      }
    }
  }

  fetchUserData()
}, [])


  const handleSignOut = async()=>{
    // console.log("signout")
    try{
      await signOut(auth) // poxancum enq authy vor kaskana uma sign out anum
    }catch(e){
      console.log(e, "sign out message")
    }
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



console.log(userData)


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
                    <Text>{userData.name} {userData.lastname}</Text>
                    <Text type='secondary'>{userData.email}</Text>
                </Flex>
                {menu}
            </div>
        )
    }}
    >
      <Avatar className='userProfileAvatar' size="large" >
        {/* {
          nameD.split(" ").map(item=> item[0]).join("")
        } */}
        {
         userData && userData.name && userData.lastname ? 
    userData.name[0] + userData.lastname[0] : "KK"
        }
      </Avatar>
    </Dropdown>
  )
}

export default AuthProfileDropDown

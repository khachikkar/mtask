import React from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

import { ROUTE_CONSTANTS } from '../../../core/constants/constants'

import {Breadcrumb, Menu, theme, Layout} from "antd"
import "./index.css"

const {Sider, Content} = Layout

const MenuItems = [
  {
    label: "Personal Information",
    key: ROUTE_CONSTANTS.PROFILE
  },
  {
    label: "Cabinet",
    key: ROUTE_CONSTANTS.CABINET
  }
]



const CabinetLayout = () => {
const navigate = useNavigate() // navigate anelu hame
const {pathname} = useLocation() // pathname y vercnelu hamar URL ic

const {
    token: { colorBgContainer, borderRadiusLG },
} = theme.useToken();


const handleNavigate = ({key}) =>{
console.log(key)
  navigate(key)
}




  return (
    <div className='cabinet-layout'>

      
      <Sider collapsible width={200} style={{background:colorBgContainer}}>

          <Menu 
          mode='inline'
          items={MenuItems}
          onSelect ={handleNavigate} // cnavigate e anum tvyal ej
          selectedKeys={[pathname]} // vorpesi pahi refreshic heto selected y
          />


          

      </Sider>
      

    <Layout style={{padding: "0 24px 24px"}}>

    <Breadcrumb
    items={[{title:"Cabinet"}, {title:"Profile"}]}
    style={{margin: "16px 0"}}
    />

    <Content
    style={
      {
        padding: 24,
        margin: 2,
        minHeight:300,
        backgroundColor: colorBgContainer,
        borderRadius: borderRadiusLG,
      }
    }
    >

    <Outlet />

    </Content>

    </Layout>



    </div>
  )
}

export default CabinetLayout

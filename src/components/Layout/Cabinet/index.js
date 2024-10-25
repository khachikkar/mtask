import React from 'react'
import { Outlet } from 'react-router-dom'

import { ROUTE_CONSTANTS } from '../../../core/constants/constants'

import {Breadcrumb, Menu, theme, Layout} from "antd"
import "./index.css"

const {Sider, Content} = Layout

const MenuItems = [
  {
    label: "Personal Information",
    key: ROUTE_CONSTANTS.PROFILE
  }
]



const CabinetLayout = () => {


  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  return (
    <div className='cabinet-layout'>

      
      <Sider collapsible width={200} style={{background:colorBgContainer}}>

          <Menu 
          mode='inline'
          items={MenuItems}
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

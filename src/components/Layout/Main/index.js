import React from 'react'

import Header from '../../global/Header'
import { Outlet } from 'react-router-dom'
import { Flex } from 'antd'

const MainLayout = () => {
  return (
    <div className='mainlayoutcontainer'>
      <Header />
      <Flex className='main' wrap align="center" justify="center">
        <Outlet />
      </Flex>

    </div>
  )
}

export default MainLayout

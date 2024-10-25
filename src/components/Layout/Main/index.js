import React from 'react'

import Header from '../../global/Header'
import { Outlet } from 'react-router-dom'

import "./index.css"

const MainLayout = () => {
  return (
    <div className='mainLayout'>
      <Header />
      <main  >
        <Outlet />
      </main>

    </div>
  )
}

export default MainLayout

import React from 'react'
import { Spin } from 'antd'
import "./index.css"

const LoadingWraper = ({loading, children}) => {
  return (
    <>
      {
        loading ? <div className='mainLoadingContainer'><Spin size='large'/></div> : children
      }
    </>
  )
}

export default LoadingWraper

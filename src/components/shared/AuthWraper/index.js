import React from 'react'
import { Typography } from "antd"
import "./index.css"


const {Title} = Typography

const Wraper = ({title, children, banner}) => {
  return (
    <div className='authWraper'>
      <div className='bannerCont' style={{backgroundImage:`url(${banner})`}}> 
        {/* miangamic props ov childrenic ekav banner i url y */}

      </div>
      <div className='formContr'>
        <Title level={3}>
            {title}
        </Title>
{children}
      </div>
    </div>
  )
}

export default Wraper

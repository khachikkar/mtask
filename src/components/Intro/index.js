import React from 'react'
import "./index.css"
import intro from "../../core/images/intro.png"



const Intro = () => {
  return (
    <div className="ree">
        <div className="left">

            <h1>Mtask. Task Management App</h1>
            <div className="glow-on-hover"> Go to my Space</div>

        </div>


      <div className="right">
            <img src={intro} />
      </div>
    </div>
  )
}

export default Intro

import React from 'react'
import "./index.css"
import { AnimatePresence, motion, useInView } from 'framer-motion';
import {Link} from 'react-router-dom'
import {ROUTE_CONSTANTS} from "../../core/constants/constants";


function GradualSpacing({ text }) { // Destructure text from props
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });
    return (
        <div style={{display:"flex"}}>
            <AnimatePresence>
                {text.split('').map((char, i) => (
                    <motion.h1
                        ref={ref}
                        key={i}
                        initial={{ opacity: 0, x: -18 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        exit="hidden"
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="text-xl text-center sm:text-4xl font-bold tracking-tighter md:text-6xl md:leading-[4rem]"
                    >
                        {char === ' ' ? <span>&nbsp;</span> : char}
                    </motion.h1>
                ))}
            </AnimatePresence>
        </div>
    );
}


const Intro = () => {








  return (
    <div className="ree">

<div className="hero">

    <GradualSpacing  text="Manage Your Tasks" />
    <h3>Effectively</h3>
<p>mTask is a dynamic task management application designed to streamline personal and team workflows. It offers intuitive tools to organize, prioritize, and track tasks efficiently, ensuring you stay on top of your goals and deadlines.</p>

    <Link to={ROUTE_CONSTANTS.CABINET}>
        <div className="glow-on-hover"> Go to my Space</div>
    </Link>
</div>


        {/*<div className="left">*/}


        {/*    /!*<h1>Mtask. Task Management App</h1>*!/*/}
        {/*    <div className="a">*/}
        {/*        <GradualSpacing  text="Mtask. Task Mangement App" />*/}
        {/*    </div>*/}



        {/*</div>*/}
        {/*<div className="right">*/}
        {/*    <img src={intro} alt={intro}/>*/}
        {/*</div>*/}

        <div className="soon">In Building Process...</div>


    </div>
  )
}

export default Intro

import React from 'react'
import { motion } from "framer-motion"
import "./modal.scss"

type BackdropProps = {
    children: React.ReactElement,

}

function Backdrop({children}: BackdropProps) {
  return (
    <motion.div className='backdrop'>{
        children
    }</motion.div>
  )
}

export default Backdrop
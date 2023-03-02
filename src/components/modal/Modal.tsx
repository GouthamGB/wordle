import React from 'react'
import Backdrop from './Backdrop'
import { motion } from "framer-motion"
import './modal.scss'
import Congrats from './Congrats'
import Again from './Again'

type ModalProps = {
  win: boolean
  restartGame: ()=>void
  word: string
}

function Modal({win, restartGame, word}:ModalProps) {
  return (
    <Backdrop>
      <motion.div className='modal'>
        <div>{win?<Congrats/>: <Again word={word}/>}</div>
        {/* <button onClick={restartGame}>{win?"Play Again": "Try Again"}</button> */}
        
      </motion.div>
    </Backdrop>
  )
}

export default Modal
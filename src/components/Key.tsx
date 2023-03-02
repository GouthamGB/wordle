import React,{useContext} from 'react'
import "./keyboard.scss"
import { AppContext, AppContextType } from '../App'

type KeyProps = {
    item: {
      key: string,
      color: string
    }
    key: number
}





function Key({item}:KeyProps) {
  const fontColor = item.color?true:false
  
 
 
  const {board, setBoard, handleKey} = useContext(AppContext) as AppContextType
  return (
    <div className={`key ${item.color} ${fontColor&&"fontWhite"}`} onClick={()=> handleKey(item.key)}>
      {item.key}
      </div>
  )
}

export default Key
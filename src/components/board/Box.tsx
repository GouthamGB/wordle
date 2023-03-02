import React from 'react'
import './board.scss'


type BoxType ={
  item: {
    key: string;
  color: string;
  }
}




function Box({item}: BoxType) {
  const fontColor = !item.color
  
 
  return (
    <div className={`box ${item.color} ${fontColor&&"black-font"}`}>
        {item.key? item.key.toUpperCase(): ""}
    </div>
  )
}

export default Box
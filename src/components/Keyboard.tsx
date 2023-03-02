import React, {useContext, useEffect, useState} from 'react'
import Key from './Key'
import "./keyboard.scss"
import { AppContext, AppContextType } from '../App'
import {keys1, keys2, keys3} from '../data/boardState'
import {FiDelete} from 'react-icons/fi';

type KeyboardProps ={
  solution: {
    key: string;
    color: string;
    }[][]
  

}

function Keyboard({solution}: KeyboardProps) {
    const [keySet1, setKeySet1] = useState(keys1)
    const [keySet2, setKeySet2] = useState(keys2)
    const [keySet3, setKeySet3] = useState(keys3)
    const {handleKey, handleEnter, handleDelete} = useContext(AppContext) as AppContextType

    const handleKeyboard = (event: KeyboardEvent)=>{
      if(event.key === "Enter") handleEnter()
      else if(event.key === "Backspace") handleDelete()
      else{
        keySet1.forEach((item) => {if(event.key.toLowerCase() === item.key.toLowerCase()) handleKey(item.key)})
        keySet2.forEach((item) => {if(event.key.toLowerCase() === item.key.toLowerCase()) handleKey(item.key)})
        keySet3.forEach((item) => {if(event.key.toLowerCase() === item.key.toLowerCase()) handleKey(item.key)})

      }
    }

    const handleColor = ()=>{
      solution.forEach((row)=>{
        row.forEach((item)=>{
            keySet1.forEach((letter)=>{
              if(letter.key.toLowerCase()===item.key.toLowerCase()){
                const newKeySet = keySet1
                newKeySet[newKeySet.indexOf(letter)].color = item.color
                setKeySet1([...newKeySet])
              }
            })

            keySet2.forEach((letter)=>{
              if(letter.key===item.key){
                const newKeySet = keySet2
                newKeySet[newKeySet.indexOf(letter)].color = item.color
                setKeySet2([...newKeySet])
              }
            })

            keySet3.forEach((letter)=>{
              if(letter.key==item.key){
                const newKeySet = keySet3
                newKeySet[newKeySet.indexOf(letter)].color = item.color
                setKeySet3([...newKeySet])
              }
            })



        })


      })


    }

    useEffect(()=>{
      document.addEventListener("keydown", handleKeyboard)

      return ()=>{
        document.removeEventListener("keydown", handleKeyboard)
      }
    },[handleKeyboard])

    useEffect(()=>handleColor, [solution])

  return (
    <div>
        <div className="keyrow">
            {keySet1.map((item, i)=><Key item={item} key={i}/>)}
        </div>

        <div className="keyrow">
          {keySet2.map((item, i)=><Key item={item} key={i}/>)}
        </div>

        <div className="keyrow">
          <div className='bigKey' onClick={handleEnter}>Enter</div>
          {keySet3.map((item, i)=><Key item={item} key={i}/>)}
          <div className='bigKey' onClick={handleDelete}><FiDelete/></div>
        </div>
    </div>
  )
}

export default Keyboard
import React, {useState, useEffect} from 'react'
import Box from './Box'
import './board.scss'

type BoardProps = {
  board: string[][]
  setBoard:  React.Dispatch<React.SetStateAction<string[][]>>;
  solution: {
    key: string;
    color: string;
}[][]
}

type RowType = {
  key: string;
  color: string;
}[]
type ItemType = {
  key: string;
  color: string;
}




function Board({board, solution}:BoardProps) {
  
  
  
  
  

  const showBoard = (row:RowType) =>{
    return row.map((item:ItemType, index:number) =>{return <Box item={item} key={index}/>})
  }

  return (
    <>
      <div className='board'>
      {
        solution.map(showBoard)
      }
      </div>
      
    </>
  )
}

export default Board
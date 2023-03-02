import React, { useEffect, useState, createContext } from 'react';
import './App.scss';
import targetWords from './data/targetWords'
import dictionary from './data/dictionary';
import { solutionArray,boardState } from './data/boardState';
import Navbar from './components/navbar/Navbar';
import Board from './components/board/Board';
import Keyboard from './components/Keyboard';
import Modal from './components/modal/Modal';
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export type AppContextType ={
  board:  string[][],
  setBoard: React.Dispatch<React.SetStateAction<string[][]>>
  handleKey: (key: string)=>void
  handleEnter: ()=>void
  handleDelete: ()=>void
}

export const AppContext = createContext<AppContextType | null>(null)

function App() {
  const tempBoard = [...boardState]
  const [board, setBoard] = useState([...tempBoard])
  const [answer, setAnswer] = useState("")
  const tempSolution = [...solutionArray]
  const [solution, setSolution] = useState([...tempSolution])
  const [l, setL] = useState(0)
  const [turn, setTurn] = useState(0)
  const [gameOn, setGameOn] = useState(true)
  const [win, setWin] = useState(false)
  const handleKey = (value:string) =>{
    
    if(l<5 && turn<6 && gameOn){
      const newBoard = [...board]
      newBoard[turn][l] = value
      const newSolution = [...solution];
      newSolution[turn][l].key = value
      setSolution([...newSolution])
      setL(prev => prev + 1)
      setBoard([...newBoard])
      
    }
  }
  const handleToast = ()=>{
    toast("Word not in the list")
  }

  const handleEnter = () =>{
    if(gameOn){
    if(l===5){
      const currentWord = board[turn].join("").toLowerCase()
      console.log(currentWord)
      
      if(dictionary.includes(currentWord)){
        for(let i=0; i<5 ;i++){
          if(currentWord[i] === answer[i]){
            const newSolution = [...solution]
            newSolution[turn][i].key = currentWord[i]
            newSolution[turn][i].color = "green"
            setSolution([...newSolution])
          }
          else{
            if(answer.includes(currentWord[i])){
              const newSolution = [...solution]
              newSolution[turn][i].key = currentWord[i]
              newSolution[turn][i].color = "yellow"
              setSolution([...newSolution])
            }
            else{
              const newSolution = [...solution]
              newSolution[turn][i].key = currentWord[i]
              newSolution[turn][i].color = "black"
              setSolution([...newSolution])
            }
        }
      }
      console.log(solution)
      if(currentWord === answer){
        console.log("Congrats")
        setGameOn(false)
        setWin(true)
        return
      }

      if(turn===5){
        console.log("game over")
        setGameOn(false)
      }
      else{
        setTurn(prev=> prev+1)
        setL(0)
      }
      
    }
      else{
        handleToast()

      }

    }
  }

  console.log(solutionArray)
  }

  const handleDelete = ()=>{
    if(l>0 && gameOn){
    const newBoard = board;
    newBoard[turn][l-1] = ""
    const newSolution = solution
    newSolution[turn][l-1].key =""


    setL(prev=> prev-1)
    setBoard([...newBoard])
    setSolution(newSolution)
    }
  }

 
  const getAnswer = () =>{
    const rand = Math.floor(Math.random() * targetWords.length);
    setAnswer(targetWords[rand]);
  }

  const restartGame = ()=>{
    const boardTemp = [...boardState]
    setBoard([...boardTemp])
    const solutionTemp = [...solutionArray]
    setSolution([...solutionTemp])
    getAnswer()  
    setL(0)
    setTurn(0)
    setWin(false)
    setGameOn(true)
    console.log(solutionArray)
  }


  useEffect(()=>getAnswer,[])
  
  
  
  
  

  return (
    <div className="App">
      <ToastContainer
position="top-center"
autoClose={1000}
limit={1}
hideProgressBar
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss={false}
draggable={false}
pauseOnHover={false}
theme="dark"
/>
      <Navbar/>
      <AppContext.Provider value={{board,setBoard, handleKey, handleEnter, handleDelete}}>
        <div className='wordle-wrapper'>
      <div className='wordle'>         
        <Board board={board} setBoard={setBoard} solution={solution}/>
        <Keyboard solution={solution}/>
      </div>
      </div>
      </AppContext.Provider>
      {
        !gameOn? <Modal win={win} restartGame={restartGame} word={answer}/>: null
      }
      
    </div>
  );
}

export default App;

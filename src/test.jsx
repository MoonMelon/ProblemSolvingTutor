
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { useState } from 'react'
import './App.css'

function Button() {
  const [message, setMessage] = useState("")
  function prankMessage(){
    setMessage("Congrats! You win nothing but this stupid message!")
        setTimeout(() => {
      setMessage("")
    }, 2500)
  }
  return (
    <div>
      <button onClick = {prankMessage}>I'm a button!</button>
      <h3> {message} </h3>
    </div>
  )
}

function MyProblem() {
  const [answer, setAnswer] = useState("")
  return (
    <div>
      <h1>Find the answer to 2x + 3 = 11</h1>
      <input
        value = {answer}
        onChange = {(event) => setAnswer(event.target.value)}
        placeholder="enter here" 
      />
      
      {answer === "4" && <p>Correct!</p>}
      {answer !== "4" && answer !== "" && <p>Wrong!</p>}

    </div>
  )
}

function Addition(){
  const [answer, setAnswer] = useState("")
  const [num1, setNum1] = useState(Math.floor(Math.random() * 10 + 1))
  const [num2, setNum2] = useState(Math.floor(Math.random() * 10 + 1))
  const [score, setScore] = useState(0)
  const [message, setMessage] = useState("This is where your answer confirmations come up")

  function newProblem(){
    setNum1(Math.floor(Math.random() * 10 + 1))
    setNum2(Math.floor(Math.random() * 10 + 1))
    setMessage("")
    setAnswer("")
  }

  function checkAnswer(){
    if (Number(answer) === (num1 + num2)){
      setScore(score + 1)
      setMessage("Correct!")
    }else{
      setScore(score - 1)
      setMessage("Wrong.")
    }
  }

  function handleClick(){
    checkAnswer()

    setTimeout(() => {
      newProblem()
    }, 1000)
    
  }
  return(
    <div>
      <h1> Score: {score} </h1>
      <h1> What's {num1} + {num2}</h1>
      <input
        value = {answer} 
        onChange = {(event) => setAnswer(event.target.value)}
        placeholder=" "
      />

      <button onClick = {handleClick}> Check answer </button>

      <p>{message}</p>

    </div>
    )
  }

function PreAlgebra(){
  const[coeff, setCoeff] = useState(Math.floor(Math.random() * 10 + 1))
  const[cont1, setCont1] = useState(Math.floor(Math.random() * 10 + 1))
  const[solution, setSolution] = useState(Math.floor(Math.random() * 10 + 1))
  const cont2 = solution * coeff + cont1
  const[message, setMessage] = useState("Messages come up here")
  const[correct, setCorrect] = useState(0)
  const[problems, setProblems] = useState(0)
  const[answer, setAnswer] = useState("")

  function newProblem(){
    setCoeff(Math.floor(Math.random() * 10 + 1))
    setCont1(Math.floor(Math.random() * 10 + 1))
    setSolution(Math.floor(Math.random() * 10 + 1))
    setAnswer("")
    setMessage("")
  }

  function checkAnswer(){
    if (Number(answer) === (solution)){
      setMessage("Correct")
    }else{
      setMessage("Wrong.")
    }
  }

  function updateScore(){
    setProblems(problems + 1)
    if (Number(answer) === (solution)){
      setCorrect(correct + 1)
    }
  }

  function handleCheck(){
    checkAnswer()
    updateScore()
    setTimeout(() => {newProblem()}, 1000)
  }

  return(
    <div>
      <h2>Accuracy: {correct}/{problems}</h2>
      <h2>What's the solution to {coeff}x + {cont1}= {cont2}</h2>
      <input 
        value = {answer}
        onChange = {(event) => setAnswer(event.target.value)}
        placeholder = ""
      />

      <button onClick = {handleCheck}>Check answer</button>

    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <h1>My Little Quiz</h1>
      <Button />
      <MyProblem />
      <Addition />
      <PreAlgebra />
    </main>
  )
}

export default App

import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { useState } from 'react'
import './App.css'

function ChatBox() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  function chatResponse(userInput){
    const randomChars = Math.random().toString(36).substring(2, 7)
    
    return `You said: ${userInput} | random code: ${randomChars}`
  }

  function sendMessage() {
    if (input.trim() === "") {
      return
  }

    const userMessage = {
      sender: "user",
      text: input
    }

    const botMessage = {
      sender: "bot",
      text: chatResponse(input)
    }

    setMessages([...messages, userMessage, botMessage])
    setInput("")
  }

  return (
    <div>

      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.sender}: </strong>
            <span>{message.text}</span>
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Type your message..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <h1>Chatbot</h1>
      <ChatBox/>
    </main>
  )
}

export default App

 
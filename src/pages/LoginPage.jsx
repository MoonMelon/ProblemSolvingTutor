import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/firebase"

export default function LoginPage({ navigate }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  async function handleLogin(event) {
    event.preventDefault()

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      )

      console.log("Logged in:", result.user.email)

      setMessage(`Logged in as ${result.user.email}`)

      navigate("home")
    } catch (error) {
      console.log("LOGIN ERROR:", error.code, error.message)

      setMessage(`${error.code}: ${error.message}`)
    }
  }

  return (
    <div
      style={{
        background: "white",
        color: "black",
        minHeight: "100vh",
        padding: "40px"
      }}
    >
      <h1>Log In</h1>

      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <br />

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <br />

        <button type="submit">
          Log In
        </button>
      </form>

      <p>{message}</p>

      <button
        type="button"
        onClick={() => navigate("signup")}
      >
        Create a new account
      </button>
    </div>
  )
}
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function SignupPage({ navigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup(event) {
    event.preventDefault();

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setMessage(`Account created for ${result.user.email}`);

      if (navigate) {
        navigate("home");
      }
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Create Account</h1>

      <form onSubmit={handleSignup}>
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
          Create Account
        </button>

        <button onClick={() => navigate("login")}>
            Already have an account? Log in
        </button>
      </form>

      <p>{message}</p>
    </div>
  );
}
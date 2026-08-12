import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react"

import {
  onAuthStateChanged,
  getIdTokenResult
} from "firebase/auth"

import { auth } from "../firebase/firebase"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        setUser(firebaseUser)

        if (firebaseUser) {
  const tokenResult = await getIdTokenResult(
    firebaseUser,
    true
  )

  console.log(
    "FIREBASE CLAIMS:",
    tokenResult.claims
  )

  setIsAdmin(
    tokenResult.claims.admin === true
  )
} else {
  setIsAdmin(false)
}

        setLoading(false)
      }
    )

    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
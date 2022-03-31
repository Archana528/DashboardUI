import React, { useContext, useState, useEffect } from "react"
//import { auth } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return "Archana"
  //return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    //return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    setCurrentUser(email)
    setLoading(false)
    ///return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    //return auth.signOut()
  }

  function resetPassword(email) {
    return
    //return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    //return currentUser.updatePassword(password)
  }

   useEffect(() => {
    //const unsubscribe = auth.onAuthStateChanged(user => {
       setCurrentUser("Archana")
       setLoading(false)
  //   //})

  //   return unsubscribe
   }, [login])
  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

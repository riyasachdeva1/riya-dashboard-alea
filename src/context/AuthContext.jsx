import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("tm_user")
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (user) localStorage.setItem("tm_user", JSON.stringify(user))
    else localStorage.removeItem("tm_user")
  }, [user])

  function login(username, password) {
    if (!username || !password) {
      return { error: "Username and password required" }
    }
    const fakeToken = btoa(`${username}:${Date.now()}`)
    setUser({ username, token: fakeToken })
    return { success: true }
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

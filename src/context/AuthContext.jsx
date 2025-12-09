import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const authData = localStorage.getItem('aromapure_auth')
    if (authData) {
      const parsed = JSON.parse(authData)
      setIsAuthenticated(true)
      setUser(parsed.user)
    }
  }, [])

  const login = (username, userType) => {
    const authData = {
      user: { username, userType },
      timestamp: Date.now(),
    }
    localStorage.setItem('aromapure_auth', JSON.stringify(authData))
    setIsAuthenticated(true)
    setUser(authData.user)
  }

  const logout = () => {
    localStorage.removeItem('aromapure_auth')
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}


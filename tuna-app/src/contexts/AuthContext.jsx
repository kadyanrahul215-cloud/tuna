import { createContext, useContext, useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured, mockData } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for saved session
    const savedRole = localStorage.getItem('tuna_role')
    const savedUser = localStorage.getItem('tuna_user')
    if (savedRole && savedUser) {
      setRole(savedRole)
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (selectedRole) => {
    const userData = {
      ...mockData.profile,
      role: selectedRole
    }
    setUser(userData)
    setRole(selectedRole)
    localStorage.setItem('tuna_role', selectedRole)
    localStorage.setItem('tuna_user', JSON.stringify(userData))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    setRole(null)
    localStorage.removeItem('tuna_role')
    localStorage.removeItem('tuna_user')
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut()
    }
  }

  const value = {
    user,
    role,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('tuna_user')
    const savedToken = localStorage.getItem('tuna_token')
    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem('tuna_user')
        localStorage.removeItem('tuna_token')
      }
    }
    setLoading(false)
  }, [])

  const register = useCallback(async ({ fullName, email, password, role }) => {
    // Validate
    if (!fullName || fullName.trim().length < 2) {
      return { success: false, error: 'Full name must be at least 2 characters.' }
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, error: 'Please enter a valid email address.' }
    }
    if (!password || password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' }
    }

    // Check if Supabase is configured for real auth
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName, role: role || 'staff' } }
        })
        if (error) return { success: false, error: error.message }
        const userData = {
          id: data.user?.id || crypto.randomUUID(),
          email,
          full_name: fullName,
          role: role || 'staff',
          avatar_url: null,
          created_at: new Date().toISOString()
        }
        setUser(userData)
        localStorage.setItem('tuna_user', JSON.stringify(userData))
        localStorage.setItem('tuna_token', data.session?.access_token || 'session-token')
        return { success: true }
      } catch (err) {
        return { success: false, error: err.message }
      }
    }

    // Mock auth fallback
    const existingUsers = JSON.parse(localStorage.getItem('tuna_users') || '[]')
    if (existingUsers.find(u => u.email === email)) {
      return { success: false, error: 'An account with this email already exists.' }
    }

    const userData = {
      id: crypto.randomUUID(),
      email,
      full_name: fullName,
      role: role || 'staff',
      avatar_url: null,
      created_at: new Date().toISOString()
    }
    const token = btoa(JSON.stringify({ id: userData.id, email, ts: Date.now() }))

    existingUsers.push({ ...userData, password: btoa(password) })
    localStorage.setItem('tuna_users', JSON.stringify(existingUsers))
    localStorage.setItem('tuna_user', JSON.stringify(userData))
    localStorage.setItem('tuna_token', token)
    setUser(userData)
    return { success: true }
  }, [])

  const login = useCallback(async ({ email, password }) => {
    if (!email || !password) {
      return { success: false, error: 'Email and password are required.' }
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) return { success: false, error: error.message }
        const userData = {
          id: data.user.id,
          email: data.user.email,
          full_name: data.user.user_metadata?.full_name || email.split('@')[0],
          avatar_url: data.user.user_metadata?.avatar_url || null,
          created_at: data.user.created_at
        }
        setUser(userData)
        localStorage.setItem('tuna_user', JSON.stringify(userData))
        localStorage.setItem('tuna_token', data.session.access_token)
        return { success: true }
      } catch (err) {
        return { success: false, error: err.message }
      }
    }

    // Mock auth fallback
    const existingUsers = JSON.parse(localStorage.getItem('tuna_users') || '[]')
    const found = existingUsers.find(u => u.email === email && u.password === btoa(password))
    if (!found) {
      return { success: false, error: 'Invalid email or password.' }
    }

    const { password: _, ...userData } = found
    const token = btoa(JSON.stringify({ id: userData.id, email, ts: Date.now() }))
    localStorage.setItem('tuna_user', JSON.stringify(userData))
    localStorage.setItem('tuna_token', token)
    setUser(userData)
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('tuna_user')
    localStorage.removeItem('tuna_token')
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut()
    }
  }, [])

  const updateProfile = useCallback((updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates }
      localStorage.setItem('tuna_user', JSON.stringify(updated))
      // Also update in users list
      const users = JSON.parse(localStorage.getItem('tuna_users') || '[]')
      const idx = users.findIndex(u => u.id === updated.id)
      if (idx >= 0) {
        users[idx] = { ...users[idx], ...updates }
        localStorage.setItem('tuna_users', JSON.stringify(users))
      }
      return updated
    })
  }, [])

  const forgotPassword = useCallback(async (email) => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, error: 'Please enter a valid email address.' }
    }
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) return { success: false, error: error.message }
    }
    return { success: true, message: 'If an account exists with this email, a reset link has been sent.' }
  }, [])

  const resetPassword = useCallback(async (newPassword) => {
    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' }
    }
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.updateUser({ password: newPassword })
      if (error) return { success: false, error: error.message }
    }
    return { success: true, message: 'Password has been reset successfully.' }
  }, [])

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateProfile,
    forgotPassword,
    resetPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

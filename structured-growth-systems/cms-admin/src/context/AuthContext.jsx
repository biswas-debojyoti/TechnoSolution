import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authApi } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    try {
      const stored = localStorage.getItem('cms_admin')
      return stored ? JSON.parse(stored) : null
    } catch { return null }
  })
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem('cms_token')
  const isAuthenticated = !!(admin && token)

  const login = async (email, password) => {
    setLoading(true)
    try {
      const res = await authApi.login({ email, password })
      const { token, admin } = res.data
      localStorage.setItem('cms_token', token)
      localStorage.setItem('cms_admin', JSON.stringify(admin))
      setAdmin(admin)
      return { success: true }
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed'
      return { success: false, message: msg }
    } finally {
      setLoading(false)
    }
  }

  const logout = useCallback(() => {
    localStorage.removeItem('cms_token')
    localStorage.removeItem('cms_admin')
    setAdmin(null)
  }, [])

  return (
    <AuthContext.Provider value={{ admin, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

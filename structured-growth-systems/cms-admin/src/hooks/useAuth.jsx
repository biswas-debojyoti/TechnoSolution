import { createContext, useContext, useState, useCallback } from 'react'
import { api, getErrorMessage } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cms_admin')) } catch { return null }
  })
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (email, password) => {
    setLoading(true)
    try {
      const { data } = await api.post('/auth/login', { email, password })
      localStorage.setItem('cms_token', data.token)
      localStorage.setItem('cms_admin', JSON.stringify(data.admin))
      setAdmin(data.admin)
      return { ok: true }
    } catch (err) {
      return { ok: false, message: getErrorMessage(err) }
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('cms_token')
    localStorage.removeItem('cms_admin')
    setAdmin(null)
  }, [])

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, isAuth: !!admin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

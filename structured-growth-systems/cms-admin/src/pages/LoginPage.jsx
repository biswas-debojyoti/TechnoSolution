import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Eye, EyeOff, Zap, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { isAuthenticated, login, loading } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')

  if (isAuthenticated) return <Navigate to="/" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) {
      setError('Please enter your email and password.')
      return
    }
    const result = await login(form.email, form.password)
    if (!result.success) setError(result.message)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-base)] px-4">
      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-sm" style={{ animation: 'slideUp 0.4s ease' }}>
        {/* Logo mark */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-amber-500 rounded-sm flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Zap size={15} className="text-black" fill="black" />
          </div>
          <div>
            <p className="text-base font-bold text-[var(--text-primary)]" style={{ fontFamily: 'Syne, sans-serif' }}>CMS Admin</p>
            <p className="text-xs text-[var(--text-muted)]">Control Panel</p>
          </div>
        </div>

        {/* Card */}
        <div className="card p-6">
          <h1 className="text-xl font-bold text-[var(--text-primary)] mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
            Sign in
          </h1>
          <p className="text-xs text-[var(--text-muted)] mb-6">
            Enter your admin credentials to access the dashboard.
          </p>

          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-sm bg-red-500/10 border border-red-500/20 mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="section-label block mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="admin@example.com"
                className="input-field"
                autoComplete="email"
                autoFocus
              />
            </div>

            <div>
              <label className="section-label block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  className="input-field pr-10"
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)]">
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-2.5 mt-2">
              {loading ? <Loader2 size={14} className="animate-spin" /> : null}
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[var(--text-muted)] mt-5 font-mono">
          Admin access only
        </p>
      </div>
    </div>
  )
}

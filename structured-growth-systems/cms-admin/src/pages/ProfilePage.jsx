import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { authApi } from '../lib/api'
import { useToast } from '../context/ToastContext'
import { PageShell, Spinner } from '../components/ui/index'
import { Save, UserCircle, Eye, EyeOff } from 'lucide-react'

export default function ProfilePage() {
  const { admin, login } = useAuth()
  const toast = useToast()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [saving, setSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (admin) {
      setForm((p) => ({ ...p, email: admin.email || '' }))
    }
  }, [admin])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {}
      if (form.email !== admin.email) payload.email = form.email
      if (form.password) payload.password = form.password

      if (Object.keys(payload).length === 0) {
        toast.error('No changes made.')
        setSaving(false)
        return
      }

      const res = await authApi.updateProfile(payload)
      
      toast.success('Profile updated successfully! You may need to log in again.')
      
      // Clear password field
      setForm((p) => ({ ...p, password: '' }))
      
      // Update local storage if email changed
      if (payload.email) {
        const stored = localStorage.getItem('cms_admin')
        if (stored) {
          try {
            const parsed = JSON.parse(stored)
            parsed.email = res.data?.admin?.email || payload.email
            localStorage.setItem('cms_admin', JSON.stringify(parsed))
          } catch(err) {
            console.error(err)
          }
        }
      }
      
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to update profile.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <PageShell title="My Profile" subtitle="Manage your account credentials">
      <div className="card m-4 p-6 max-w-xl">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[var(--border)]">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
            <UserCircle size={32} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'Syne, sans-serif' }}>
              {admin?.name}
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-0.5">
              Role: <span className="uppercase text-[var(--text-secondary)] font-mono text-xs ml-1 bg-[var(--bg-hover)] px-1.5 py-0.5 rounded-sm border border-[var(--border)]">{admin?.role}</span>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="section-label block mb-1.5">
              {admin?.role === 'employee' ? 'User ID' : 'Email Address'}
            </label>
            <input
              type="text"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input-field"
              placeholder={admin?.role === 'employee' ? 'Enter User ID' : 'Enter Email'}
              required
            />
            <p className="text-xs text-[var(--text-muted)] mt-1.5">
              This is used for logging into the admin panel.
            </p>
          </div>

          <div>
            <label className="section-label block mb-1.5">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input-field pr-10"
                placeholder="Leave blank to keep current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                tabIndex="-1"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-1.5">
              If you change your password, you might be required to log in again.
            </p>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" disabled={saving} className="btn-primary py-2.5 px-6 font-medium">
              {saving ? <Spinner size={14} /> : <Save size={14} />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </PageShell>
  )
}

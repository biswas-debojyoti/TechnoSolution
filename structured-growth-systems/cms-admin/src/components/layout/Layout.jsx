import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, FileText, MessageSquare,
  LogOut, Menu, X, ChevronRight, User
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import toast from 'react-hot-toast'

const NAV = [
  { to: '/',           label: 'Dashboard',  icon: LayoutDashboard },
  { to: '/blogs',      label: 'Blogs',      icon: FileText },
  { to: '/inquiries',  label: 'Inquiries',  icon: MessageSquare },
]

export default function Layout({ children }) {
  const { admin, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
  }

  const Sidebar = ({ mobile = false }) => (
    <aside className={`flex flex-col h-full bg-ink-900 border-r border-ink-700 ${
      mobile ? 'w-full' : 'w-60'
    }`}>
      {/* Logo */}
      <div className="px-5 py-5 border-b border-ink-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber flex items-center justify-center flex-shrink-0">
            <span className="text-ink-950 font-display font-bold text-sm">C</span>
          </div>
          <div>
            <p className="font-display font-semibold text-cream text-sm leading-none">CMS Admin</p>
            <p className="text-ink-500 text-xs font-mono mt-0.5">Content Studio</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="text-xs font-mono text-ink-600 uppercase tracking-wider px-3 mb-3">Navigation</p>
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1">{label}</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-ink-500" />
          </NavLink>
        ))}
      </nav>

      {/* Admin footer */}
      <div className="px-3 py-4 border-t border-ink-700">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-ink-800 mb-2">
          <div className="w-7 h-7 rounded-full bg-amber/20 border border-amber/30 flex items-center justify-center flex-shrink-0">
            <User className="w-3.5 h-3.5 text-amber" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-cream truncate">{admin?.name}</p>
            <p className="text-xs text-ink-500 truncate font-mono">{admin?.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="sidebar-link w-full text-danger hover:bg-danger/10 hover:text-danger"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen overflow-hidden bg-ink-950">
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-64 animate-slide-in">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between px-4 md:px-6 py-3 bg-ink-900 border-b border-ink-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden btn-icon btn-ghost"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-sm font-medium text-cream capitalize">
                {location.pathname === '/'
                  ? 'Dashboard'
                  : location.pathname.replace('/', '').split('/')[0]}
              </h1>
              <p className="text-xs text-ink-500 font-mono hidden sm:block">
                {new Date().toLocaleDateString('en-GB')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ink-800 border border-ink-700">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse-dot" />
              <span className="text-xs text-ink-400 font-mono hidden sm:inline">Live</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

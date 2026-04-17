import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, FileText, MessageSquare,
  LogOut, ChevronRight, Zap, Users
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import clsx from 'clsx'

const navItems = [
  { to: '/',         icon: LayoutDashboard, label: 'Dashboard',  exact: true },
  { to: '/blogs',    icon: FileText,         label: 'Blogs'                   },
  { to: '/inquiries', icon: MessageSquare,    label: 'Inquiries'               },
  { to: '/employees', icon: Users,            label: 'Employees'               },
]

export default function Sidebar() {
  const { admin, logout } = useAuth()
  const location = useLocation()

  return (
    <aside className="w-56 shrink-0 flex flex-col h-full bg-[var(--bg-surface)] border-r border-[var(--border)]">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-14 border-b border-[var(--border)]">
        <div className="w-6 h-6 bg-amber-500 rounded-sm flex items-center justify-center">
          <Zap size={13} className="text-black" fill="black" />
        </div>
        <span className="font-display font-700 text-sm tracking-wide text-[var(--text-primary)]"
              style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
          CMS Admin
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5">
        <p className="section-label px-3 mb-3">Navigation</p>
        {navItems.map(({ to, icon: Icon, label, exact }) => {
          const active = exact ? location.pathname === to : location.pathname.startsWith(to)
          return (
            <NavLink
              key={to}
              to={to}
              className={clsx(
                'flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition-all duration-100 group',
                active
                  ? 'bg-amber-500/10 text-amber-400 border-l-2 border-amber-500'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] border-l-2 border-transparent'
              )}
            >
              <Icon size={15} className={clsx('shrink-0', active ? 'text-amber-400' : 'text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]')} />
              <span style={{ fontFamily: 'DM Sans, sans-serif' }}>{label}</span>
              {active && <ChevronRight size={12} className="ml-auto text-amber-500/60" />}
            </NavLink>
          )
        })}
      </nav>

      {/* Admin info + logout */}
      <div className="px-2 pb-4 pt-2 border-t border-[var(--border)]">
        <div className="px-3 py-2.5 rounded-sm bg-[var(--bg-elevated)] mb-1.5">
          <p className="text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider mb-0.5">Logged in as</p>
          <p className="text-sm text-[var(--text-primary)] truncate" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600 }}>
            {admin?.name || 'Admin'}
          </p>
          <p className="text-xs text-[var(--text-muted)] truncate">{admin?.email}</p>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-sm text-sm
            text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/5
            transition-colors duration-150"
        >
          <LogOut size={14} />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  )
}

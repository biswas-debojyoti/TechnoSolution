import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, FileText, MessageSquare,
  LogOut, ChevronRight, Zap, Users, Sun, Moon, Briefcase, Settings, DollarSign
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import clsx from 'clsx'

const navItems = [
  { to: '/',         icon: LayoutDashboard, label: 'Dashboard',  exact: true },
  { to: '/blogs',    icon: FileText,         label: 'Blogs'                   },
  { to: '/inquiries', icon: MessageSquare,    label: 'Inquiries'               },
  { to: '/leads',     icon: Users,            label: 'Leads'                   },
  { to: '/clients',   icon: Briefcase,        label: 'Clients'                 },
  { to: '/employees', icon: Users,            label: 'Employees'               },
  { to: '/expenses',  icon: DollarSign,       label: 'Expenses'                },
]

export default function Sidebar() {
  const { admin, logout } = useAuth()
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  return (
    <aside className="w-56 shrink-0 flex flex-col h-full bg-[var(--bg-surface)] border-r border-[var(--border)]">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 h-14 border-b border-[var(--border)]">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 bg-amber-500 rounded-sm flex items-center justify-center shrink-0">
            <Zap size={13} className="text-black" fill="black" />
          </div>
          <span className="font-display font-700 text-sm tracking-wide text-[var(--text-primary)] whitespace-nowrap"
                style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
            NexZen Admin
          </span>
        </div>
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon size={13} /> : <Sun size={13} />}
        </button>
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
        <div className="px-3 py-2.5 rounded-sm bg-[var(--bg-elevated)] mb-2">
          <p className="text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider mb-0.5">Logged in as</p>
          <p className="text-sm text-[var(--text-primary)] truncate" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600 }}>
            {admin?.name || 'Admin'}
          </p>
          <p className="text-xs text-[var(--text-muted)] truncate">{admin?.email}</p>
        </div>
        <NavLink
          to="/settings"
          className={clsx(
            'flex items-center gap-2.5 px-3 py-2 rounded-sm text-sm mb-1 transition-colors duration-150',
            location.pathname === '/settings'
              ? 'bg-amber-500/10 text-amber-400 border-l-2 border-amber-500'
              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] border-l-2 border-transparent'
          )}
        >
          <Settings size={14} className="shrink-0" />
          <span>Settings</span>
        </NavLink>
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

import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, FileText, MessageSquare,
  LogOut, ChevronRight, Zap, Users, Sun, Moon, Briefcase, Settings, DollarSign, User
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import clsx from 'clsx'
import { useState } from 'react'

const navItems = [
  { id: 'dashboard', to: '/',         icon: LayoutDashboard, label: 'Dashboard',  exact: true },
  { id: 'blogs',     to: '/blogs',    icon: FileText,         label: 'Blogs'                   },
  { id: 'inquiries', to: '/inquiries', icon: MessageSquare,    label: 'Inquiries'               },
  { id: 'leads',     to: '/leads',     icon: Users,            label: 'Leads'                   },
  { id: 'clients',   to: '/clients',   icon: Briefcase,        label: 'Clients'                 },
  { id: 'expenses',  to: '/expenses',  icon: DollarSign,       label: 'Expenses'                },
  { 
    id: 'employees', icon: Users, label: 'Employees',
    subItems: [
      { to: '/employees', label: 'Register New', exact: true },
      { to: '/employees/salaries', label: 'Salary' },
      { to: '/employees/attendance', label: 'Attendance' }
    ]
  },
]

export default function Sidebar() {
  const { admin, logout } = useAuth()
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [expanded, setExpanded] = useState({ Employees: location.pathname.startsWith('/employees') })

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
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto scrollbar-thin">
        <p className="section-label px-3 mb-3">Navigation</p>
        {navItems.filter(item => {
          if (item.id === 'dashboard') return true;
          if (admin?.role === 'admin' || admin?.role === 'superadmin') return true;
          if (admin?.role === 'employee' && admin.permissions) {
            return admin.permissions.includes(`${item.id}:read`) || admin.permissions.includes(`${item.id}:write`);
          }
          return false;
        }).map(({ id, to, icon: Icon, label, exact, subItems }) => {
          if (subItems) {
            const isAnyActive = location.pathname.startsWith('/employees')
            const isExpanded = expanded[label]
            
            return (
              <div key={label} className="mb-1">
                <button
                  onClick={() => setExpanded(p => ({ ...p, [label]: !p[label] }))}
                  className={clsx(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition-all duration-100 group',
                    isAnyActive ? 'text-amber-500' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
                  )}
                >
                  <Icon size={15} className={clsx('shrink-0', isAnyActive ? 'text-amber-500' : 'text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]')} />
                  <span style={{ fontFamily: 'DM Sans, sans-serif' }}>{label}</span>
                  <ChevronRight size={12} className={clsx("ml-auto transition-transform", isExpanded ? "rotate-90 text-amber-500" : "text-[var(--text-muted)]")} />
                </button>
                
                {isExpanded && (
                  <div className="mt-1 ml-4 border-l border-[var(--border)] pl-2 space-y-0.5">
                    {subItems.map((sub) => {
                      // Custom active logic for 'Register New' vs others
                      let subActive = false
                      if (sub.to === '/employees') {
                        subActive = location.pathname === '/employees' || location.pathname === '/employees/new' || (location.pathname.startsWith('/employees/') && !location.pathname.includes('salaries') && !location.pathname.includes('attendance'))
                      } else {
                        subActive = location.pathname.startsWith(sub.to)
                      }

                      return (
                        <NavLink
                          key={sub.label}
                          to={sub.to}
                          className={clsx(
                            'block px-3 py-1.5 rounded-sm text-xs transition-all duration-100',
                            subActive
                              ? 'bg-amber-500/10 text-amber-500 font-bold'
                              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
                          )}
                        >
                          {sub.label}
                        </NavLink>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          }

          const active = exact ? location.pathname === to : location.pathname.startsWith(to)
          return (
            <NavLink
              key={to}
              to={to}
              className={clsx(
                'flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition-all duration-100 group mb-0.5',
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
          to="/profile"
          className={clsx(
            'flex items-center gap-2.5 px-3 py-2 rounded-sm text-sm mb-1 transition-colors duration-150',
            location.pathname === '/profile'
              ? 'bg-amber-500/10 text-amber-400 border-l-2 border-amber-500'
              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] border-l-2 border-transparent'
          )}
        >
          <User size={14} className="shrink-0" />
          <span>My Profile</span>
        </NavLink>
        {admin?.role === 'superadmin' && (
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
        )}
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

import { X, AlertTriangle, Loader2 } from 'lucide-react'

export function Spinner({ size = 16, className = '' }) {
  return <Loader2 size={size} className={'animate-spin text-amber-500 ' + className} />
}

export function Skeleton({ className = '' }) {
  return <div className={'skeleton rounded-sm ' + className} />
}

export function TableSkeleton({ rows = 6, cols = 5 }) {
  return Array.from({ length: rows }).map((_, r) => (
    <tr key={r} className="border-b border-[var(--border)]">
      {Array.from({ length: cols }).map((_, c) => (
        <td key={c} className="px-4 py-3">
          <Skeleton className={'h-4 ' + (c === 0 ? 'w-32' : c === cols - 1 ? 'w-16' : 'w-24')} />
        </td>
      ))}
    </tr>
  ))
}

export function Empty({ icon: Icon, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {Icon && (
        <div className="w-12 h-12 rounded-sm bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center mb-4">
          <Icon size={20} className="text-[var(--text-muted)]" />
        </div>
      )}
      <p className="text-sm text-[var(--text-muted)] mb-4">{message}</p>
      {action}
    </div>
  )
}

export function ConfirmModal({ open, title, message, confirmLabel = 'Confirm', onConfirm, onCancel, loading }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative card w-full max-w-sm p-6" style={{ animation: 'slideUp 0.2s ease' }}>
        <div className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 rounded-sm bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
            <AlertTriangle size={15} className="text-red-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]" style={{ fontFamily: 'Syne, sans-serif' }}>{title}</h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">{message}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 justify-end">
          <button onClick={onCancel} className="btn-ghost text-xs py-1.5 px-3" disabled={loading}>Cancel</button>
          <button onClick={onConfirm} disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors disabled:opacity-50">
            {loading && <Spinner size={12} />}{confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export function SlideOver({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg flex flex-col bg-[var(--bg-surface)] border-l border-[var(--border)] h-full shadow-2xl"
           style={{ animation: 'slideIn 0.25s ease' }}>
        <style>{`@keyframes slideIn { from { transform: translateX(100%) } to { transform: translateX(0) } }`}</style>
        <div className="flex items-center justify-between px-5 h-14 border-b border-[var(--border)] shrink-0">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]" style={{ fontFamily: 'Syne, sans-serif' }}>{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]">
            <X size={15} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}

export function Pagination({ pagination, onPageChange }) {
  if (!pagination || pagination.totalPages <= 1) return null
  const { page, totalPages, total, limit } = pagination
  const from = (page - 1) * limit + 1
  const to = Math.min(page * limit, total)
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border)]">
      <span className="text-xs text-[var(--text-muted)] font-mono">{from}–{to} of {total}</span>
      <div className="flex items-center gap-1">
        <button onClick={() => onPageChange(page - 1)} disabled={!pagination.hasPrevPage}
          className="px-3 py-1.5 text-xs rounded-sm border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors">Prev</button>
        {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
          let p = totalPages <= 7 ? i + 1 : page <= 4 ? i + 1 : page >= totalPages - 3 ? totalPages - 6 + i : page - 3 + i
          return (
            <button key={p} onClick={() => onPageChange(p)}
              className={'w-7 h-7 text-xs rounded-sm border transition-colors font-mono ' + (p === page ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]')}>
              {p}
            </button>
          )
        })}
        <button onClick={() => onPageChange(page + 1)} disabled={!pagination.hasNextPage}
          className="px-3 py-1.5 text-xs rounded-sm border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors">Next</button>
      </div>
    </div>
  )
}

export function StatusBadge({ status }) {
  const map = { published: 'badge-published', draft: 'badge-draft', new: 'badge-new', contacted: 'badge-contacted', closed: 'badge-closed' }
  return <span className={map[status] || 'badge'}>{status}</span>
}

export function SearchInput({ value, onChange, placeholder = 'Search…' }) {
  return (
    <div className="relative">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="input-field pl-8 h-8 text-xs w-52" />
    </div>
  )
}

export function SelectFilter({ value, onChange, options, placeholder }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className="input-field h-8 text-xs w-36 pr-8 appearance-none"
      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235c5a56' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}

export function PageShell({ title, subtitle, actions, children }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 h-14 border-b border-[var(--border)] shrink-0 bg-[var(--bg-surface)]">
        <div>
          <h1 className="text-base font-semibold text-[var(--text-primary)]" style={{ fontFamily: 'Syne, sans-serif' }}>{title}</h1>
          {subtitle && <p className="text-xs text-[var(--text-muted)]">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  )
}

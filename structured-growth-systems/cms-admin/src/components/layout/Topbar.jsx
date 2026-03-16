import { Bell, RefreshCw } from 'lucide-react'
import { useSWRConfig } from 'swr'
import { useState } from 'react'

export default function Topbar({ title, subtitle }) {
  const { mutate } = useSWRConfig()
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    await mutate(() => true, undefined, { revalidate: true })
    setTimeout(() => setRefreshing(false), 600)
  }

  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-6
      border-b border-[var(--border)] bg-[var(--bg-surface)]">
      <div>
        <h1 className="text-base font-semibold text-[var(--text-primary)]"
            style={{ fontFamily: 'Syne, sans-serif' }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-[var(--text-muted)]">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={handleRefresh}
          className="p-2 rounded-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
          title="Refresh data"
        >
          <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
        </button>
        <div className="w-px h-5 bg-[var(--border)] mx-1" />
        <div className="w-7 h-7 rounded-sm bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <span className="text-amber-400 font-mono text-xs font-bold">A</span>
        </div>
      </div>
    </header>
  )
}

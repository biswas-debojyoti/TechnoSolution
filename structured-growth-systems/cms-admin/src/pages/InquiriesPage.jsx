import { useState } from 'react'
import { MessageSquare, Eye, Trash2, ChevronDown } from 'lucide-react'
import { useInquiries, useInquiryStats } from '../hooks/useData'
import { inquiryApi } from '../lib/api'
import { useToast } from '../context/ToastContext'
import {
  PageShell, TableSkeleton, Empty, StatusBadge,
  ConfirmModal, Pagination, SearchInput, SelectFilter, Skeleton
} from '../components/ui/index'
import InquiryDetailPanel from '../components/inquiry/InquiryDetailPanel'

const STATUS_OPTIONS = [
  { value: 'new',       label: 'New'       },
  { value: 'contacted', label: 'Contacted' },
  { value: 'closed',    label: 'Closed'    },
]

function StatusMenu({ inquiry, onUpdated }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handleChange = async (status) => {
    if (status === inquiry.status) { setOpen(false); return }
    setLoading(true)
    try {
      await inquiryApi.updateStatus(inquiry._id, status)
      toast.success('Status updated.')
      onUpdated()
    } catch {
      toast.error('Failed to update status.')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)} disabled={loading}
        className="flex items-center gap-1.5 group disabled:opacity-50">
        <StatusBadge status={inquiry.status} />
        <ChevronDown size={10} className="text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 left-0 top-full mt-1 w-32 bg-[var(--bg-elevated)] border border-[var(--border-light)] rounded-sm shadow-xl py-1">
            {STATUS_OPTIONS.map(o => (
              <button key={o.value} onClick={() => handleChange(o.value)}
                className={'flex w-full items-center gap-2 px-3 py-2 text-xs hover:bg-[var(--bg-hover)] transition-colors ' +
                  (o.value === inquiry.status ? 'text-amber-400' : 'text-[var(--text-secondary)]')}>
                <StatusBadge status={o.value} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function InquiriesPage() {
  const toast = useToast()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [selected, setSelected] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const { inquiries, pagination, isLoading, mutate } = useInquiries({
    page, limit: 15,
    ...(search && { search }),
    ...(status && { status }),
  })
  const { stats, isLoading: statsLoading } = useInquiryStats()

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await inquiryApi.delete(deleteTarget._id)
      toast.success('Inquiry deleted.')
      mutate()
      setDeleteTarget(null)
      if (selected?._id === deleteTarget._id) setSelected(null)
    } catch {
      toast.error('Failed to delete inquiry.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <PageShell
      title="Inquiries"
      subtitle={pagination ? `${pagination.total} total` : ''}
      actions={
        <>
          <SearchInput value={search} onChange={v => { setSearch(v); setPage(1) }} placeholder="Search…" />
          <SelectFilter value={status} onChange={v => { setStatus(v); setPage(1) }}
            placeholder="All status" options={STATUS_OPTIONS} />
        </>
      }
    >
      {/* Stats strip */}
      {!statsLoading && stats && (
        <div className="flex gap-4 px-4 pt-4">
          {[['new','amber'],['contacted','blue'],['closed','gray']].map(([s,c]) => (
            <button key={s} onClick={() => { setStatus(s === status ? '' : s); setPage(1) }}
              className={'card px-4 py-2.5 flex items-center gap-2 cursor-pointer hover:border-[var(--border-light)] transition-colors ' + (status === s ? 'border-amber-500/30' : '')}>
              <div className={'w-1.5 h-1.5 rounded-full ' + (c==='amber' ? 'bg-amber-400' : c==='blue' ? 'bg-blue-400' : 'bg-[var(--text-muted)]')} />
              <span className="section-label capitalize">{s}</span>
              <span className="font-mono text-sm text-[var(--text-primary)] ml-1">{stats[s]}</span>
            </button>
          ))}
        </div>
      )}

      <div className="card m-4 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--bg-elevated)]">
              {['From','Email','Message','Status','Date','Actions'].map(h => (
                <th key={h} className="text-left px-4 py-2.5 section-label font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? <TableSkeleton rows={8} cols={6} />
            : inquiries.length === 0 ? (
              <tr><td colSpan={6}>
                <Empty icon={MessageSquare} message={search || status ? 'No inquiries match your filters.' : 'No inquiries yet.'} />
              </td></tr>
            ) : inquiries.map(inq => (
              <tr key={inq._id}
                className={'border-b border-[var(--border)] hover:bg-[var(--bg-hover)] transition-colors ' + (selected?._id === inq._id ? 'bg-amber-500/5' : '')}>
                {/* Name */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center shrink-0">
                      <span className="text-xs font-mono text-[var(--text-muted)] uppercase">{inq.name[0]}</span>
                    </div>
                    <span className="font-medium text-[var(--text-primary)] truncate max-w-[120px]">{inq.name}</span>
                  </div>
                </td>
                {/* Email */}
                <td className="px-4 py-3 text-[var(--text-secondary)] text-xs font-mono truncate max-w-[160px]">{inq.email}</td>
                {/* Message preview */}
                <td className="px-4 py-3 text-[var(--text-muted)] max-w-[200px]">
                  <span className="truncate block text-xs">{inq.message}</span>
                </td>
                {/* Status */}
                <td className="px-4 py-3">
                  <StatusMenu inquiry={inq} onUpdated={mutate} />
                </td>
                {/* Date */}
                <td className="px-4 py-3 text-[var(--text-muted)] font-mono text-xs whitespace-nowrap">
                  {new Date(inq.createdAt).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'2-digit' })}
                </td>
                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => setSelected(inq)}
                      className="p-1.5 rounded-sm text-[var(--text-muted)] hover:text-amber-400 hover:bg-amber-500/10 transition-colors" title="View">
                      <Eye size={13} />
                    </button>
                    <button onClick={() => setDeleteTarget(inq)}
                      className="p-1.5 rounded-sm text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Delete">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination pagination={pagination} onPageChange={setPage} />
      </div>

      {/* Detail slide-over */}
      <InquiryDetailPanel
        inquiry={selected}
        onClose={() => setSelected(null)}
        onStatusChange={mutate}
        onDelete={(inq) => { setDeleteTarget(inq); setSelected(null) }}
      />

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete inquiry"
        message={`Delete inquiry from "${deleteTarget?.name}"? This cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </PageShell>
  )
}

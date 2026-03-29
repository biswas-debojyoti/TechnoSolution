import { useState } from 'react'
import { X, Mail, Phone, Clock, Hash, Trash2, ChevronDown } from 'lucide-react'
import { inquiryApi } from '../../lib/api'
import { useToast } from '../../context/ToastContext'
import { StatusBadge, Spinner } from '../ui/index'

const STATUS_OPTIONS = ['new', 'contacted', 'closed']

function Field({ icon: Icon, label, value }) {
  if (!value) return null
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[var(--border)]">
      <div className="w-6 h-6 rounded-sm bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={11} className="text-[var(--text-muted)]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-[var(--text-muted)] mb-0.5 uppercase tracking-wider font-mono">{label}</p>
        <p className="text-sm text-[var(--text-primary)] break-words">{value}</p>
      </div>
    </div>
  )
}

export default function InquiryDetailPanel({ inquiry, onClose, onStatusChange, onDelete }) {
  const toast = useToast()
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [statusOpen, setStatusOpen] = useState(false)

  if (!inquiry) return null

  const handleStatusChange = async (newStatus) => {
    if (newStatus === inquiry.status) { setStatusOpen(false); return }
    setUpdatingStatus(true)
    try {
      await inquiryApi.updateStatus(inquiry._id, newStatus)
      toast.success('Status updated to ' + newStatus)
      onStatusChange?.()
      // Update local copy
      inquiry.status = newStatus
    } catch {
      toast.error('Failed to update status.')
    } finally {
      setUpdatingStatus(false)
      setStatusOpen(false)
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-md flex flex-col bg-[var(--bg-surface)] border-l border-[var(--border)] h-full shadow-2xl"
        style={{ animation: 'slideIn 0.25s ease' }}
      >
        <style>{`@keyframes slideIn { from { transform: translateX(100%) } to { transform: translateX(0) } }`}</style>

        {/* Header */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-[var(--border)] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center">
              <span className="text-sm font-mono text-[var(--text-muted)] uppercase">{inquiry.name[0]}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]" style={{ fontFamily: 'Syne, sans-serif' }}>
                {inquiry.name}
              </p>
              <p className="text-xs text-[var(--text-muted)]">Inquiry detail</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]">
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {/* Status control */}
          <div className="mb-5">
            <p className="section-label mb-2">Status</p>
            <div className="relative inline-block">
              <button
                onClick={() => setStatusOpen(o => !o)}
                disabled={updatingStatus}
                className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-[var(--border)] hover:border-[var(--border-light)] bg-[var(--bg-elevated)] transition-colors disabled:opacity-50"
              >
                {updatingStatus ? <Spinner size={12} /> : <StatusBadge status={inquiry.status} />}
                <ChevronDown size={11} className="text-[var(--text-muted)]" />
              </button>
              {statusOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setStatusOpen(false)} />
                  <div className="absolute z-20 left-0 top-full mt-1 w-36 bg-[var(--bg-elevated)] border border-[var(--border-light)] rounded-sm shadow-xl py-1">
                    {STATUS_OPTIONS.map(s => (
                      <button key={s} onClick={() => handleStatusChange(s)}
                        className={'flex w-full items-center gap-2 px-3 py-2 text-xs hover:bg-[var(--bg-hover)] transition-colors ' +
                          (s === inquiry.status ? 'text-amber-400' : 'text-[var(--text-secondary)]')}>
                        <StatusBadge status={s} />
                        {s === inquiry.status && <span className="ml-auto text-amber-500/60 text-xs">✓</span>}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Fields */}
          <Field icon={Mail}  label="Email"   value={inquiry.email}   />
          <Field icon={Phone} label="Phone"   value={inquiry.phone}   />
          <Field icon={Clock} label="Received" value={new Date(inquiry.createdAt).toLocaleString()} />
          <Field icon={Hash}  label="ID"       value={inquiry._id}    />

          {/* Message */}
          <div className="mt-4">
            <p className="section-label mb-2">Message</p>
            <div className="card p-4 text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap bg-[var(--bg-elevated)]">
              {inquiry.message}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[var(--border)] shrink-0 flex items-center justify-between">
          {/* <a href={'mailto:' + inquiry.email}
            className="btn-primary text-xs py-1.5 px-3">
            <Mail size={12} /> Reply by email
          </a> */}
          
          <button onClick={() => onDelete?.(inquiry)} className="btn-danger text-xs py-1.5 px-3">
            <Trash2 size={12} /> Delete
          </button>
        </div>
      </div>
    </div>
  )
}

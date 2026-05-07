import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Plus, Search, Filter, DollarSign, Calendar, 
  Trash2, Pencil, Eye, FileText, Download, X
} from 'lucide-react'
import { useExpenses } from '../hooks/useData'
import { expenseApi } from '../lib/api'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'
import { 
  PageShell, TableSkeleton, Empty, ConfirmModal, 
  Pagination, SearchInput, SelectFilter, DateRangePicker,
  SlideOver
} from '../components/ui/index'

const CATEGORIES = ['Salary', 'Rent', 'Utilities', 'Marketing', 'Software', 'Office Supplies', 'Travel', 'Meals', 'Other']
const STATUS_OPTIONS = [
  { value: 'paid', label: 'Paid' },
  { value: 'pending', label: 'Pending' },
  { value: 'cancelled', label: 'Cancelled' }
]

export default function ExpensesPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')
  const [range, setRange] = useState(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  })
  
  const [showForm, setShowForm] = useState(false)
  const [editingExpense, setEditingExpense] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [loading, setLoading] = useState(false)

  const { expenses, pagination, isLoading, mutate } = useExpenses({
    page,
    limit: 10,
    search,
    category,
    status,
    startDate: range.start?.toISOString(),
    endDate: range.end?.toISOString()
  })

  const toast = useToast()
  const { admin } = useAuth()
  const hasWriteAccess = ["admin", "superadmin"].includes(admin?.role) || admin?.permissions?.includes("expenses:write")

  const handleDelete = async () => {
    if (!deleteTarget) return
    setLoading(true)
    try {
      await expenseApi.delete(deleteTarget._id)
      toast.success('Expense deleted successfully')
      mutate()
      setDeleteTarget(null)
    } catch (err) {
      toast.error('Failed to delete expense')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (expense) => {
    setEditingExpense(expense)
    setShowForm(true)
  }

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0)
  }

  return (
    <PageShell
      title="Expenses"
      subtitle="Track and manage business expenses and receipts"
      actions={
        <>
          <DateRangePicker value={range} onChange={setRange} />
          <SearchInput value={search} onChange={setSearch} placeholder="Search expenses..." />
          <SelectFilter 
            value={category} 
            onChange={setCategory} 
            placeholder="All Categories"
            options={CATEGORIES.map(c => ({ value: c, label: c }))}
          />
          {(search || category || status || range.start || range.end) && (
            <button 
              onClick={() => {
                setSearch('');
                setCategory('');
                setStatus('');
                setRange({ start: null, end: null });
              }}
              className="p-1.5 rounded-sm text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Clear Filters"
            >
              <X size={14} />
            </button>
          )}
          {hasWriteAccess && (
            <button onClick={() => { setEditingExpense(null); setShowForm(true); }} className="btn-primary text-xs py-1.5 px-3">
              <Plus size={14} /> Add Expense
            </button>
          )}
        </>
      }
    >
      <div className="card m-4 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border)] text-[var(--text-secondary)] uppercase text-[10px] tracking-wider font-mono">
              <tr>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Expense Details</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium text-right">Amount</th>
                <th className="px-6 py-4 font-medium text-center">Receipt</th>
                <th className="px-6 py-4 font-medium text-center">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {isLoading ? (
                <TableSkeleton rows={8} cols={7} />
              ) : expenses.length === 0 ? (
                <tr>
                  <td colSpan="7">
                    <Empty 
                      icon={DollarSign} 
                      message="No expenses found matching your criteria." 
                      action={hasWriteAccess && <button onClick={() => setShowForm(true)} className="btn-primary text-xs">Add first expense</button>}
                    />
                  </td>
                </tr>
              ) : (
                expenses.map((exp) => (
                  <tr key={exp._id} className="hover:bg-[var(--bg-hover)] transition-colors group">
                    <td className="px-6 py-4 font-mono text-xs">
                      {new Date(exp.date).toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-[var(--text-primary)]">{exp.title}</p>
                      <p className="text-[10px] text-[var(--text-muted)] truncate max-w-[200px]">{exp.description || 'No description'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded-sm bg-[var(--bg-elevated)] border border-[var(--border)] text-[10px] text-[var(--text-secondary)]">
                        {exp.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold text-red-500 font-mono">{formatCurrency(exp.amount)}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {exp.receipt ? (
                        <a 
                          href={expenseApi.receiptUrl(exp._id)} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-amber-500 hover:underline text-xs"
                        >
                          <FileText size={14} /> View
                        </a>
                      ) : (
                        <span className="text-[var(--text-muted)] text-xs">No file</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={
                        exp.status === 'paid' ? 'badge-published' : 
                        exp.status === 'pending' ? 'badge-new' : 'badge-draft'
                      }>
                        {exp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {hasWriteAccess && (
                          <>
                            <button 
                              onClick={() => handleEdit(exp)} 
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500/20 transition-all"
                            >
                              <Pencil size={11} /> Edit
                            </button>
                            <button 
                              onClick={() => setDeleteTarget(exp)} 
                              className="p-1.5 rounded-sm text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            >
                              <Trash2 size={13} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination pagination={pagination} onPageChange={setPage} />
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Expense"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={loading}
      />

      <SlideOver
        open={showForm}
        onClose={() => setShowForm(false)}
        title={editingExpense ? 'Edit Expense' : 'Add New Expense'}
      >
        <ExpenseForm 
          expense={editingExpense} 
          onSuccess={() => { setShowForm(false); mutate(); }}
          onCancel={() => setShowForm(false)}
        />
      </SlideOver>
    </PageShell>
  )
}

function ExpenseForm({ expense, onSuccess, onCancel }) {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: expense?.title || '',
    category: expense?.category || 'Office Supplies',
    amount: expense?.amount || '',
    date: expense?.date ? new Date(expense.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    description: expense?.description || '',
    status: expense?.status || 'paid',
    paymentMethod: expense?.paymentMethod || 'UPI'
  })
  const [receipt, setReceipt] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const data = new FormData()
    Object.keys(formData).forEach(key => data.append(key, formData[key]))
    if (receipt) data.append('receipt', receipt)

    try {
      if (expense) {
        await expenseApi.update(expense._id, data)
        toast.success('Expense updated')
      } else {
        await expenseApi.create(data)
        toast.success('Expense added')
      }
      onSuccess()
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to save expense')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1.5 block">Title</label>
          <input 
            type="text" required value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value})}
            className="input-field" placeholder="e.g., Monthly Office Rent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1.5 block">Category</label>
            <select 
              value={formData.category} 
              onChange={e => setFormData({...formData, category: e.target.value})}
              className="input-field h-9"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1.5 block">Status</label>
            <select 
              value={formData.status} 
              onChange={e => setFormData({...formData, status: e.target.value})}
              className="input-field h-9"
            >
              {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1.5 block">Amount (INR)</label>
            <input 
              type="number" required value={formData.amount} 
              onChange={e => setFormData({...formData, amount: e.target.value})}
              className="input-field font-mono" placeholder="0.00"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1.5 block">Date</label>
            <input 
              type="date" required value={formData.date} 
              onChange={e => setFormData({...formData, date: e.target.value})}
              className="input-field h-9"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1.5 block">Payment Method</label>
          <div className="flex flex-wrap gap-2">
            {['UPI', 'Bank Transfer', 'Cash', 'Credit Card', 'Check'].map(m => (
              <button
                key={m} type="button"
                onClick={() => setFormData({...formData, paymentMethod: m})}
                className={`px-3 py-1.5 text-[10px] font-bold rounded border transition-all ${
                  formData.paymentMethod === m 
                    ? 'bg-amber-500/10 border-amber-500 text-amber-500' 
                    : 'bg-[var(--bg-elevated)] border-[var(--border)] text-[var(--text-muted)]'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1.5 block">Receipt / File</label>
          <div className="relative group cursor-pointer">
            <input 
              type="file" 
              onChange={e => setReceipt(e.target.files[0])}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            <div className="border-2 border-dashed border-[var(--border)] group-hover:border-amber-500/50 rounded-lg p-6 text-center transition-colors">
              <Download size={20} className="mx-auto mb-2 text-[var(--text-muted)] group-hover:text-amber-500" />
              <p className="text-xs text-[var(--text-secondary)]">
                {receipt ? receipt.name : 'Click to upload receipt (Max 1MB)'}
              </p>
              <p className="text-[10px] text-[var(--text-muted)] mt-1 uppercase tracking-tight">Images, PDF or DOCX</p>
            </div>
          </div>
          {expense?.receipt && !receipt && (
            <div className="mt-4 p-4 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)]">
              <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] mb-2">Current Attachment</p>
              <div className="flex items-center gap-3">
                {expense.receipt.contentType?.startsWith('image/') ? (
                  <img 
                    src={expenseApi.receiptUrl(expense._id)} 
                    alt="Receipt" 
                    className="w-16 h-16 object-cover rounded border border-[var(--border)]"
                  />
                ) : (
                  <div className="w-16 h-16 bg-[var(--bg-hover)] rounded border border-[var(--border)] flex items-center justify-center">
                    <FileText size={24} className="text-[var(--text-muted)]" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[var(--text-primary)] truncate font-medium">{expense.receipt.filename}</p>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-tight">{expense.receipt.contentType}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1.5 block">Description</label>
          <textarea 
            value={formData.description} 
            onChange={e => setFormData({...formData, description: e.target.value})}
            className="input-field min-h-[80px] resize-none"
            placeholder="Additional details..."
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button type="button" onClick={onCancel} className="flex-1 btn-ghost py-2.5">Cancel</button>
        <button type="submit" disabled={loading} className="flex-1 btn-primary py-2.5">
          {loading ? 'Saving...' : expense ? 'Update Expense' : 'Add Expense'}
        </button>
      </div>
    </form>
  )
}

function Check({ size, className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" width={size} height={size} 
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" 
      strokeLinecap="round" strokeLinejoin="round" className={className}
    >
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  )
}

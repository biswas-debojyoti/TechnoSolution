import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { 
  ArrowLeft, Save, Info, Check, User, Globe, Mail, Phone, 
  DollarSign, Briefcase, Plus, Trash2, Calendar, CreditCard, 
  Layers, Receipt, TrendingUp, FileText
} from 'lucide-react'
import { clientApi, settingsApi } from '../lib/api'
import { useClient } from '../hooks/useData'
import { useToast } from '../context/ToastContext'
import { generateInvoicePDF } from '../lib/invoiceGenerator'

const DetailItem = ({ label, value, icon: Icon }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] flex items-center gap-1">
      {Icon && <Icon size={10} />} {label}
    </span>
    <span className="text-sm font-medium text-[var(--text-primary)] leading-tight">
      {value || '---'}
    </span>
  </div>
)

const SOURCE_OPTIONS = [
  { value: "Website", label: "Website" },
  { value: "Referral", label: "Referral" },
  { value: "Social Media", label: "Social Media" },
  { value: "Cold Call", label: "Cold Call" },
  { value: "Other", label: "Other" },
];

const CLIENT_STATUS_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "Completed", label: "Completed" },
  { value: "On Hold", label: "On Hold" },
];

const SERVICE_OPTIONS = [
  "website development",
  "social media",
  "GMB",
  "SEO",
  "others"
];

const PAYMENT_METHODS = ["UPI", "Bank Transfer", "Cash", "Cheque", "Other"];

export default function ClientDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()
  
  const { client, isLoading, mutate } = useClient(id)
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'overview') // 'overview' or 'payments'
  const [loading, setLoading] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab)
    }
  }, [location.state])
  
  // Removed edit-related state and handlers as per request for compact read-only view
  const [paymentData, setPaymentData] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    method: 'UPI',
    reference: '',
    notes: ''
  })
  
  const handleAddPayment = async (e) => {
    if (e) e.preventDefault()
    setLoading(true)
    try {
      await clientApi.addPayment(id, paymentData)
      toast.success('Payment recorded successfully')
      mutate()
      setShowPaymentModal(false)
      setPaymentData({
        amount: '',
        date: new Date().toISOString().split('T')[0],
        method: 'UPI',
        reference: '',
        notes: ''
      })
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Error recording payment')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadInvoice = async (payment) => {
    try {
      const res = await settingsApi.get()
      const settings = res.data.success ? res.data.data : null
      console.log('Generating invoice with:', { client, payment, settings });
      generateInvoicePDF(client, payment, settings)
      toast.success('Invoice generated')
    } catch (err) {
      console.error('Invoice Generation Error:', err);
      toast.error('Failed to generate invoice')
    }
  }

  const handleDeletePayment = async (paymentId) => {
    if (!window.confirm('Are you sure you want to delete this payment record?')) return
    try {
      await clientApi.deletePayment(id, paymentId)
      toast.success('Payment removed')
      mutate()
    } catch (err) {
      toast.error('Failed to remove payment')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
      </div>
    )
  }

  const totalPaid = client?.payments?.reduce((acc, p) => acc + (p.amount || 0), 0) || 0
  const balance = (client?.totalValue || 0) - totalPaid
  const paidPercentage = client?.totalValue > 0 ? Math.min(Math.round((totalPaid / client.totalValue) * 100), 100) : 0

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0)
  }

  return (
    <div className="w-full h-full flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/clients')}
            className="p-2 rounded-full hover:bg-[var(--bg-hover)] transition-colors text-[var(--text-secondary)] border border-[var(--border)]"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-black font-bold text-xl shadow-lg shadow-amber-500/20">
                {client?.name?.charAt(0).toUpperCase()}
             </div>
             <div>
               <h1 className="text-2xl font-bold font-display text-[var(--text-primary)] leading-none">
                 {client?.name}
               </h1>
               <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    client?.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                  }`}>
                    {client?.status}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-widest bg-[var(--bg-elevated)] px-2 py-0.5 rounded-full border border-[var(--border)]">
                    ID: {id?.slice(-6).toUpperCase()}
                  </span>
               </div>
             </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
           {activeTab === 'payments' && (
              <button 
                onClick={() => setShowPaymentModal(true)}
                className="btn-primary text-sm px-5 py-2 h-10 shadow-lg shadow-amber-500/20 bg-emerald-600 hover:bg-emerald-500 border-emerald-600"
              >
                <Plus size={16} />
                <span>Add Payment</span>
              </button>
           )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-[var(--border)] gap-8 px-2 shrink-0">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'overview' ? 'text-amber-500' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}
        >
          <div className="flex items-center gap-2 uppercase tracking-wider">
             <Layers size={14} /> Overview & Details
          </div>
          {activeTab === 'overview' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />}
        </button>
        <button 
          onClick={() => setActiveTab('payments')}
          className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'payments' ? 'text-amber-500' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}
        >
          <div className="flex items-center gap-2 uppercase tracking-wider">
             <CreditCard size={14} /> Payment History
          </div>
          {activeTab === 'payments' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        {activeTab === 'overview' ? (
          <div className="flex-1 overflow-y-auto pr-2 pb-10 pt-4">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                   <div className="card p-6 space-y-8">
                      {/* Compact Identity Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-6">
                            <div className="flex items-center gap-2 border-b border-[var(--border)] pb-2">
                               <User size={14} className="text-amber-500" />
                               <h3 className="text-xs uppercase font-bold tracking-wider">Client Identity</h3>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                               <DetailItem label="Full Name" value={client?.name} />
                               <DetailItem label="Email Address" value={client?.email} icon={Mail} />
                               <DetailItem label="Phone Number" value={client?.phone} icon={Phone} />
                            </div>
                         </div>

                         <div className="space-y-6">
                            <div className="flex items-center gap-2 border-b border-[var(--border)] pb-2">
                               <Globe size={14} className="text-amber-500" />
                               <h3 className="text-xs uppercase font-bold tracking-wider">Project Logistics</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                               <div className="col-span-2">
                                 <DetailItem label="Current Status" value={client?.status} />
                               </div>
                               <DetailItem label="Budget Range" value={client?.budget} />
                               <DetailItem label="Contract Value" value={formatCurrency(client?.totalValue)} icon={DollarSign} />
                               <div className="col-span-2">
                                 <DetailItem label="Discovery Source" value={client?.source} />
                               </div>
                            </div>
                         </div>
                      </div>

                      {/* Services */}
                      <div className="space-y-4">
                         <div className="flex items-center gap-2 border-b border-[var(--border)] pb-2">
                            <Layers size={14} className="text-amber-500" />
                            <h3 className="text-xs uppercase font-bold tracking-wider">Project Services</h3>
                         </div>
                         <div className="flex flex-wrap gap-2">
                            {client?.services && client.services.length > 0 ? (
                               client.services.map(service => (
                                 <span key={service} className="px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-sm text-[10px] font-bold uppercase tracking-wider">
                                   {service}
                                 </span>
                               ))
                            ) : (
                               <span className="text-xs text-[var(--text-muted)] italic">No services listed</span>
                            )}
                         </div>
                      </div>

                      {/* Notes */}
                      <div className="space-y-2">
                         <label className="text-[10px] uppercase font-bold text-[var(--text-muted)] border-b border-[var(--border)] block pb-2 mb-2 w-full">Strategic Project Notes</label>
                         <div className="p-4 bg-[var(--bg-elevated)]/50 border border-[var(--border)] rounded font-mono text-xs text-[var(--text-secondary)] whitespace-pre-wrap min-h-[100px]">
                            {client?.notes || 'No project notes available.'}
                         </div>
                      </div>
                   </div>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-6">
                   <div className="card p-6 border-l-4 border-amber-500">
                      <h4 className="text-xs uppercase tracking-widest font-bold text-amber-500 mb-6">Financial Snapshot</h4>
                      <div className="space-y-5">
                         <div className="flex items-end justify-between">
                            <span className="text-xs text-[var(--text-muted)] font-bold uppercase">Contract Value</span>
                            <span className="text-xl font-bold font-mono text-[var(--text-primary)]">{formatCurrency(client?.totalValue)}</span>
                         </div>
                         <div className="flex items-end justify-between">
                            <span className="text-xs text-[var(--text-muted)] font-bold uppercase">Paid to Date</span>
                            <span className="text-xl font-bold font-mono text-emerald-500">{formatCurrency(totalPaid)}</span>
                         </div>
                         <div className="h-2 w-full bg-[var(--border)] rounded-full overflow-hidden mt-1">
                            <div 
                              className="h-full bg-emerald-500 transition-all duration-500" 
                              style={{ width: `${paidPercentage}%` }} 
                            />
                         </div>
                         <div className="p-4 rounded bg-red-500/5 border border-red-500/10">
                             <span className="text-[10px] text-red-400 font-bold uppercase block mb-1">Unpaid Balance</span>
                             <span className="text-2xl font-bold font-mono text-red-500">{formatCurrency(balance)}</span>
                         </div>
                      </div>
                   </div>

                   <div className="card p-6 bg-[var(--bg-elevated)]/50">
                      <div className="flex items-center gap-2 mb-4">
                         <TrendingUp size={16} className="text-amber-500" />
                         <span className="text-xs uppercase font-bold">Activity Pulse</span>
                      </div>
                      <div className="space-y-4">
                         <DetailItem label="Customer Since" value={new Date(client?.createdAt).toLocaleDateString('en-GB')} />
                         <div className="border-t border-[var(--border)] pt-4">
                            <DetailItem label="Source Origin" value={client?.source} />
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        ) : (
          /* Payments History List */
          <div className="flex-1 overflow-y-auto pr-2 pb-10 pt-6">
             <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                
                {/* Stats Panel */}
                <div className="lg:col-span-1 space-y-4 sticky top-0">
                   <div className="card p-5 bg-black/5 border-l-4 border-amber-500 overflow-hidden relative">
                      <TrendingUp size={80} className="absolute -bottom-4 -right-4 text-white/5" />
                      <p className="text-[10px] uppercase font-bold text-amber-800 mb-1">Recovery Ratio</p>
                      <h4 className="text-4xl font-bold font-mono text-[var(--text-primary)] mb-2">{paidPercentage}%</h4>
                      <div className="h-1.5 shadow-lg w-full bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full  bg-amber-800" style={{ width: `${paidPercentage}%` }} />
                      </div>
                   </div>
                   <div className="card p-5">
                      <div className="flex items-center gap-3 mb-4">
                         <div className="p-2 rounded bg-emerald-500/10 text-emerald-500">
                            <Receipt size={16} />
                         </div>
                         <div>
                            <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold">Total Received</p>
                            <p className="text-lg font-bold font-mono text-emerald-500">{formatCurrency(totalPaid)}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="p-2 rounded bg-red-500/10 text-red-500">
                            <DollarSign size={16} />
                         </div>
                         <div>
                            <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold">Total Remaining</p>
                            <p className="text-lg font-bold font-mono text-red-500">{formatCurrency(balance)}</p>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Payments Table */}
                <div className="lg:col-span-3 card overflow-hidden">
                   <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border)] text-[var(--text-secondary)] uppercase text-[10px] tracking-wider font-mono">
                         <tr>
                            <th className="px-6 py-4 font-bold">Date</th>
                            <th className="px-6 py-4 font-bold text-right">Amount</th>
                            <th className="px-6 py-4 font-bold">Method</th>
                            <th className="px-6 py-4 font-bold">Reference / ID</th>
                            <th className="px-6 py-4 font-bold">Status</th>
                            <th className="px-6 py-4 font-bold text-right">Action</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--border)]">
                         {client?.payments?.length === 0 ? (
                           <tr>
                             <td colSpan="6" className="px-6 py-20 text-center text-[var(--text-muted)] italic bg-[var(--bg-hover)]/30">
                               <Receipt size={32} className="mx-auto mb-3 opacity-20" />
                               No payments recorded yet.
                             </td>
                           </tr>
                         ) : (
                           client?.payments?.sort((a,b) => new Date(b.date) - new Date(a.date)).map(payment => (
                             <tr key={payment._id} className="hover:bg-[var(--bg-hover)] transition-colors group">
                                <td className="px-6 py-4 font-mono text-xs">{new Date(payment.date).toLocaleDateString('en-GB')}</td>
                                <td className="px-6 py-4 text-right">
                                   <span className="font-bold text-emerald-500 font-mono text-base">{formatCurrency(payment.amount)}</span>
                                </td>
                                <td className="px-6 py-4">
                                   <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border)]">{payment.method}</span>
                                </td>
                                <td className="px-6 py-4 text-xs font-mono text-[var(--text-muted)]">{payment.reference || '---'}</td>
                                <td className="px-6 py-4">
                                   <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                      payment.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                                   }`}>
                                      {payment.status}
                                   </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                   <div className="flex items-center justify-end gap-2 text-right">
                                      <button 
                                         onClick={() => handleDownloadInvoice(payment)}
                                         className="p-1.5 rounded-sm text-amber-500 hover:bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-all"
                                         title="Download Invoice"
                                      >
                                         <FileText size={14} />
                                      </button>
                                      <button 
                                         onClick={() => handleDeletePayment(payment._id)}
                                         className="p-1.5 rounded-sm text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all font-bold"
                                         title="Delete"
                                      >
                                         <Trash2 size={13} />
                                      </button>
                                   </div>
                                </td>
                             </tr>
                           ))
                         )}
                      </tbody>
                   </table>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* Add Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
           <div className="card w-full max-w-md p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3 text-emerald-500 font-display">
                    <CreditCard size={20} />
                    <h3 className="text-lg font-bold uppercase tracking-wider">Record Payment</h3>
                 </div>
                 <button onClick={() => setShowPaymentModal(false)} className="text-[var(--text-muted)] hover:text-white transition-colors">
                    <Plus size={20} className="rotate-45" />
                 </button>
              </div>

              <div className="space-y-4">
                 <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Payment Amount</label>
                    <div className="relative">
                       <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                       <input 
                         type="number" 
                         value={paymentData.amount} 
                         onChange={(e) => setPaymentData({...paymentData, amount: e.target.value})}
                         className="input-field text-lg font-mono py-2 pl-9 border-emerald-500/30 focus:border-emerald-500 text-emerald-500 bg-emerald-500/5 h-12" 
                         placeholder="0.00"
                        />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                       <label className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Date</label>
                       <input 
                         type="date" 
                         value={paymentData.date}
                         onChange={(e) => setPaymentData({...paymentData, date: e.target.value})}
                         className="input-field text-sm py-2" 
                        />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Method</label>
                       <select 
                         value={paymentData.method}
                         onChange={(e) => setPaymentData({...paymentData, method: e.target.value})}
                         className="input-field text-sm py-2 h-[41px]"
                        >
                          {PAYMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                       </select>
                    </div>
                 </div>

                 <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Reference / Transaction ID</label>
                    <input 
                      type="text" 
                      value={paymentData.reference}
                      onChange={(e) => setPaymentData({...paymentData, reference: e.target.value})}
                      className="input-field text-sm py-2 font-mono" 
                      placeholder="TXN123..."
                     />
                 </div>

                 <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Internal Description</label>
                    <textarea 
                      value={paymentData.notes}
                      onChange={(e) => setPaymentData({...paymentData, notes: e.target.value})}
                      className="input-field text-sm py-2 resize-none h-20" 
                      placeholder="Milestone 1, advance deposit..."
                     />
                 </div>
              </div>

              <div className="flex gap-3 pt-2">
                 <button onClick={() => setShowPaymentModal(false)} className="flex-1 py-2 text-sm font-bold text-[var(--text-muted)] hover:text-white transition-colors">
                    Cancel
                 </button>
                 <button 
                   onClick={handleAddPayment} 
                   disabled={loading || !paymentData.amount} 
                   className="flex-1 btn-primary py-2 bg-emerald-600 hover:bg-emerald-500 border-emerald-600 text-sm font-bold shadow-lg shadow-emerald-500/20"
                 >
                    Record Payment
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  )
}

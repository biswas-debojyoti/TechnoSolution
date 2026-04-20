import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { 
  ArrowLeft, Save, Info, Check, User, Globe, Mail, Phone, 
  DollarSign, Briefcase, Plus, Trash2, Calendar, CreditCard, 
  Layers, Receipt, TrendingUp 
} from 'lucide-react'
import { clientApi } from '../lib/api'
import { useClient } from '../hooks/useData'
import { useToast } from '../context/ToastContext'

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
  const toast = useToast()
  
  const { client, isLoading, mutate } = useClient(id)
  const [activeTab, setActiveTab] = useState('overview') // 'overview' or 'payments'
  const [loading, setLoading] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    source: 'Website',
    status: 'Active',
    budget: '',
    notes: '',
    services: [],
    totalValue: 0
  })

  const [paymentData, setPaymentData] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    method: 'UPI',
    reference: '',
    notes: ''
  })

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name || '',
        email: client.email || '',
        phone: client.phone || '',
        source: client.source || 'Website',
        status: client.status || 'Active',
        budget: client.budget || '',
        notes: client.notes || '',
        services: client.services || [],
        totalValue: client.totalValue || 0
      })
    }
  }, [client])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const toggleService = (service) => {
    setFormData(prev => {
      const services = prev.services || []
      if (services.includes(service)) {
        return { ...prev, services: services.filter(s => s !== service) }
      } else {
        return { ...prev, services: [...services, service] }
      }
    })
  }

  const handleUpdateClient = async (e) => {
    if (e) e.preventDefault()
    setLoading(true)
    try {
      await clientApi.update(id, formData)
      toast.success('Client updated successfully')
      mutate()
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Error updating client')
    } finally {
      setLoading(false)
    }
  }

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
           {activeTab === 'overview' && (
              <button 
                onClick={handleUpdateClient} 
                disabled={loading} 
                className="btn-primary text-sm px-5 py-2 h-10 shadow-lg shadow-amber-500/20"
              >
                {loading ? <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" /> : <Save size={16} />}
                <span>Save Changes</span>
              </button>
           )}
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
             <form onSubmit={handleUpdateClient} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                   <div className="card p-8 space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         {/* Personal Section */}
                         <div className="space-y-6">
                            <div className="flex items-center gap-2 border-b border-[var(--border)] pb-2">
                               <User size={14} className="text-amber-500" />
                               <h3 className="text-xs uppercase font-bold tracking-wider">Client Identity</h3>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Full Name</label>
                              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="input-field text-sm py-2" />
                            </div>
                            <div className="space-y-1.5">
                               <label className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Email Address</label>
                               <div className="relative">
                                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field text-sm py-2 pl-9" />
                               </div>
                            </div>
                            <div className="space-y-1.5">
                               <label className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Phone Number</label>
                               <div className="relative">
                                  <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                                  <input type="text" name="phone" required value={formData.phone} onChange={handleChange} className="input-field text-sm py-2 pl-9" />
                               </div>
                            </div>
                         </div>

                         {/* Project Section */}
                         <div className="space-y-6">
                            <div className="flex items-center gap-2 border-b border-[var(--border)] pb-2">
                               <Globe size={14} className="text-amber-500" />
                               <h3 className="text-xs uppercase font-bold tracking-wider">Project Logistics</h3>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Current Status</label>
                              <select name="status" value={formData.status} onChange={handleChange} className="input-field text-sm py-2 h-9 cursor-pointer">
                                 {CLIENT_STATUS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                              </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                               <div className="space-y-1.5">
                                 <label className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Budget Range</label>
                                 <input type="text" name="budget" value={formData.budget} onChange={handleChange} className="input-field text-sm py-2" readOnly />
                               </div>
                               <div className="space-y-1.5">
                                 <label className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Final Contract</label>
                                 <div className="relative">
                                    <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                                    <input type="number" name="totalValue" value={formData.totalValue} onChange={handleChange} className="input-field text-sm py-2 pl-9" />
                                 </div>
                               </div>
                            </div>
                            <div className="space-y-1.5">
                               <label className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Discovery Source</label>
                               <input type="text" value={formData.source} className="input-field text-sm py-2 bg-[var(--bg-elevated)]" readOnly />
                            </div>
                         </div>
                      </div>

                      {/* Services */}
                      <div className="space-y-4">
                         <div className="flex items-center gap-2 border-b border-[var(--border)] pb-2">
                            <Layers size={14} className="text-amber-500" />
                            <h3 className="text-xs uppercase font-bold tracking-wider">Active Services</h3>
                         </div>
                         <div className="flex flex-wrap gap-2">
                            {SERVICE_OPTIONS.map(service => {
                               const isSelected = formData.services?.includes(service)
                               return (
                                 <button
                                   key={service}
                                   type="button"
                                   onClick={() => toggleService(service)}
                                   className={`flex items-center gap-2 px-3 py-1.5 rounded-sm border text-[10px] font-bold uppercase transition-all tracking-wider ${
                                     isSelected ? 'bg-amber-500 text-black border-amber-500' : 'bg-[var(--bg-elevated)] border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--text-secondary)]'
                                   }`}
                                 >
                                   {isSelected && <Check size={12} />}
                                   <span>{service}</span>
                                 </button>
                               )
                            })}
                         </div>
                      </div>

                      {/* Notes */}
                      <div className="space-y-2">
                         <label className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Strategic Project Notes</label>
                         <textarea 
                           name="notes" value={formData.notes} onChange={handleChange}
                           rows="5" className="input-field text-sm py-3 w-full resize-none font-mono text-[var(--text-secondary)]" 
                           placeholder="Enter meeting notes, requirements..."
                         />
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
                      <div className="space-y-3">
                         <div className="flex justify-between text-xs">
                            <span className="text-[var(--text-muted)]">Customer Since</span>
                            <span className="text-[var(--text-primary)] font-medium font-mono">{new Date(client?.createdAt).toLocaleDateString()}</span>
                         </div>
                         <div className="flex justify-between text-xs">
                            <span className="text-[var(--text-muted)]">Source Origin</span>
                            <span className="text-[var(--text-primary)] font-medium">{client?.source}</span>
                         </div>
                      </div>
                   </div>
                </div>
             </form>
          </div>
        ) : (
          /* Payments History List */
          <div className="flex-1 overflow-y-auto pr-2 pb-10 pt-6">
             <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                
                {/* Stats Panel */}
                <div className="lg:col-span-1 space-y-4 sticky top-0">
                   <div className="card p-5 bg-black/20 border-l-4 border-amber-500 overflow-hidden relative">
                      <TrendingUp size={80} className="absolute -bottom-4 -right-4 text-white/5" />
                      <p className="text-[10px] uppercase font-bold text-amber-500 mb-1">Recovery Ratio</p>
                      <h4 className="text-4xl font-bold font-mono text-[var(--text-primary)] mb-2">{paidPercentage}%</h4>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-amber-500" style={{ width: `${paidPercentage}%` }} />
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
                                <td className="px-6 py-4 font-mono text-xs">{new Date(payment.date).toLocaleDateString()}</td>
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
                                   <button 
                                      onClick={() => handleDeletePayment(payment._id)}
                                      className="p-1.5 rounded-sm text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                                   >
                                      <Trash2 size={13} />
                                   </button>
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

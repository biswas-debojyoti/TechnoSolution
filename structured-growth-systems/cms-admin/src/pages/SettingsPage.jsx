import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Save, Building2, Phone, Mail, Globe, Landmark, ShieldCheck, PenTool } from 'lucide-react'
import { settingsApi } from '../lib/api'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'

export default function SettingsPage() {
  const { admin } = useAuth()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  if (admin?.role !== 'superadmin') {
    return <Navigate to="/" replace />
  }

  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    gstin: '',
    digitalSignature: '',
    qrCode: '',
    bankDetails: {
      accountName: '',
      accountNumber: '',
      bankName: '',
      ifscCode: '',
      upiId: '',
    }
  })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const res = await settingsApi.get()
      if (res.data.success && res.data.data) {
        const data = res.data.data
        setFormData({
          companyName: data.companyName || '',
          address: data.address || '',
          phone: data.phone || '',
          email: data.email || '',
          website: data.website || '',
          gstin: data.gstin || '',
          digitalSignature: data.digitalSignature || '',
          qrCode: data.qrCode || '',
          bankDetails: {
            accountName: data.bankDetails?.accountName || '',
            accountNumber: data.bankDetails?.accountNumber || '',
            bankName: data.bankDetails?.bankName || '',
            ifscCode: data.bankDetails?.ifscCode || '',
            upiId: data.bankDetails?.upiId || '',
          }
        })
      }
    } catch (err) {
      toast.error('Failed to load settings')
    } finally {
      setFetching(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 1024 * 1024) {
        toast.error('File size too large (max 1MB)')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, qrCode: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await settingsApi.update(formData)
      toast.success('Settings updated successfully')
    } catch (err) {
      toast.error('Failed to update settings')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header - Fixed */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--bg-surface)] shrink-0">
        <div>
          <h1 className="text-xl font-bold font-display text-[var(--text-primary)] leading-tight">Company Configuration</h1>
          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold mt-0.5">Global Branding & Invoicing Defaults</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn-primary px-5 py-2 text-xs shadow-lg shadow-amber-500/20 h-9"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
          ) : (
            <>
              <Save size={14} />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 pb-12">
          
          {/* Main Info - Left Col */}
          <div className="md:col-span-7 space-y-6">
            <div className="card p-5 space-y-5 border-l-2 border-amber-500">
              <div className="flex items-center gap-2 text-amber-500 mb-1">
                 <Building2 size={16} />
                 <h2 className="text-sm font-bold uppercase tracking-wider">Entity Details</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1.5">
                  <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Official Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="input-field h-9 text-sm"
                    placeholder="NexZen Digital Solutions"
                    required
                  />
                </div>

                <div className="col-span-2 space-y-1.5">
                  <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Registered Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="2"
                    className="input-field py-2 text-sm resize-none"
                    placeholder="Physical address for correspondence..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Tax ID / GSTIN</label>
                  <input
                    type="text"
                    name="gstin"
                    value={formData.gstin}
                    onChange={handleChange}
                    className="input-field h-9 text-sm uppercase font-mono"
                    placeholder="27AAAAA0000A1Z5"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Digital Signature (Designation)</label>
                  <div className="relative">
                    <PenTool size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                      type="text"
                      name="digitalSignature"
                      value={formData.digitalSignature}
                      onChange={handleChange}
                      className="input-field h-9 text-sm pl-9"
                      placeholder="Proprietor / CEO"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Banking Details */}
            <div className="card p-5 space-y-5 border-l-2 border-emerald-500">
              <div className="flex items-center gap-2 text-emerald-500 mb-1">
                 <Landmark size={16} />
                 <h2 className="text-sm font-bold uppercase tracking-wider">Financial Remittance</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Beneficiary Name</label>
                  <input
                    type="text"
                    name="bankDetails.accountName"
                    value={formData.bankDetails.accountName}
                    onChange={handleChange}
                    className="input-field h-9 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Account Number</label>
                  <input
                    type="text"
                    name="bankDetails.accountNumber"
                    value={formData.bankDetails.accountNumber}
                    onChange={handleChange}
                    className="input-field h-9 text-sm font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Bank Institution</label>
                  <input
                    type="text"
                    name="bankDetails.bankName"
                    value={formData.bankDetails.bankName}
                    onChange={handleChange}
                    className="input-field h-9 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">IFSC / Swift Code</label>
                  <input
                    type="text"
                    name="bankDetails.ifscCode"
                    value={formData.bankDetails.ifscCode}
                    onChange={handleChange}
                    className="input-field h-9 text-sm font-mono uppercase"
                  />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">UPI ID (For Quick Payment)</label>
                  <input
                    type="text"
                    name="bankDetails.upiId"
                    value={formData.bankDetails.upiId}
                    onChange={handleChange}
                    className="input-field h-9 text-sm font-mono"
                    placeholder="company@upi"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Misc - Right Col */}
          <div className="md:col-span-5 space-y-6">
            <div className="card p-5 space-y-5 border-l-2 border-purple-500">
               <div className="flex items-center gap-2 text-purple-500 mb-1">
                  <Globe size={16} />
                  <h2 className="text-sm font-bold uppercase tracking-wider">Payment QR Code</h2>
               </div>
               
               <div className="space-y-4 text-center">
                  <div className="aspect-square w-48 mx-auto bg-[var(--bg-elevated)] rounded-lg border-2 border-dashed border-[var(--border)] flex flex-col items-center justify-center overflow-hidden relative group">
                     {formData.qrCode ? (
                       <>
                         <img src={formData.qrCode} alt="QR Code" className="w-full h-full object-contain p-2" />
                         <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              type="button" 
                              onClick={() => setFormData(prev => ({ ...prev, qrCode: '' }))}
                              className="text-xs font-bold text-red-400 uppercase tracking-widest"
                            >
                               Remove
                            </button>
                         </div>
                       </>
                     ) : (
                       <div className="p-4">
                          <Globe size={24} className="mx-auto mb-2 opacity-20" />
                          <p className="text-[10px] text-[var(--text-muted)] uppercase font-bold">No QR Uploaded</p>
                       </div>
                     )}
                  </div>
                  
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="qr-upload"
                    />
                    <label
                      htmlFor="qr-upload"
                      className="btn-primary py-2 px-4 text-[10px] uppercase tracking-widest font-bold cursor-pointer inline-flex items-center gap-2"
                    >
                      <PenTool size={12} />
                      {formData.qrCode ? 'Change QR Code' : 'Upload QR Code'}
                    </label>
                  </div>
                  <p className="text-[9px] text-[var(--text-muted)] italic">
                    Upload your GPay/PhonePe/UPI QR code to show on invoices.
                  </p>
               </div>
            </div>
            <div className="card p-5 space-y-5 border-l-2 border-blue-500">
              <div className="flex items-center gap-2 text-blue-500 mb-1">
                 <Globe size={16} />
                 <h2 className="text-sm font-bold uppercase tracking-wider">Communications</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Public Email</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field h-9 text-sm pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Contact Phone</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field h-9 text-sm pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Website URL</label>
                  <div className="relative">
                    <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="input-field h-9 text-sm pl-9"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-lg bg-amber-500/5 border border-amber-500/10">
               <h4 className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-2">Notice</h4>
               <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                 Changes made here will be applied to all newly generated invoices immediately. Ensure banking details are verified for correct payment remittance.
               </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

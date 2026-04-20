import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { ArrowLeft, Save, Info, Check, User, Globe, Mail, Phone, DollarSign, Briefcase, Users } from 'lucide-react'
import { leadApi, clientApi } from '../lib/api'
import { useLead, useClient } from '../hooks/useData'
import { useToast } from '../context/ToastContext'

const SOURCE_OPTIONS = [
  { value: "Website", label: "Website" },
  { value: "Referral", label: "Referral" },
  { value: "Social Media", label: "Social Media" },
  { value: "Cold Call", label: "Cold Call" },
  { value: "Other", label: "Other" },
];

const LEAD_STATUS_OPTIONS = [
  { value: "New", label: "New" },
  { value: "Contacted", label: "Contacted" },
  { value: "Qualified", label: "Qualified" },
  { value: "Lost", label: "Lost" },
  { value: "Converted", label: "Converted" },
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

export default function EntityFormPage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const toast = useToast()
  
  // Determine if we are in Lead or Client mode based on the URL
  const type = location.pathname.startsWith('/clients') ? 'client' : 'lead'
  const isEdit = !!id
  
  // Conditionally use the right hook
  const { lead, isLoading: isLeadFetching } = useLead(type === 'lead' ? id : null)
  const { client, isLoading: isClientFetching } = useClient(type === 'client' ? id : null)
  
  const entity = type === 'lead' ? lead : client
  const isLoading = isEdit && (type === 'lead' ? isLeadFetching : isClientFetching)

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    source: 'Website',
    status: type === 'lead' ? 'New' : 'Active',
    budget: '',
    notes: '',
    services: [],
    totalValue: 0
  })

  // Populate form
  useEffect(() => {
    if (entity) {
      setFormData({
        name: entity.name || '',
        email: entity.email || '',
        phone: entity.phone || '',
        source: entity.source || 'Website',
        status: entity.status || (type === 'lead' ? 'New' : 'Active'),
        budget: entity.budget || '',
        notes: entity.notes || '',
        services: entity.services || [],
        totalValue: entity.totalValue || 0
      })
    }
  }, [entity, type])

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

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    setLoading(true)

    try {
      if (type === 'lead') {
        if (isEdit) {
          await leadApi.update(id, formData)
          toast.success('Lead updated successfully')
        } else {
          await leadApi.create(formData)
          toast.success('Lead registered successfully')
        }
        navigate('/leads')
      } else {
        await clientApi.update(id, formData)
        toast.success('Client updated successfully')
        navigate('/clients')
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || `Error saving ${type}`)
    } finally {
      setLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
      </div>
    )
  }

  const statusOptions = type === 'lead' ? LEAD_STATUS_OPTIONS : CLIENT_STATUS_OPTIONS

  return (
    <div className="w-full h-full flex flex-col space-y-4">
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(type === 'lead' ? '/leads' : '/clients')}
            className="p-1.5 rounded-md hover:bg-[var(--bg-hover)] transition-colors text-[var(--text-secondary)]"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
             <div className="p-1.5 rounded bg-amber-500/10 text-amber-500">
                {type === 'lead' ? <Users size={16} /> : <Briefcase size={16} />}
             </div>
             <div>
               <h1 className="text-xl font-bold font-display text-[var(--text-primary)] leading-none capitalize">
                 {isEdit ? `Edit ${type}` : `Register New ${type}`}
               </h1>
               <p className="text-[10px] text-[var(--text-muted)] mt-1 uppercase tracking-widest font-bold">
                 {type} management portal
               </p>
             </div>
          </div>
        </div>
        
        <button onClick={handleSubmit} disabled={loading} className="btn-primary text-sm px-4 py-1.5 h-8">
          {loading ? (
            <span className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin" />
          ) : (
            <Save size={14} />
          )}
          <span>{isEdit ? 'Save Changes' : (type === 'lead' ? 'Register' : 'Create')}</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-10">
        <form onSubmit={handleSubmit} className="card p-8 space-y-8 max-w-5xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* Standard Data Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-[var(--border)] pb-2 mb-2">
                 <User size={14} className="text-amber-500" />
                 <h3 className="section-label text-xs uppercase tracking-wider font-bold">Identity & Contact</h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Full Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="input-field text-sm py-2" placeholder="e.g. Alex Johnson" />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Email Address</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field text-sm py-2 pl-9" placeholder="alex@company.com" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Phone Number</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input type="text" name="phone" required value={formData.phone} onChange={handleChange} className="input-field text-sm py-2 pl-9" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
              </div>
            </div>

            {/* Project/Lead Details Section */}
            <div className="space-y-6">
               <div className="flex items-center gap-2 border-b border-[var(--border)] pb-2 mb-2">
                 <Globe size={14} className="text-amber-500" />
                 <h3 className="section-label text-xs uppercase tracking-wider font-bold">Source & Status</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Current Status</label>
                  <select name="status" value={formData.status} onChange={handleChange} className="input-field text-sm py-2 h-[38px] cursor-pointer">
                    {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Discovery Source</label>
                  <select name="source" value={formData.source} onChange={handleChange} className="input-field text-sm py-2 h-[38px] cursor-pointer">
                    {SOURCE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Budget Range</label>
                  <input type="text" name="budget" value={formData.budget} onChange={handleChange} className="input-field text-sm py-2" placeholder="e.g. $5k - $10k" />
                </div>
                {type === 'client' && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Contract Value</label>
                    <div className="relative">
                      <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                      <input type="number" name="totalValue" value={formData.totalValue} onChange={handleChange} className="input-field text-sm py-2 pl-9" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Services Section */}
            <div className="col-span-full space-y-4">
              <div className="flex items-center gap-2 border-b border-[var(--border)] pb-2 mb-2">
                 <Check size={14} className="text-amber-500" />
                 <h3 className="section-label text-xs uppercase tracking-wider font-bold">Selected Services</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {SERVICE_OPTIONS.map(service => {
                  const isSelected = formData.services?.includes(service)
                  return (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-sm border text-[10px] font-bold uppercase transition-all tracking-wider ${
                        isSelected 
                          ? 'bg-amber-500 text-black border-amber-500' 
                          : 'bg-[var(--bg-elevated)] border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--text-secondary)]'
                      }`}
                    >
                      {isSelected && <Check size={12} />}
                      <span>{service}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Notes Section */}
            <div className="col-span-full space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-[var(--text-muted)] block">Administrative & Private Notes</label>
              <textarea 
                name="notes" 
                value={formData.notes} 
                onChange={handleChange} 
                rows="5" 
                className="input-field text-sm py-3 w-full resize-none font-mono"
                placeholder="Mention specific requirements, preferences, or timeline..."
              />
            </div>
          </div>

          <div className="p-4 rounded border border-amber-500/10 bg-amber-500/5 flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
               <Info size={16} className="text-amber-500" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[var(--text-primary)]">Module Information</h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-0.5">
                Updating {type} details here synchronization with the unified data schema. Deleting {type} will remove it from the {type === 'lead' ? 'pipeline' : 'client base'}.
              </p>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}

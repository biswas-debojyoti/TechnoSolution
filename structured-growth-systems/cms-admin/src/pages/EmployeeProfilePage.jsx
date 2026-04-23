import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, Mail, Phone, Calendar, Briefcase, User, 
  Shield, DollarSign, FileText, Download, UserCircle, 
  Clock, Hash, MapPin, Pencil
} from 'lucide-react'
import { useEmployee } from '../hooks/useData'
import { employeeApi } from '../lib/api'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'

const DetailCard = ({ title, icon: Icon, children, actions }) => (
  <div className="card overflow-hidden">
    <div className="px-6 py-4 border-b border-[var(--border)] bg-[var(--bg-elevated)]/50 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-amber-500" />
        <h3 className="text-xs uppercase font-bold tracking-wider font-display text-[var(--text-primary)]">{title}</h3>
      </div>
      {actions}
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
)

const InfoItem = ({ label, value, icon: Icon, mono }) => (
  <div className="flex flex-col gap-1.5">
    <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] flex items-center gap-1.5">
      {Icon && <Icon size={11} />} {label}
    </span>
    <span className={`text-sm font-medium text-[var(--text-primary)] ${mono ? 'font-mono' : ''}`}>
      {value || '---'}
    </span>
  </div>
)

export default function EmployeeProfilePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const { admin } = useAuth()
  
  const { employee, isLoading, error } = useEmployee(id)

  const hasWriteAccess = ["admin", "superadmin"].includes(admin?.role) || admin?.permissions?.includes("write")

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !employee) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
          <User size={32} className="text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-[var(--text-primary)]">Employee Not Found</h2>
        <p className="text-sm text-[var(--text-muted)] mt-2 max-w-xs">The employee record you are looking for might have been deleted or moved.</p>
        <button onClick={() => navigate('/employees')} className="btn-ghost mt-6">Go Back to List</button>
      </div>
    )
  }

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0)
  }

  return (
    <div className="flex flex-col h-full bg-[var(--bg-base)]">
      {/* Header Section */}
      <div className="shrink-0 px-8 py-8 bg-[var(--bg-surface)] border-b border-[var(--border)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
            {/* Avatar */}
            <div className="relative group">
              {/* Back Button */}
              <button 
                onClick={() => navigate('/employees')} 
                className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[var(--bg-surface)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-amber-500 hover:border-amber-500 transition-all z-20 shadow-lg"
                title="Back to Directory"
              >
                <ArrowLeft size={14} />
              </button>
              
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-[var(--bg-elevated)] shadow-2xl bg-[var(--bg-elevated)] flex items-center justify-center">
                {employee.image ? (
                  <img 
                    src={employeeApi.imageUrl(employee._id)} 
                    alt={employee.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={48} className="text-[var(--text-muted)]" />
                )}
              </div>
              <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg border ${
                employee.status === 'active' 
                  ? 'bg-emerald-500 text-white border-emerald-400' 
                  : 'bg-[var(--text-muted)] text-white border-[var(--border)]'
              }`}>
                {employee.status}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <h1 className="text-4xl font-bold font-display text-[var(--text-primary)] tracking-tight">
                  {employee.name}
                </h1>
                {hasWriteAccess && (
                  <Link 
                    to={`/employees/${id}/edit`}
                    className="p-1.5 rounded-full hover:bg-amber-500/10 text-[var(--text-muted)] hover:text-amber-500 transition-colors"
                  >
                    <Pencil size={18} />
                  </Link>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-[var(--text-secondary)] font-medium">
                <span className="flex items-center gap-1.5">
                  <Briefcase size={14} className="text-amber-500" />
                  {employee.designation}
                </span>
                <span className="text-[var(--border-light)]">•</span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-amber-500" />
                  Joined {new Date(employee.joiningDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                </span>
                <span className="text-[var(--border-light)]">•</span>
                <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] bg-[var(--bg-elevated)] px-2 py-0.5 rounded border border-[var(--border)]">
                  EMP-{id.slice(-4).toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          </div>
        </div>
      {/* Content Grid */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Core Info */}
          <div className="lg:col-span-2 space-y-8">
            <DetailCard title="Personal & Contact Details" icon={UserCircle}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <InfoItem label="Full Name" value={employee.name} icon={User} />
                  <InfoItem label="Age" value={`${employee.age} Years`} icon={Calendar} />
                  <InfoItem label="Joining Date" value={new Date(employee.joiningDate).toDateString()} icon={Clock} />
                </div>
                <div className="space-y-6">
                  <InfoItem label="Mobile Number" value={employee.contactNo} icon={Phone} />
                  <InfoItem label="WhatsApp Number" value={employee.whatsappNo} icon={Phone} />
                  <InfoItem label="Employee ID" value={employee.userId} icon={Hash} mono />
                </div>
              </div>
            </DetailCard>

            <DetailCard title="Professional Overview" icon={Briefcase}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <InfoItem label="Designation" value={employee.designation} icon={Briefcase} />
                  <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                    <InfoItem label="Current Salary" value={formatCurrency(employee.salary)} icon={DollarSign} />
                  </div>
                </div>
                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] flex items-center gap-1.5 mb-2">
                    <Shield size={11} /> Access Permissions
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {employee.permissions?.map(p => (
                      <span key={p} className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono font-bold uppercase">
                        {p.replace(':', ' • ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </DetailCard>
          </div>

          {/* Right Column - Documents & Activity */}
          <div className="space-y-8">
            <DetailCard title="Documents Vault" icon={FileText}>
              <div className="space-y-3">
                {employee.documents && employee.documents.length > 0 ? (
                  employee.documents.map((doc) => (
                    <div key={doc._id} className="group flex items-center justify-between p-3 rounded-xl bg-[var(--bg-elevated)]/50 border border-[var(--border)] hover:border-amber-500/30 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[var(--text-muted)] group-hover:text-amber-500 transition-colors">
                          <FileText size={18} />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-[var(--text-primary)] truncate max-w-[140px]">{doc.filename}</p>
                          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-tight">{doc.contentType.split('/')[1]}</p>
                        </div>
                      </div>
                      <a 
                        href={employeeApi.documentUrl(employee._id, doc._id)} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-2 rounded-lg hover:bg-amber-500/10 text-[var(--text-muted)] hover:text-amber-500 transition-colors"
                        title="Download Document"
                      >
                        <Download size={14} />
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="py-10 text-center flex flex-col items-center gap-3 opacity-40">
                    <FileText size={32} />
                    <p className="text-xs font-medium">No documents uploaded</p>
                  </div>
                )}
              </div>
            </DetailCard>

            <div className="card p-6 bg-amber-500 shadow-xl shadow-amber-500/10">
               <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-bold text-black/60 uppercase tracking-widest">Account Security</span>
                     <Shield size={16} className="text-black/40" />
                  </div>
                  <p className="text-xs font-medium text-black leading-relaxed">
                     System access for <span className="font-bold underline">{employee.userId}</span> is currently <span className="font-bold">{employee.status.toUpperCase()}</span>. All actions performed are logged for auditing.
                  </p>
                  <button 
                    onClick={() => navigate(`/employees/${id}/edit`)}
                    className="w-full py-2.5 rounded-lg bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-black/80 transition-colors"
                  >
                    Modify Access
                  </button>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

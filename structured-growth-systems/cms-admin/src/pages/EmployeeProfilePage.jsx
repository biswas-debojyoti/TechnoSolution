import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, Mail, Phone, Calendar, Briefcase, User, 
  Shield, DollarSign, FileText, Download, UserCircle, 
  Clock, Hash, MapPin, Pencil, Plus, CreditCard, Layers, Receipt, TrendingUp
} from 'lucide-react'
import { useEmployee, useEmployeeSalaries, useAttendanceHistory } from '../hooks/useData'
import { employeeApi, settingsApi } from '../lib/api'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'
import { generateSalarySlipPDF } from '../lib/salarySlipGenerator'

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
  const { salaries, isLoading: salariesLoading, mutate: mutateSalaries } = useEmployeeSalaries(id)
  const { history: attendanceHistory, isLoading: attLoading } = useAttendanceHistory(id)

  const [activeTab, setActiveTab] = useState('overview')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [paymentData, setPaymentData] = useState(() => {
    const d = new Date()
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return {
      month: months[d.getMonth()],
      year: d.getFullYear(),
    }
  })

  const hasWriteAccess = ["admin", "superadmin"].includes(admin?.role) || admin?.permissions?.includes("employees:write")

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

  const handleAddPayment = async () => {
    setLoading(true)
    try {
      const s = employee.salarySetup || {}
      const earnings = { basic: s.basic||0, hra: s.hra||0, conveyance: s.conveyance||0, allowance: s.allowance||0 }
      const deductions = { pf: s.pf||0, esi: s.esi||0, tax: s.tax||0, deduction: s.deduction||0 }
      const netSalary = Object.values(earnings).reduce((a,b)=>a+b,0) - Object.values(deductions).reduce((a,b)=>a+b,0)
      
      const payload = {
        month: paymentData.month,
        year: paymentData.year,
        earnings,
        deductions,
        netSalary
      }
      
      await employeeApi.recordSalary(id, payload)
      toast.success('Salary payment recorded')
      mutateSalaries()
      setShowPaymentModal(false)
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Error recording salary')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadSlip = async (salary) => {
    try {
      const res = await settingsApi.get()
      const settings = res.data.success ? res.data.data : null
      generateSalarySlipPDF(employee, salary, settings)
      toast.success('Salary slip generated')
    } catch (err) {
      toast.error('Failed to generate slip')
    }
  }

  const netMonthlySalary = () => {
    if (!employee?.salarySetup) return 0;
    const s = employee.salarySetup;
    const earn = (s.basic||0) + (s.hra||0) + (s.conveyance||0) + (s.allowance||0);
    const ded = (s.pf||0) + (s.esi||0) + (s.tax||0) + (s.deduction||0);
    return earn - ded;
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
                  Joined {new Date(employee.joiningDate).toLocaleDateString('en-GB')}
                </span>
                <span className="text-[var(--border-light)]">•</span>
                <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] bg-[var(--bg-elevated)] px-2 py-0.5 rounded border border-[var(--border)]">
                  EMP-{id.slice(-4).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-4 md:mt-0">
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-[var(--border)] gap-8 px-8 shrink-0 bg-[var(--bg-surface)]">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'overview' ? 'text-amber-500' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}
        >
          <div className="flex items-center gap-2 uppercase tracking-wider">
             <Layers size={14} /> Profile Overview
          </div>
          {activeTab === 'overview' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />}
        </button>
        <button 
          onClick={() => setActiveTab('salaries')}
          className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'salaries' ? 'text-amber-500' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}
        >
          <div className="flex items-center gap-2 uppercase tracking-wider">
             <CreditCard size={14} /> Salary & Payments
          </div>
          {activeTab === 'salaries' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />}
        </button>
        <button 
          onClick={() => setActiveTab('attendance')}
          className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'attendance' ? 'text-amber-500' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}
        >
          <div className="flex items-center gap-2 uppercase tracking-wider">
             <Clock size={14} /> Attendance Records
          </div>
          {activeTab === 'attendance' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />}
        </button>
      </div>
      {/* Content Grid */}
      <div className="flex-1 overflow-y-auto p-8">
        {activeTab === 'overview' && (
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
                    <InfoItem label="Net Monthly Salary" value={formatCurrency(netMonthlySalary())} icon={DollarSign} />
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
        )}
        
        {activeTab === 'salaries' && (
          <div className="w-full space-y-6">
             <div className="card overflow-hidden">
                 <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border)] text-[var(--text-secondary)] uppercase text-[10px] tracking-wider font-mono">
                       <tr>
                          <th className="px-6 py-4 font-bold">Month / Year</th>
                          <th className="px-6 py-4 font-bold">Payment Date</th>
                          <th className="px-6 py-4 font-bold text-right">Net Paid</th>
                          <th className="px-6 py-4 font-bold text-right">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                       {salariesLoading ? (
                         <tr><td colSpan="4" className="text-center py-8">Loading...</td></tr>
                       ) : salaries.length === 0 ? (
                         <tr>
                           <td colSpan="4" className="px-6 py-12 text-center text-[var(--text-muted)] italic">
                             <Receipt size={32} className="mx-auto mb-3 opacity-20" />
                             No salary payments recorded yet.
                           </td>
                         </tr>
                       ) : (
                         salaries.map(salary => (
                           <tr key={salary._id} className="hover:bg-[var(--bg-hover)] transition-colors group">
                              <td className="px-6 py-4 font-bold">{salary.month} {salary.year}</td>
                              <td className="px-6 py-4 font-mono text-xs">{new Date(salary.paymentDate).toLocaleDateString('en-GB')}</td>
                              <td className="px-6 py-4 text-right">
                                 <span className="font-bold text-emerald-500 font-mono text-base">{formatCurrency(salary.netSalary)}</span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <button 
                                    onClick={() => handleDownloadSlip(salary)}
                                    className="p-1.5 rounded-sm text-amber-500 hover:bg-amber-500/10 transition-all border border-amber-500 flex items-center gap-2 ml-auto"
                                    title="Download Slip"
                                 >
                                    <Download size={14} /> Download Slip
                                 </button>
                              </td>
                           </tr>
                         ))
                       )}
                    </tbody>
                 </table>
             </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="w-full space-y-6">
             <div className="card overflow-hidden">
                 <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border)] text-[var(--text-secondary)] uppercase text-[10px] tracking-wider font-mono">
                       <tr>
                          <th className="px-6 py-4 font-bold">Date</th>
                          <th className="px-6 py-4 font-bold">Check In</th>
                          <th className="px-6 py-4 font-bold">Check Out</th>
                          <th className="px-6 py-4 font-bold">Total Work</th>
                          <th className="px-6 py-4 font-bold text-right">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                       {attLoading ? (
                         <tr><td colSpan="5" className="text-center py-8">Loading...</td></tr>
                       ) : attendanceHistory.length === 0 ? (
                         <tr>
                           <td colSpan="5" className="px-6 py-12 text-center text-[var(--text-muted)] italic">
                             <Clock size={32} className="mx-auto mb-3 opacity-20" />
                             No attendance records found.
                           </td>
                         </tr>
                       ) : (
                         attendanceHistory.map(att => (
                           <tr key={att._id} className="hover:bg-[var(--bg-hover)] transition-colors group">
                              <td className="px-6 py-4 font-bold">{new Date(att.dateString).toLocaleDateString('en-GB')}</td>
                              <td className="px-6 py-4 font-mono text-xs">{att.checkIn ? new Date(att.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}</td>
                              <td className="px-6 py-4 font-mono text-xs">{att.checkOut ? new Date(att.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}</td>
                              <td className="px-6 py-4 font-mono text-xs font-bold text-[var(--text-primary)]">
                                 {att.totalWorkMs ? `${Math.floor(att.totalWorkMs / 3600000)}h ${Math.floor((att.totalWorkMs % 3600000) / 60000)}m` : '0h 0m'}
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                                   att.status === 'completed' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                                   att.status === 'working' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                                   att.status === 'absent' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                   'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                                 }`}>
                                   {att.status.replace('_', ' ')}
                                 </span>
                              </td>
                           </tr>
                         ))
                       )}
                    </tbody>
                 </table>
             </div>
          </div>
        )}
      </div>

      {/* Record Salary Modal Removed - Use Global Salary Page instead */}
    </div>
  )
}

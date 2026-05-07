import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { authApi, settingsApi } from '../lib/api'
import { useToast } from '../context/ToastContext'
import { PageShell, Spinner, TableSkeleton } from '../components/ui/index'
import { 
  Save, UserCircle, Eye, EyeOff, Briefcase, Calendar, 
  Phone, Hash, Download, Receipt, Landmark, FileText, IndianRupee, Clock
} from 'lucide-react'
import { useEmployee, useEmployeeSalaries, useAttendanceHistory } from '../hooks/useData'
import { generateSalarySlipPDF } from '../lib/salarySlipGenerator'

export default function ProfilePage() {
  const { admin } = useAuth()
  const toast = useToast()

  const [form, setForm] = useState({ email: '', password: '' })
  const [saving, setSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const isEmployee = admin?.role === 'employee'
  
  const { employee, isLoading: empLoading } = useEmployee(isEmployee ? admin.id : null)
  const { salaries, isLoading: salLoading } = useEmployeeSalaries(isEmployee ? admin.id : null)
  const { history: attendanceHistory, isLoading: attLoading } = useAttendanceHistory(isEmployee ? admin.id : null)

  useEffect(() => {
    if (admin) {
      setForm((p) => ({ ...p, email: admin.email || '' }))
    }
  }, [admin])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {}
      if (form.email !== admin.email) payload.email = form.email
      if (form.password) payload.password = form.password

      if (Object.keys(payload).length === 0) {
        toast.error('No changes made.')
        setSaving(false)
        return
      }

      const res = await authApi.updateProfile(payload)
      toast.success('Profile updated successfully! You may need to log in again.')
      setForm((p) => ({ ...p, password: '' }))
      
      if (payload.email) {
        const stored = localStorage.getItem('cms_admin')
        if (stored) {
          try {
            const parsed = JSON.parse(stored)
            parsed.email = res.data?.admin?.email || payload.email
            localStorage.setItem('cms_admin', JSON.stringify(parsed))
          } catch(err) { console.error(err) }
        }
      }
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to update profile.')
    } finally {
      setSaving(false)
    }
  }

  const handleDownloadSlip = async (salary) => {
    try {
      const res = await settingsApi.get()
      const settings = res.data.success ? res.data.data : null
      if (!employee) throw new Error('Could not fetch employee details')
      generateSalarySlipPDF(employee, salary, settings)
      toast.success('Salary slip generated')
    } catch (err) {
      toast.error('Failed to generate slip')
    }
  }

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0)
  }

  if (!isEmployee) {
    // Return the simple view for superadmin/admin
    return (
      <PageShell title="My Profile" subtitle="Manage your account credentials">
        <div className="card m-4 p-6 max-w-xl">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[var(--border)]">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
              <UserCircle size={32} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'Syne, sans-serif' }}>
                {admin?.name}
              </h2>
              <p className="text-sm text-[var(--text-muted)] mt-0.5">
                Role: <span className="uppercase text-[var(--text-secondary)] font-mono text-xs ml-1 bg-[var(--bg-hover)] px-1.5 py-0.5 rounded-sm border border-[var(--border)]">{admin?.role}</span>
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="section-label block mb-1.5">Email Address</label>
              <input
                type="text"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field"
                placeholder="Enter Email"
                required
              />
            </div>

            <div>
              <label className="section-label block mb-1.5">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field pr-10"
                  placeholder="Leave blank to keep current password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                  tabIndex="-1"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" disabled={saving} className="btn-primary py-2.5 px-6 font-medium">
                {saving ? <Spinner size={14} /> : <Save size={14} />}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell title="My Profile" subtitle="Manage your account credentials and view your details">
      <div className="m-4">
        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-[var(--border)] mb-6">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'overview' 
                ? 'border-amber-500 text-amber-500' 
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Overview & Settings
          </button>
          <button 
            onClick={() => setActiveTab('salary')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'salary' 
                ? 'border-emerald-500 text-emerald-500' 
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Receipt size={16} /> My Salary History
          </button>
          <button 
            onClick={() => setActiveTab('attendance')}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'attendance' 
                ? 'border-blue-500 text-blue-500' 
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Clock size={16} /> Attendance History
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Left Col: Edit Credentials */}
            <div className="space-y-6">
              <div className="card p-6">
                <div className="flex flex-col items-center mb-8 pb-6 border-b border-[var(--border)]">
                  {employee?.image ? (
                     <img 
                        src={`/api/employees/${employee._id}/image`} 
                        alt={employee.name} 
                        className="w-24 h-24 rounded-full object-cover border-4 border-amber-500/20 mb-4"
                     />
                  ) : (
                     <div className="w-24 h-24 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4">
                        <UserCircle size={48} />
                     </div>
                  )}
                  <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {employee?.name || admin?.name}
                  </h2>
                  <p className="text-sm text-[var(--text-muted)] font-mono mt-1">
                    EMP ID: {employee?.userId}
                  </p>
                </div>

                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-4">Login Credentials</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="section-label block mb-1.5">User ID</label>
                    <input
                      type="text"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="input-field"
                      placeholder="Enter User ID"
                      required
                    />
                  </div>

                  <div>
                    <label className="section-label block mb-1.5">New Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="input-field pr-10"
                        placeholder="Leave blank to keep current"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                        tabIndex="-1"
                      >
                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button type="submit" disabled={saving} className="btn-primary py-2 px-6 font-medium w-full justify-center">
                      {saving ? <Spinner size={14} /> : <Save size={14} />}
                      Save Credentials
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Col: Read-only Employee Details */}
            <div className="xl:col-span-2 space-y-6">
              
              {empLoading ? (
                <div className="animate-pulse flex gap-4"><div className="h-64 bg-[var(--bg-hover)] w-full rounded-lg"></div></div>
              ) : employee ? (
                <>
                  {/* Basic Info */}
                  <div className="card p-6 border-l-2 border-amber-500">
                    <h3 className="text-lg font-bold font-display text-[var(--text-primary)] mb-4 flex items-center gap-2">
                       <Briefcase size={18} className="text-amber-500" /> Basic Information
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                       <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg">
                          <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1">Designation</p>
                          <p className="text-sm font-semibold text-[var(--text-primary)]">{employee.designation}</p>
                       </div>
                       <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg">
                          <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1 flex items-center gap-1"><Calendar size={10} /> Joining Date</p>
                          <p className="text-sm font-semibold text-[var(--text-primary)]">{new Date(employee.joiningDate).toLocaleDateString('en-GB')}</p>
                       </div>
                       <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg">
                          <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1 flex items-center gap-1"><Phone size={10} /> Contact</p>
                          <p className="text-sm font-semibold text-[var(--text-primary)] font-mono">{employee.contactNo}</p>
                       </div>
                    </div>
                  </div>

                  {/* Financial Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Bank Details */}
                    <div className="card p-6 border-l-2 border-blue-500">
                      <h3 className="text-lg font-bold font-display text-[var(--text-primary)] mb-4 flex items-center gap-2">
                         <Landmark size={18} className="text-blue-500" /> Bank Details
                      </h3>
                      <div className="space-y-3">
                         <div>
                            <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] mb-0.5">Bank Name</p>
                            <p className="text-sm font-semibold text-[var(--text-primary)]">{employee.accountDetails?.bankName || 'N/A'}</p>
                         </div>
                         <div>
                            <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] mb-0.5">Account Number</p>
                            <p className="text-sm font-semibold text-[var(--text-primary)] font-mono">{employee.accountDetails?.accountNo || 'N/A'}</p>
                         </div>
                         <div className="flex gap-6">
                           <div>
                              <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] mb-0.5">IFSC</p>
                              <p className="text-sm font-semibold text-[var(--text-primary)] font-mono uppercase">{employee.accountDetails?.ifsc || 'N/A'}</p>
                           </div>
                           <div>
                              <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] mb-0.5">PAN</p>
                              <p className="text-sm font-semibold text-[var(--text-primary)] font-mono uppercase">{employee.accountDetails?.panNo || 'N/A'}</p>
                           </div>
                         </div>
                      </div>
                    </div>

                    {/* Salary Setup */}
                    <div className="card p-6 border-l-2 border-emerald-500">
                      <h3 className="text-lg font-bold font-display text-[var(--text-primary)] mb-4 flex items-center gap-2">
                         <IndianRupee size={18} className="text-emerald-500" /> Salary Structure
                      </h3>
                      <div className="space-y-2">
                         <div className="flex justify-between items-center py-1 border-b border-[var(--border)]">
                            <span className="text-xs text-[var(--text-secondary)]">Basic Salary</span>
                            <span className="text-sm font-mono font-bold text-[var(--text-primary)]">{formatCurrency(employee.salarySetup?.basic)}</span>
                         </div>
                         <div className="flex justify-between items-center py-1 border-b border-[var(--border)]">
                            <span className="text-xs text-[var(--text-secondary)]">HRA</span>
                            <span className="text-sm font-mono text-[var(--text-primary)]">{formatCurrency(employee.salarySetup?.hra)}</span>
                         </div>
                         <div className="flex justify-between items-center py-1 border-b border-[var(--border)]">
                            <span className="text-xs text-[var(--text-secondary)]">Conveyance</span>
                            <span className="text-sm font-mono text-[var(--text-primary)]">{formatCurrency(employee.salarySetup?.conveyance)}</span>
                         </div>
                         <div className="flex justify-between items-center py-1 border-b border-[var(--border)]">
                            <span className="text-xs text-[var(--text-secondary)]">Other Allowance</span>
                            <span className="text-sm font-mono text-[var(--text-primary)]">{formatCurrency(employee.salarySetup?.allowance)}</span>
                         </div>
                         <div className="flex justify-between items-center pt-2 mt-2 border-t-2 border-[var(--border)]">
                            <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">Gross Pay</span>
                            <span className="text-base font-mono font-bold text-emerald-500">
                              {formatCurrency(
                                (Number(employee.salarySetup?.basic) || 0) + 
                                (Number(employee.salarySetup?.hra) || 0) + 
                                (Number(employee.salarySetup?.conveyance) || 0) + 
                                (Number(employee.salarySetup?.allowance) || 0)
                              )}
                            </span>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="card p-6 border-l-2 border-indigo-500">
                    <h3 className="text-lg font-bold font-display text-[var(--text-primary)] mb-4 flex items-center gap-2">
                       <FileText size={18} className="text-indigo-500" /> Uploaded Documents
                    </h3>
                    {employee.documents && employee.documents.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {employee.documents.map((doc) => (
                          <a 
                            key={doc._id} 
                            href={`/api/employees/${employee._id}/documents/${doc._id}`}
                            target="_blank" rel="noreferrer"
                            className="p-3 border border-[var(--border)] rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] transition-colors flex flex-col items-center gap-2 text-center group"
                          >
                            <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <FileText size={18} />
                            </div>
                            <span className="text-xs font-medium text-[var(--text-primary)] break-all line-clamp-2">{doc.originalName}</span>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-[var(--text-muted)] italic">No documents uploaded.</p>
                    )}
                  </div>
                </>
              ) : (
                <p className="text-sm text-[var(--text-muted)]">Could not load details.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'salary' && (
          <div className="card overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
              <h3 className="text-lg font-bold font-display text-[var(--text-primary)] flex items-center gap-2">
                 <Receipt size={18} className="text-emerald-500" /> My Salary History
              </h3>
            </div>
            <div className="overflow-x-auto flex-1">
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
                  {salLoading ? (
                    <tr><td colSpan="4" className="p-4"><TableSkeleton columns={4} rows={3} /></td></tr>
                  ) : salaries.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-[var(--text-muted)] italic">
                         No salary records found.
                      </td>
                    </tr>
                  ) : (
                    salaries.map((salary) => (
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
          <div className="card overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
              <h3 className="text-lg font-bold font-display text-[var(--text-primary)] flex items-center gap-2">
                 <Clock size={18} className="text-blue-500" /> Attendance History
              </h3>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border)] text-[var(--text-secondary)] uppercase text-[10px] tracking-wider font-mono">
                  <tr>
                    <th className="px-6 py-4 font-bold">Date</th>
                    <th className="px-6 py-4 font-bold">Check In</th>
                    <th className="px-6 py-4 font-bold">Check Out</th>
                    <th className="px-6 py-4 font-bold">Total Breaks</th>
                    <th className="px-6 py-4 font-bold">Work Time</th>
                    <th className="px-6 py-4 font-bold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {attLoading ? (
                    <tr><td colSpan="6" className="p-4"><TableSkeleton columns={6} rows={3} /></td></tr>
                  ) : attendanceHistory.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-[var(--text-muted)] italic">
                         No attendance records found.
                      </td>
                    </tr>
                  ) : (
                    attendanceHistory.map((att) => {
                      let totalBreakMs = att.breaks.reduce((sum, b) => sum + (b.durationMs || 0), 0);
                      let currentWorkMs = att.totalWorkMs;

                      // If still working or on break, calculate live duration
                      if (att.status !== 'completed' && att.checkIn) {
                        const now = new Date().getTime();
                        const checkInTime = new Date(att.checkIn).getTime();
                        const elapsed = now - checkInTime;
                        
                        let activeBreakMs = 0;
                        att.breaks.forEach(b => {
                          if (!b.end) {
                            activeBreakMs += now - new Date(b.start).getTime();
                          }
                        });
                        
                        currentWorkMs = elapsed - (totalBreakMs + activeBreakMs);
                        totalBreakMs += activeBreakMs;
                      }
                      
                      const formatDur = (ms) => {
                        if (!ms || ms <= 0) return '0h 0m';
                        const totalMins = Math.floor(ms / 60000);
                        const h = Math.floor(totalMins / 60);
                        const m = totalMins % 60;
                        return `${h}h ${m}m`;
                      };

                      return (
                        <tr key={att._id} className="hover:bg-[var(--bg-hover)] transition-colors group">
                          <td className="px-6 py-4 font-bold">{new Date(att.dateString).toLocaleDateString('en-GB')}</td>
                          <td className="px-6 py-4 font-mono text-xs">{att.checkIn ? new Date(att.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}</td>
                          <td className="px-6 py-4 font-mono text-xs">{att.checkOut ? new Date(att.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}</td>
                          <td className="px-6 py-4 font-mono text-xs text-amber-500">{formatDur(totalBreakMs)}</td>
                          <td className="px-6 py-4 font-mono text-xs font-bold text-emerald-500">{formatDur(currentWorkMs)}</td>
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
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </PageShell>
  )
}

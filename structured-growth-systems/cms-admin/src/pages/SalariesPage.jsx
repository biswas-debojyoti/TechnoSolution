import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Plus, Search, Receipt, Download, CreditCard, ChevronDown 
} from 'lucide-react'
import { useGlobalSalaries, useActiveEmployees } from '../hooks/useData'
import { employeeApi, settingsApi } from '../lib/api'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'
import { generateSalarySlipPDF } from '../lib/salarySlipGenerator'
import { useDebounce } from 'use-debounce'
import { PageShell, TableSkeleton } from '../components/ui'

export default function SalariesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch] = useDebounce(searchTerm, 500)
  const [year, setYear] = useState(() => new Date().getFullYear().toString())
  const [employeeFilter, setEmployeeFilter] = useState('')
  
  const { salaries, isLoading, mutate } = useGlobalSalaries({ 
    search: debouncedSearch, 
    year,
    employeeId: employeeFilter
  })
  const { employees, isLoading: employeesLoading } = useActiveEmployees()
  const { admin } = useAuth()
  const { toast } = useToast()

  const [showModal, setShowModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  
  const [paymentData, setPaymentData] = useState({
    employeeId: '',
    month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][new Date().getMonth()],
    year: new Date().getFullYear()
  })

  const hasWriteAccess = ["admin", "superadmin"].includes(admin?.role) || admin?.permissions?.includes("write")

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0)
  }

  const selectedEmployee = paymentData.employeeId ? employees.find(e => e._id === paymentData.employeeId) : null

  const calculateNetSalary = (emp) => {
    if (!emp?.salarySetup) return 0;
    const s = emp.salarySetup;
    const earn = (s.basic||0) + (s.hra||0) + (s.conveyance||0) + (s.allowance||0);
    const ded = (s.pf||0) + (s.esi||0) + (s.tax||0) + (s.deduction||0);
    return earn - ded;
  }

  const handleRecordPayment = async () => {
    if (!paymentData.employeeId) return toast.error('Please select an employee');
    
    setSubmitting(true)
    try {
      const s = selectedEmployee.salarySetup || {}
      const earnings = { basic: s.basic||0, hra: s.hra||0, conveyance: s.conveyance||0, allowance: s.allowance||0 }
      const deductions = { pf: s.pf||0, esi: s.esi||0, tax: s.tax||0, deduction: s.deduction||0 }
      const netSalary = calculateNetSalary(selectedEmployee)
      
      const payload = {
        month: paymentData.month,
        year: paymentData.year,
        earnings,
        deductions,
        netSalary
      }
      
      await employeeApi.recordSalary(paymentData.employeeId, payload)
      toast.success('Salary payment recorded')
      mutate()
      setShowModal(false)
      setPaymentData({...paymentData, employeeId: ''})
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Error recording salary')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDownloadSlip = async (salary) => {
    try {
      const res = await settingsApi.get()
      const settings = res.data.success ? res.data.data : null
      
      // We need the full employee details for the slip, not just the basic populated ones
      const empRes = await employeeApi.get(salary.employeeId._id)
      const fullEmployee = empRes.data.success ? empRes.data.data : null
      if (!fullEmployee) throw new Error('Could not fetch employee details')

      generateSalarySlipPDF(fullEmployee, salary, settings)
      toast.success('Salary slip generated')
    } catch (err) {
      toast.error('Failed to generate slip')
    }
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({length: 5}, (_, i) => currentYear - i)

  return (
    <PageShell 
      title="Salary Payments" 
      subtitle="Manage and view all employee salary records."
      actions={hasWriteAccess && (
        <button onClick={() => setShowModal(true)} className="btn-primary">
          <Plus size={16} />
          <span>Record Salary</span>
        </button>
      )}
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by Employee Name or ID..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
          <Search className="absolute left-3 top-2.5 text-[var(--text-muted)]" size={18} />
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase whitespace-nowrap">Employee:</label>
              <div className="relative">
                <select 
                   value={employeeFilter} 
                   onChange={e => setEmployeeFilter(e.target.value)} 
                   className="input-field py-2 pl-4 pr-8 text-sm appearance-none font-bold min-w-[180px]"
                >
                   <option value="">All Employees</option>
                   {employees.map(emp => (
                      <option key={emp._id} value={emp._id}>{emp.name}</option>
                   ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-3 text-[var(--text-muted)] pointer-events-none" />
              </div>
           </div>
           <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Year:</label>
              <div className="relative">
                <select 
                   value={year} 
                   onChange={e => setYear(e.target.value)} 
                   className="input-field py-2 pl-4 pr-8 text-sm appearance-none font-bold"
                >
                   <option value="">All Time</option>
                   {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-3 text-[var(--text-muted)] pointer-events-none" />
              </div>
           </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border)] text-[var(--text-secondary)] uppercase text-[10px] tracking-wider font-mono">
              <tr>
                <th className="px-6 py-4 font-bold">Employee</th>
                <th className="px-6 py-4 font-bold">EMP ID</th>
                <th className="px-6 py-4 font-bold">Month / Year</th>
                <th className="px-6 py-4 font-bold">Payment Date</th>
                <th className="px-6 py-4 font-bold text-right">Net Paid</th>
                <th className="px-6 py-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {isLoading ? (
                <TableSkeleton columns={6} rows={5} />
              ) : salaries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-[var(--text-muted)] italic">
                     <Receipt size={32} className="mx-auto mb-3 opacity-20" />
                     No salary records found matching your filters.
                  </td>
                </tr>
              ) : (
                salaries.map((salary) => (
                  <tr key={salary._id} className="hover:bg-[var(--bg-hover)] transition-colors group">
                    <td className="px-6 py-4">
                       <Link to={`/employees/${salary.employeeId._id}`} className="font-bold text-[var(--text-primary)] hover:text-amber-500 transition-colors">
                          {salary.employeeId.name}
                       </Link>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-[var(--text-muted)] uppercase">
                       {salary.employeeId.userId}
                    </td>
                    <td className="px-6 py-4 font-bold">{salary.month} {salary.year}</td>
                    <td className="px-6 py-4 font-mono text-xs">{new Date(salary.paymentDate).toLocaleDateString()}</td>
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

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
           <div className="card w-full max-w-md p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200 overflow-visible">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3 text-emerald-500 font-display">
                    <CreditCard size={20} />
                    <h3 className="text-lg font-bold uppercase tracking-wider">Record Salary Payment</h3>
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Select Employee</label>
                    <div className="relative">
                       <select 
                         value={paymentData.employeeId}
                         onChange={(e) => setPaymentData({...paymentData, employeeId: e.target.value})}
                         className="input-field text-sm py-2 h-[41px] appearance-none"
                         disabled={employeesLoading}
                        >
                          <option value="">-- Choose Employee --</option>
                          {employees.map(emp => (
                             <option key={emp._id} value={emp._id}>
                                {emp.name} ({emp.userId}) - {emp.designation}
                             </option>
                          ))}
                       </select>
                       <ChevronDown size={14} className="absolute right-3 top-[13px] text-[var(--text-muted)] pointer-events-none" />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                       <label className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Month</label>
                       <div className="relative">
                          <select 
                            value={paymentData.month}
                            onChange={(e) => setPaymentData({...paymentData, month: e.target.value})}
                            className="input-field text-sm py-2 h-[41px] appearance-none"
                           >
                             {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(m => <option key={m} value={m}>{m}</option>)}
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-[13px] text-[var(--text-muted)] pointer-events-none" />
                       </div>
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Year</label>
                       <input 
                         type="number" 
                         value={paymentData.year}
                         onChange={(e) => setPaymentData({...paymentData, year: parseInt(e.target.value)})}
                         className="input-field text-sm py-2 h-[41px]" 
                        />
                    </div>
                 </div>
                 
                 <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                    <p className="text-xs text-[var(--text-muted)] mb-2">Calculated Net Salary:</p>
                    <p className="text-2xl font-mono font-bold text-emerald-500">
                       {selectedEmployee ? formatCurrency(calculateNetSalary(selectedEmployee)) : formatCurrency(0)}
                    </p>
                    {selectedEmployee && calculateNetSalary(selectedEmployee) <= 0 && (
                       <p className="text-[10px] text-red-400 mt-2 flex items-center gap-1">
                          Net salary is 0 or negative. Check employee salary setup.
                       </p>
                    )}
                 </div>
              </div>

              <div className="flex gap-3 pt-2">
                 <button onClick={() => setShowModal(false)} className="flex-1 py-2 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                    Cancel
                 </button>
                 <button 
                   onClick={handleRecordPayment} 
                   disabled={submitting || !selectedEmployee || calculateNetSalary(selectedEmployee) <= 0} 
                   className="flex-1 btn-primary py-2 bg-emerald-600 hover:bg-emerald-500 border-emerald-600 text-sm font-bold shadow-lg shadow-emerald-500/20"
                 >
                    {submitting ? 'Recording...' : 'Record Payment'}
                 </button>
              </div>
           </div>
        </div>
      )}
    </PageShell>
  )
}

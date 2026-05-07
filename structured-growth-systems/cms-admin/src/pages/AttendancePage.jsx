import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Clock, Calendar, Search, ChevronDown, User, ArrowRight,
  CheckCircle, XCircle, Coffee
} from 'lucide-react'
import { useAllAttendance, useActiveEmployees } from '../hooks/useData'
import { PageShell, TableSkeleton } from '../components/ui'
import { useDebounce } from 'use-debounce'

export default function AttendancePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch] = useDebounce(searchTerm, 500)
  
  const now = new Date()
  const [month, setMonth] = useState((now.getMonth() + 1).toString())
  const [year, setYear] = useState(now.getFullYear().toString())
  const [employeeFilter, setEmployeeFilter] = useState('')

  const { attendance, isLoading } = useAllAttendance({
    month,
    year,
    employeeId: employeeFilter,
    search: debouncedSearch
  })

  const { employees, isLoading: employeesLoading } = useActiveEmployees()

  const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString())

  const getStatusBadge = (status) => {
    switch (status) {
      case 'working':
        return (
          <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
            <CheckCircle size={10} /> Working
          </span>
        )
      case 'on_break':
        return (
          <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-wider border border-amber-500/20">
            <Coffee size={10} /> On Break
          </span>
        )
      case 'completed':
        return (
          <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
            <Clock size={10} /> Completed
          </span>
        )
      case 'absent':
        return (
          <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-wider border border-red-500/20">
            <XCircle size={10} /> Absent
          </span>
        )
      default:
        return (
          <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-500/10 text-gray-500 text-[10px] font-bold uppercase tracking-wider border border-gray-500/20">
            Unknown
          </span>
        )
    }
  }

  const formatTime = (dateStr) => {
    if (!dateStr) return '--:--'
    return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const formatDuration = (ms) => {
    if (!ms) return '0h 0m'
    const totalMinutes = Math.floor(ms / 60000)
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${hours}h ${minutes}m`
  }

  return (
    <PageShell 
      title="Employee Attendance" 
      subtitle="Monitor and filter daily attendance records for all staff."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card p-4 flex items-center gap-4 border-l-4 border-emerald-500">
           <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <CheckCircle size={24} />
           </div>
           <div>
              <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Present Today</p>
              <p className="text-2xl font-display font-bold text-[var(--text-primary)]">
                {attendance.filter(a => a.status === 'working').length}
              </p>
           </div>
        </div>
        <div className="card p-4 flex items-center gap-4 border-l-4 border-amber-500">
           <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
              <Coffee size={24} />
           </div>
           <div>
              <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Currently on Break</p>
              <p className="text-2xl font-display font-bold text-[var(--text-primary)]">
                {attendance.filter(a => a.status === 'on_break').length}
              </p>
           </div>
        </div>
        <div className="card p-4 flex items-center gap-4 border-l-4 border-blue-500">
           <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Clock size={24} />
           </div>
           <div>
              <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Completed Today</p>
              <p className="text-2xl font-display font-bold text-[var(--text-primary)]">
                {attendance.filter(a => a.status === 'completed').length}
              </p>
           </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6">
        <div className="relative w-full xl:w-96">
          <input
            type="text"
            placeholder="Search by Employee Name or ID..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="input-field pl-10 h-11"
          />
          <Search className="absolute left-3 top-3.5 text-[var(--text-muted)]" size={18} />
        </div>
        
        <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
           <div className="flex items-center gap-2 flex-1 md:flex-none">
              <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase whitespace-nowrap">Employee:</label>
              <div className="relative flex-1 md:flex-none">
                <select 
                   value={employeeFilter} 
                   onChange={e => setEmployeeFilter(e.target.value)} 
                   className="input-field py-2 pl-4 pr-10 text-sm appearance-none font-bold min-w-[180px] h-11"
                >
                   <option value="">All Employees (Today)</option>
                   {employees.map(emp => (
                      <option key={emp._id} value={emp._id}>{emp.name}</option>
                   ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-4 text-[var(--text-muted)] pointer-events-none" />
              </div>
           </div>

           {employeeFilter && (
             <div className="flex flex-wrap items-center gap-4 animate-in fade-in slide-in-from-right-2 duration-300">
               <div className="flex items-center gap-2">
                  <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase whitespace-nowrap">Month:</label>
                  <div className="relative">
                    <select 
                       value={month} 
                       onChange={e => setMonth(e.target.value)} 
                       className="input-field py-2 pl-4 pr-10 text-sm appearance-none font-bold h-11"
                    >
                       {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-4 text-[var(--text-muted)] pointer-events-none" />
                  </div>
               </div>

               <div className="flex items-center gap-2">
                  <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase whitespace-nowrap">Year:</label>
                  <div className="relative">
                    <select 
                       value={year} 
                       onChange={e => setYear(e.target.value)} 
                       className="input-field py-2 pl-4 pr-10 text-sm appearance-none font-bold h-11"
                    >
                       {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-4 text-[var(--text-muted)] pointer-events-none" />
                  </div>
               </div>
             </div>
           )}
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border)] text-[var(--text-secondary)] uppercase text-[10px] tracking-wider font-mono">
              <tr>
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold">Employee</th>
                <th className="px-6 py-4 font-bold text-center">Check In</th>
                <th className="px-6 py-4 font-bold text-center">Check Out</th>
                <th className="px-6 py-4 font-bold text-center">Total Work</th>
                <th className="px-6 py-4 font-bold text-center">Status</th>
                <th className="px-6 py-4 font-bold text-right">Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {isLoading ? (
                <TableSkeleton columns={7} rows={8} />
              ) : attendance.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-20 text-center text-[var(--text-muted)] italic">
                     <Calendar size={48} className="mx-auto mb-4 opacity-10" />
                     <p className="text-lg font-medium not-italic mb-1">No attendance records found</p>
                     <p className="text-sm">Try adjusting your filters or search term.</p>
                  </td>
                </tr>
              ) : (
                attendance.map((record) => (
                  <tr key={record._id} className="hover:bg-[var(--bg-hover)] transition-colors group">
                    <td className="px-6 py-4 font-mono font-bold text-[var(--text-primary)]">
                       {record.dateString.split('-').reverse().join('/')}
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-muted)] border border-[var(--border)]">
                             <User size={14} />
                          </div>
                          <div>
                             <p className="font-bold text-[var(--text-primary)] leading-none mb-1">{record.employeeId?.name || 'Unknown'}</p>
                             <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-tighter">
                                {record.employeeId?.userId} • {record.employeeId?.designation}
                             </p>
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                       <span className="font-mono text-emerald-500 font-bold">{formatTime(record.checkIn)}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                       <span className="font-mono text-amber-500 font-bold">{formatTime(record.checkOut)}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                       <span className="px-2 py-1 rounded bg-[var(--bg-elevated)] font-mono font-bold text-[var(--text-primary)]">
                          {formatDuration(record.totalWorkMs)}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex justify-center">
                          {getStatusBadge(record.status)}
                       </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <Link 
                          to={`/employees/${record.employeeId?._id}`}
                          className="inline-flex items-center gap-2 p-2 rounded-lg hover:bg-amber-500/10 text-amber-500 transition-colors"
                          title="View Employee Profile"
                       >
                          <ArrowRight size={18} />
                       </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  )
}

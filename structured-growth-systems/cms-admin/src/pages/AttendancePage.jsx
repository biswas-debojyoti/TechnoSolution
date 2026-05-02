import { Clock, Calendar, CheckCircle, XCircle } from 'lucide-react'
import { PageShell } from '../components/ui'

export default function AttendancePage() {
  return (
    <PageShell 
      title="Attendance Management" 
      subtitle="Track and manage employee attendance and leaves."
    >
      <div className="flex flex-col items-center justify-center py-20 text-center opacity-70">
         <div className="w-24 h-24 mb-6 rounded-3xl bg-amber-500/10 flex items-center justify-center relative">
            <Calendar size={40} className="text-amber-500 absolute" />
            <Clock size={20} className="text-amber-600 absolute bottom-4 right-4 bg-[var(--bg-surface)] rounded-full border-2 border-[var(--bg-surface)]" />
         </div>
         <h2 className="text-2xl font-bold font-display text-[var(--text-primary)] mb-2 tracking-tight">
            Coming Soon
         </h2>
         <p className="text-[var(--text-secondary)] max-w-md mx-auto text-sm leading-relaxed mb-8">
            The Attendance Management module is currently under development. Soon, you'll be able to track daily check-ins, manage leaves, and view comprehensive attendance reports here.
         </p>
         
         <div className="flex gap-4 items-center opacity-50">
            <div className="flex items-center gap-2 text-xs font-mono font-bold">
               <CheckCircle size={14} className="text-emerald-500" /> Present
            </div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold">
               <XCircle size={14} className="text-red-500" /> Absent
            </div>
         </div>
      </div>
    </PageShell>
  )
}

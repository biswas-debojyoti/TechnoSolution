import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { FileText, MessageSquare, TrendingUp, Eye, Plus, ArrowRight, Clock, Users, UserCheck, Briefcase, Calendar } from 'lucide-react'
import { useInquiries, useDashboardStats, useEmployee, useAttendanceToday } from '../hooks/useData'
import { attendanceApi } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import { Skeleton, StatusBadge, DateRangePicker } from '../components/ui/index'

function StatCard({ icon: Icon, label, value, sub, accent, loading, isCurrency, bgClass }) {
  return (
    <div className={`card p-5 relative overflow-hidden border-none shadow-sm ${bgClass || ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={'w-8 h-8 rounded-sm flex items-center justify-center ' + (accent || 'bg-[var(--bg-elevated)] border border-[var(--border)]')}>
          <Icon size={15} className={accent ? 'text-black' : 'text-[var(--text-muted)]'} />
        </div>
        <span className="section-label">{label}</span>
      </div>
      {loading
        ? <Skeleton className="h-8 w-16 mb-1" />
        : <p className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'Syne, sans-serif' }}>
            {isCurrency && value !== null ? '₹' : ''}{value?.toLocaleString() ?? '0'}
          </p>
      }
      {sub && <p className="text-[10px] uppercase tracking-wider font-bold text-[var(--text-muted)] mt-1">{sub}</p>}
    </div>
  )
}

function RecentInquiryRow({ inq }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--bg-hover)] transition-colors">
      <div className="w-8 h-8 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center shrink-0">
        <span className="text-xs font-mono text-[var(--text-muted)] uppercase">{inq.name[0]}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[var(--text-primary)] truncate">{inq.name}</p>
        <p className="text-xs text-[var(--text-muted)] truncate">{inq.email}</p>
      </div>
      <StatusBadge status={inq.status} />
    </div>
  )
}

export default function DashboardPage() {
  const { admin } = useAuth()
  
  if (admin?.role === 'employee') {
    return <EmployeeDashboard admin={admin} />
  }

  const [range, setRange] = useState(() => {
    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - 30)
    return { start, end }
  })
  
  const getParams = () => {
    return {
      startDate: range.start ? range.start.toISOString() : undefined,
      endDate: range.end ? range.end.toISOString() : undefined
    }
  }

  const { stats, isLoading: statsLoading } = useDashboardStats(getParams())
  const { inquiries, isLoading: inqLoading } = useInquiries({ limit: 5 })

  const currentSubLabel = !range.start ? 'All Time' : 
    `${range.start.toLocaleDateString('en-GB')} ${range.end ? '– ' + range.end.toLocaleDateString('en-GB') : ''}`

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 h-14 border-b border-[var(--border)] shrink-0 bg-[var(--bg-surface)]">
        <div>
          <h1 className="text-base font-semibold text-[var(--text-primary)]" style={{ fontFamily: 'Syne, sans-serif' }}>
            Dashboard
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Welcome back, {admin?.name}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <DateRangePicker value={range} onChange={setRange} />
          <Link to="/blogs/new" className="btn-primary text-xs py-1.5 px-3">
            <Plus size={13} /> New Blog
          </Link>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            icon={Users} 
            label="Total Leads" 
            value={stats?.leads} 
            sub={currentSubLabel} 
            loading={statsLoading} 
            bgClass="bg-blue-500/20 hover:bg-blue-500/30 transition-colors"
            accent="bg-blue-500/30 border-blue-500/40 text-blue-600"
          />
          <StatCard 
            icon={UserCheck} 
            label="Total Clients" 
            value={stats?.clients} 
            sub={currentSubLabel} 
            loading={statsLoading} 
            bgClass="bg-purple-500/20 hover:bg-purple-500/30 transition-colors"
            accent="bg-purple-500/30 border-purple-500/40 text-purple-600"
          />
          <div className="card p-5 relative overflow-hidden flex flex-col justify-center bg-amber-500/20 hover:bg-amber-500/30 transition-colors border-none shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 rounded-sm bg-amber-500/30 border border-amber-500/40 flex items-center justify-center">
                <Clock size={15} className="text-amber-600" />
              </div>
              <span className="section-label">Attendance</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1 text-center">
                <p className="text-xl font-bold text-emerald-600">{stats?.attendance?.present ?? 0}</p>
                <p className="text-[9px] uppercase tracking-tighter text-[var(--text-muted)] font-bold">Present</p>
              </div>
              <div className="w-px h-8 bg-amber-500/30" />
              <div className="flex-1 text-center">
                <p className="text-xl font-bold text-red-600">{stats?.attendance?.absent ?? 0}</p>
                <p className="text-[9px] uppercase tracking-tighter text-[var(--text-muted)] font-bold">Absent</p>
              </div>
              <div className="w-px h-8 bg-amber-500/30" />
              <div className="flex-1 text-center">
                <p className="text-xl font-bold text-amber-600">{stats?.attendance?.onBreak ?? 0}</p>
                <p className="text-[9px] uppercase tracking-tighter text-[var(--text-muted)] font-bold">Break</p>
              </div>
            </div>
          </div>
          <StatCard 
            icon={TrendingUp} 
            label="Total Revenue" 
            value={stats?.revenue} 
            sub={currentSubLabel} 
            loading={statsLoading} 
            isCurrency={true} 
            bgClass="bg-emerald-500/20 hover:bg-emerald-500/30 transition-colors"
            accent="bg-emerald-500/30 border-emerald-500/40 text-emerald-600"
          />
        </div>

        {/* Recent content panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* 12 Monthly Expense Chart */}
          <div className="card overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] shrink-0">
              <p className="text-xs font-semibold text-[var(--text-secondary)]" style={{ fontFamily: 'Syne, sans-serif' }}>12 Monthly Expense</p>
            </div>
            <div className="p-4 flex-1 min-h-[250px]">
              {statsLoading ? (
                <div className="w-full h-full space-y-3">{Array(4).fill(0).map((_,i) => <Skeleton key={i} className="h-8" />)}</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats?.monthlyRevenue || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'var(--text-muted)', fontSize: 11 }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'var(--text-muted)', fontSize: 11 }} 
                      tickFormatter={(val) => `₹${val}`}
                    />
                    <Tooltip 
                      cursor={{ fill: 'var(--bg-hover)' }}
                      contentStyle={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border)', borderRadius: '6px' }}
                      itemStyle={{ color: 'var(--text-primary)' }}
                      formatter={(val) => [`₹${val}`, 'Expense']}
                    />
                    <Bar dataKey="expense" radius={[4, 4, 0, 0]}>
                      {(stats?.monthlyRevenue || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.expense > entry.revenue ? '#ef4444' : '#f59e0b'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* 12 Monthly Revenue Chart */}
          <div className="card overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] shrink-0">
              <p className="text-xs font-semibold text-[var(--text-secondary)]" style={{ fontFamily: 'Syne, sans-serif' }}>12 Monthly Revenue</p>
            </div>
            <div className="p-4 flex-1 min-h-[250px]">
              {statsLoading ? (
                <div className="w-full h-full space-y-3">{Array(4).fill(0).map((_,i) => <Skeleton key={i} className="h-8" />)}</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats?.monthlyRevenue || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'var(--text-muted)', fontSize: 11 }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'var(--text-muted)', fontSize: 11 }} 
                      tickFormatter={(val) => `₹${val}`}
                    />
                    <Tooltip 
                      cursor={{ fill: 'var(--bg-hover)' }}
                      contentStyle={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border)', borderRadius: '6px' }}
                      itemStyle={{ color: 'var(--text-primary)' }}
                      formatter={(val) => [`₹${val}`, 'Revenue']}
                    />
                    <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="flex items-center gap-3 pt-2 border-t border-[var(--border)]">
          <span className="section-label">Quick actions</span>
          <Link to="/blogs/new" className="btn-ghost text-xs py-1.5 px-3"><Plus size={12} /> New blog post</Link>
          <Link to="/inquiries?status=new" className="btn-ghost text-xs py-1.5 px-3"><MessageSquare size={12} /> View new inquiries</Link>
          <Link to="/leads" className="btn-ghost text-xs py-1.5 px-3"><Users size={12} /> Manage leads</Link>
          <Link to="/clients" className="btn-ghost text-xs py-1.5 px-3"><Briefcase size={12} /> Manage clients</Link>
        </div>
      </div>
    </div>
  )
}

import { useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { Play, Pause, Square, CheckCircle } from 'lucide-react';

function formatDuration(ms) {
  if (!ms || ms < 0) return '00:00:00';
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function EmployeeDashboard({ admin }) {
  const { employee, isLoading: empLoading } = useEmployee(admin.id);
  const { attendance, isLoading: attLoading, mutate } = useAttendanceToday();
  const toast = useToast();
  
  const [activeWorkMs, setActiveWorkMs] = useState(0);

  useEffect(() => {
    if (!attendance) {
      setActiveWorkMs(0);
      return;
    }
    
    // Calculate initial work time
    let workMs = 0;
    if (attendance.status === "completed") {
      workMs = attendance.totalWorkMs;
    } else if (attendance.checkIn) {
      const now = new Date().getTime();
      const checkInTime = new Date(attendance.checkIn).getTime();
      let elapsed = now - checkInTime;
      
      let breakMs = 0;
      attendance.breaks.forEach(b => {
        if (b.end) {
          breakMs += b.durationMs || (new Date(b.end).getTime() - new Date(b.start).getTime());
        } else {
          // Currently on break
          breakMs += now - new Date(b.start).getTime();
        }
      });
      
      workMs = elapsed - breakMs;
    }
    
    setActiveWorkMs(workMs);
    
    if (attendance.status === "working") {
      const interval = setInterval(() => {
        setActiveWorkMs(prev => prev + 1000);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [attendance]);

  const handleAction = async (actionStr) => {
    try {
      const res = await attendanceApi.action({ action: actionStr });
      if (res.data.success) {
        toast.success(res.data.message || "Attendance updated");
        // Force immediate local update and revalidation
        mutate(res.data.data, { revalidate: true });
      }
    } catch (e) {
      const errorMsg = e.response?.data?.message || e.message || "Failed to update attendance";
      toast.error(errorMsg);
      console.error("Attendance Action Error:", e);
    }
  };

  if (empLoading || attLoading) {
    return (
      <div className="h-full flex items-center justify-center p-12">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="w-64 h-64 rounded-full" />
          <p className="text-xs text-[var(--text-muted)] animate-pulse">Loading shift data...</p>
        </div>
      </div>
    );
  }

  const status = attendance?.status || "not_started";
  const statusColors = {
    "not_started": "text-gray-500 bg-gray-500/10 border-gray-500/20",
    "working": "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    "on_break": "text-amber-500 bg-amber-500/10 border-amber-500/20",
    "completed": "text-blue-500 bg-blue-500/10 border-blue-500/20"
  };

  return (
    <div className="flex flex-col h-full bg-[var(--bg-base)]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 h-14 border-b border-[var(--border)] shrink-0 bg-[var(--bg-surface)]">
        <div>
          <h1 className="text-base font-semibold text-[var(--text-primary)]" style={{ fontFamily: 'Syne, sans-serif' }}>
            My Dashboard
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Attendance & Work Summary
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          {/* Employee Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card p-8 flex flex-col items-center text-center">
              {employee?.image ? (
                <img 
                  src={`/api/employees/${employee._id}/image`} 
                  alt={employee.name} 
                  className="w-32 h-32 rounded-full object-cover border-4 border-amber-500 shadow-xl shadow-amber-500/20 mb-6"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6 border-4 border-amber-500/20">
                  <UserCheck size={48} />
                </div>
              )}
              
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
                {employee?.name || admin.name}
              </h2>
              <p className="text-sm font-medium text-amber-500 mb-4 px-3 py-1 bg-amber-500/10 rounded-full">
                {employee?.designation || 'Employee'}
              </p>
              
              <div className="w-full pt-6 border-t border-[var(--border)] space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--text-muted)]">Employee ID</span>
                  <span className="font-mono text-[var(--text-primary)]">{employee?.userId}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--text-muted)]">Contact No</span>
                  <span className="text-[var(--text-primary)]">{employee?.contactNo || '—'}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--text-muted)]">Join Date</span>
                  <span className="text-[var(--text-primary)]">{employee?.joiningDate ? new Date(employee.joiningDate).toLocaleDateString('en-GB') : '—'}</span>
                </div>
              </div>
            </div>

            <Link to="/profile" className="btn-ghost w-full justify-center py-3 text-sm font-medium border border-[var(--border)]">
              View Full Profile <ArrowRight size={14} className="ml-2" />
            </Link>
          </div>

          {/* Attendance Punch Clock */}
          <div className="lg:col-span-2">
            <div className="card h-full flex flex-col">
              <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
                <h3 className="section-label flex items-center gap-2">
                  <Clock size={16} /> Work Timer
                </h3>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColors[status]}`}>
                  {status.replace('_', ' ')}
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="text-sm text-[var(--text-muted)] uppercase tracking-widest font-bold mb-2">Total Active Hours</div>
                <div className="text-7xl font-mono text-[var(--text-primary)] font-bold mb-10 tracking-tight" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {formatDuration(activeWorkMs)}
                </div>

                <div className="w-full max-w-md grid grid-cols-2 gap-4">
                  {status === "not_started" && (
                    <button 
                      onClick={() => handleAction("check-in")}
                      className="col-span-2 py-4 rounded-xl font-bold flex justify-center items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <Play size={20} fill="currentColor" /> Check In Now
                    </button>
                  )}

                  {(status === "working" || status === "on_break") && (
                    <>
                      {status === "working" ? (
                        <button 
                          onClick={() => handleAction("break-start")}
                          className="py-4 rounded-xl font-bold flex justify-center items-center gap-3 bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-0.5"
                        >
                          <Pause size={20} fill="currentColor" /> Take Break
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleAction("break-end")}
                          className="py-4 rounded-xl font-bold flex justify-center items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5"
                        >
                          <Play size={20} fill="currentColor" /> Break Off
                        </button>
                      )}
                      <button 
                        onClick={() => handleAction("check-out")}
                        className="py-4 rounded-xl font-bold flex justify-center items-center gap-3 bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5"
                      >
                        <Square size={20} fill="currentColor" /> Check Out
                      </button>
                    </>
                  )}

                  {status === "completed" && (
                    <div className="col-span-2 p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white mb-2">
                        <CheckCircle size={24} />
                      </div>
                      <p className="text-emerald-500 font-bold text-lg">Shift Completed</p>
                      <p className="text-xs text-[var(--text-muted)]">Great work today! Your time has been logged.</p>
                    </div>
                  )}
                </div>

                {attendance?.checkIn && (
                  <div className="mt-8 grid grid-cols-2 gap-8 w-full border-t border-[var(--border)] pt-8">
                    <div className="text-center">
                      <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1">Check In</p>
                      <p className="text-sm font-mono font-bold text-[var(--text-primary)]">
                        {new Date(attendance.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1">Status</p>
                      <p className={`text-sm font-bold capitalize ${status === 'working' ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {status.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, MessageSquare, TrendingUp, Eye, Plus, ArrowRight, Clock, Users, UserCheck, Briefcase, Calendar } from 'lucide-react'
import { useBlogs, useInquiries, useDashboardStats } from '../hooks/useData'
import { useAuth } from '../context/AuthContext'
import { Skeleton, StatusBadge } from '../components/ui/index'
import { blogApi } from '../lib/api'

function StatCard({ icon: Icon, label, value, sub, accent, loading, isCurrency }) {
  return (
    <div className="card p-5 relative overflow-hidden">
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
      {sub && <p className="text-xs text-[var(--text-muted)] mt-1">{sub}</p>}
    </div>
  )
}

function RecentBlogRow({ blog }) {
  return (
    <Link to={'/blogs/' + blog._id + '/edit'}
      className="flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--bg-hover)] transition-colors group">
      <div className="w-8 h-8 rounded-sm bg-[var(--bg-elevated)] border border-[var(--border)] overflow-hidden shrink-0">
        {blog.image?.hasImage
          ? <img src={blogApi.imageUrl(blog._id)} alt="" className="w-full h-full object-cover" />
          : <FileText size={13} className="m-auto mt-2 text-[var(--text-muted)]" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[var(--text-primary)] truncate group-hover:text-amber-400 transition-colors">{blog.heading}</p>
        <p className="text-xs text-[var(--text-muted)]">{new Date(blog.createdAt).toLocaleDateString()}</p>
      </div>
      <StatusBadge status={blog.status} />
    </Link>
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
  const [dateRange, setDateRange] = useState('all') // 'today', '7d', '30d', 'all'
  
  const getParams = () => {
    const params = {}
    const now = new Date()
    if (dateRange === 'today') {
      params.startDate = new Date(now.setHours(0, 0, 0, 0)).toISOString()
    } else if (dateRange === '7d') {
      params.startDate = new Date(now.setDate(now.getDate() - 7)).toISOString()
    } else if (dateRange === '30d') {
      params.startDate = new Date(now.setDate(now.getDate() - 30)).toISOString()
    }
    return params
  }

  const { stats, isLoading: statsLoading } = useDashboardStats(getParams())
  const { blogs, isLoading: blogLoading } = useBlogs({ limit: 5 })
  const { inquiries, isLoading: inqLoading } = useInquiries({ limit: 5 })

  const rangeLabels = {
    today: 'Today',
    '7d': 'Last 7 Days',
    '30d': 'Last 30 Days',
    all: 'All Time'
  }

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
          <div className="flex items-center bg-[var(--bg-elevated)] border border-[var(--border)] rounded-md p-1">
            {Object.entries(rangeLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setDateRange(key)}
                className={`px-3 py-1 text-[10px] font-medium rounded transition-colors ${
                  dateRange === key 
                    ? 'bg-amber-500 text-black' 
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
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
            sub={rangeLabels[dateRange]} 
            loading={statsLoading} 
          />
          <StatCard 
            icon={UserCheck} 
            label="Total Clients" 
            value={stats?.clients} 
            sub={rangeLabels[dateRange]} 
            loading={statsLoading} 
          />
          <StatCard 
            icon={MessageSquare} 
            label="Total Enquiry" 
            value={stats?.inquiries} 
            sub={rangeLabels[dateRange]} 
            loading={statsLoading} 
          />
          <StatCard 
            icon={TrendingUp} 
            label="Total Revenue" 
            value={stats?.revenue} 
            sub={rangeLabels[dateRange]} 
            loading={statsLoading} 
            isCurrency={true} 
            accent="bg-emerald-500"
          />
        </div>

        {/* Recent content panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent blogs */}
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
              <p className="text-xs font-semibold text-[var(--text-secondary)]" style={{ fontFamily: 'Syne, sans-serif' }}>Recent Blogs</p>
              <Link to="/blogs" className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1">
                All blogs <ArrowRight size={11} />
              </Link>
            </div>
            {blogLoading
              ? <div className="p-4 space-y-3">{Array(4).fill(0).map((_,i) => <Skeleton key={i} className="h-8" />)}</div>
              : blogs.length === 0
                ? <p className="text-xs text-[var(--text-muted)] p-6 text-center">No blogs yet.</p>
                : blogs.slice(0, 5).map(b => <RecentBlogRow key={b._id} blog={b} />)
            }
          </div>

          {/* Recent inquiries */}
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
              <p className="text-xs font-semibold text-[var(--text-secondary)]" style={{ fontFamily: 'Syne, sans-serif' }}>Recent Inquiries</p>
              <Link to="/inquiries" className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1">
                All inquiries <ArrowRight size={11} />
              </Link>
            </div>
            {inqLoading
              ? <div className="p-4 space-y-3">{Array(4).fill(0).map((_,i) => <Skeleton key={i} className="h-8" />)}</div>
              : inquiries.length === 0
                ? <p className="text-xs text-[var(--text-muted)] p-6 text-center">No inquiries yet.</p>
                : inquiries.slice(0, 5).map(inq => <RecentInquiryRow key={inq._id} inq={inq} />)
            }
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

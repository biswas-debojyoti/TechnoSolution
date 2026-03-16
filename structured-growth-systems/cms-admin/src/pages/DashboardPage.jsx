import { Link } from 'react-router-dom'
import { FileText, MessageSquare, TrendingUp, Eye, Plus, ArrowRight, Clock } from 'lucide-react'
import { useBlogs, useInquiries, useInquiryStats } from '../hooks/useData'
import { useAuth } from '../context/AuthContext'
import { Skeleton, StatusBadge } from '../components/ui/index'
import { blogApi } from '../lib/api'

function StatCard({ icon: Icon, label, value, sub, accent, loading }) {
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
        : <p className="text-3xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'Syne, sans-serif' }}>{value ?? '—'}</p>
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
  const { blogs, pagination: blogPag, isLoading: blogLoading } = useBlogs({ limit: 5 })
  const { inquiries, pagination: inqPag, isLoading: inqLoading } = useInquiries({ limit: 5 })
  const { stats, isLoading: statsLoading } = useInquiryStats()

  const publishedCount = blogs.filter(b => b.status === 'published').length

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
        <Link to="/blogs/new" className="btn-primary text-xs py-1.5 px-3">
          <Plus size={13} /> New Blog
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard icon={FileText}     label="Total Blogs"   value={blogPag?.total} sub="all time"        loading={blogLoading} />
          <StatCard icon={Eye}          label="Published"     value={blogPag ? blogs.filter(b=>b.status==='published').length : null} sub="visible to public" loading={blogLoading} />
          <StatCard icon={MessageSquare} label="Inquiries"    value={inqPag?.total}  sub="all time"        loading={inqLoading} />
          <StatCard icon={TrendingUp}   label="New"           value={stats?.new}     sub="awaiting action" loading={statsLoading} accent="bg-amber-500" />
        </div>

        {/* Inquiry status row */}
        {!statsLoading && stats && (
          <div className="grid grid-cols-3 gap-3">
            {[['new','amber'],['contacted','blue'],['closed','surface']].map(([s, c]) => (
              <div key={s} className="card p-4 flex items-center gap-3">
                <div className={'w-2 h-2 rounded-full ' + (c==='amber' ? 'bg-amber-400' : c==='blue' ? 'bg-blue-400' : 'bg-[var(--text-muted)]')} />
                <span className="section-label capitalize">{s}</span>
                <span className="ml-auto font-mono text-sm text-[var(--text-primary)]">{stats[s] ?? 0}</span>
              </div>
            ))}
          </div>
        )}

        {/* Recent content panels */}
        <div className="grid grid-cols-2 gap-4">
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
        </div>
      </div>
    </div>
  )
}

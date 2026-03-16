import { FileText, MessageSquare, Eye, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useBlogs } from '../../hooks/useData'
import { useInquiries, useInquiryStats } from '../../hooks/useData'
import { StatsCard, LoadingState, ErrorState } from '../ui'
import { formatDistanceToNow } from 'date-fns'

export default function Dashboard() {
  const { blogs, pagination: bp, isLoading: bLoading } = useBlogs({ limit: 5 })
  const { inquiries, pagination: ip, isLoading: iLoading } = useInquiries({ limit: 5, status: 'new' })
  const { stats, isLoading: sLoading } = useInquiryStats()

  const publishedCount = blogs.filter ? undefined : 0

  return (
    <div className="space-y-6 page-enter">
      {/* Heading */}
      <div>
        <h2 className="font-display text-2xl font-bold text-cream">Overview</h2>
        <p className="text-ink-500 text-sm mt-1">Your content at a glance</p>
      </div>

      {/* Stats */}
      {sLoading || bLoading ? (
        <LoadingState text="Loading stats..." />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard label="Total Blogs" value={bp?.total ?? '—'} icon={FileText} color="amber" />
          <StatsCard label="Total Inquiries" value={stats?.total ?? '—'} icon={MessageSquare} color="info" />
          <StatsCard label="New Inquiries" value={stats?.new ?? '—'} icon={TrendingUp} color="success" />
          <StatsCard label="Closed" value={stats?.closed ?? '—'} icon={Eye} color="muted" />
        </div>
      )}

      {/* Two-column lower section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Blogs */}
        <div className="card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-ink-700">
            <h3 className="font-display font-semibold text-cream">Recent Blogs</h3>
            <Link to="/blogs" className="text-amber text-xs font-mono hover:underline">View all →</Link>
          </div>
          {bLoading ? <LoadingState /> : blogs.length === 0 ? (
            <div className="py-12 text-center text-ink-500 text-sm">No blogs yet</div>
          ) : (
            <ul className="divide-y divide-ink-800">
              {blogs.slice(0, 5).map((blog) => (
                <li key={blog._id} className="px-5 py-3 flex items-start justify-between gap-3 hover:bg-ink-800/40 transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm text-ink-100 font-medium truncate">{blog.heading}</p>
                    <p className="text-xs text-ink-500 font-mono mt-0.5">
                      {blog.createdAt ? formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true }) : '—'}
                    </p>
                  </div>
                  <span className={`badge-${blog.status} badge flex-shrink-0`}>{blog.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* New Inquiries */}
        <div className="card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-ink-700">
            <h3 className="font-display font-semibold text-cream">New Inquiries</h3>
            <Link to="/inquiries" className="text-amber text-xs font-mono hover:underline">View all →</Link>
          </div>
          {iLoading ? <LoadingState /> : inquiries.length === 0 ? (
            <div className="py-12 text-center text-ink-500 text-sm">No new inquiries</div>
          ) : (
            <ul className="divide-y divide-ink-800">
              {inquiries.slice(0, 5).map((inq) => (
                <li key={inq._id} className="px-5 py-3 hover:bg-ink-800/40 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm text-ink-100 font-medium truncate">{inq.name}</p>
                      <p className="text-xs text-ink-500 font-mono truncate">{inq.email}</p>
                    </div>
                    <span className="badge-new badge flex-shrink-0">new</span>
                  </div>
                  <p className="text-xs text-ink-500 mt-1 line-clamp-1">{inq.message}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Inquiry status breakdown */}
      {!sLoading && stats && (
        <div className="card p-5">
          <h3 className="font-display font-semibold text-cream mb-4">Inquiry Pipeline</h3>
          <div className="space-y-3">
            {[
              { key: 'new', label: 'New', color: 'bg-amber' },
              { key: 'contacted', label: 'Contacted', color: 'bg-info' },
              { key: 'closed', label: 'Closed', color: 'bg-ink-600' },
            ].map(({ key, label, color }) => {
              const count = stats[key] || 0
              const pct = stats.total ? Math.round((count / stats.total) * 100) : 0
              return (
                <div key={key}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-ink-400 font-mono">{label}</span>
                    <span className="text-ink-300 font-mono">{count} ({pct}%)</span>
                  </div>
                  <div className="h-1.5 bg-ink-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${color} rounded-full transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Pencil, Trash2, FileText, Image, Star } from 'lucide-react'
import { useBlogs, useDeleteBlog } from '../../hooks/useData'
import { api } from '../../lib/api'
import {
  LoadingState, ErrorState, EmptyState,
  Pagination, SearchInput, Select,
  ConfirmDialog
} from '../ui'
import toast from 'react-hot-toast'
import { formatDistanceToNow } from 'date-fns'

export default function BlogList() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  const { blogs, pagination, isLoading, isError, mutate } = useBlogs({
    page, search, status: statusFilter, limit: 10
  })
  const { trigger: deleteBlog, isMutating: deleting } = useDeleteBlog()

  const handleSearch = (val) => { setSearch(val); setPage(1) }
  const handleStatus = (val) => { setStatusFilter(val); setPage(1) }

  const confirmDelete = async () => {
    try {
      await deleteBlog(deleteTarget._id)
      toast.success('Blog deleted')
      mutate()
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Delete failed')
    } finally {
      setDeleteTarget(null)
    }
  }

  const handleToggleFeatured = async (blog) => {
    try {
      const fd = new FormData();
      fd.append('isFeatured', !blog.isFeatured);
      await api.put(`/blogs/${blog._id}`, fd);
      toast.success(!blog.isFeatured ? 'Blog marked as featured' : 'Blog unmarked as featured');
      mutate();
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to update featured status');
    }
  }

  return (
    <div className="space-y-5 page-enter">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-cream">Blogs</h2>
          <p className="text-ink-500 text-sm mt-1">Manage your published content</p>
        </div>
        <Link to="/blogs/new" className="btn-primary btn flex-shrink-0">
          <Plus className="w-4 h-4" /> New Blog
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchInput value={search} onChange={handleSearch} placeholder="Search by title…" />
        </div>
        <div className="w-full sm:w-44">
          <Select
            value={statusFilter}
            onChange={handleStatus}
            placeholder="All statuses"
            options={[
              { value: 'published', label: 'Published' },
              { value: 'draft', label: 'Draft' },
            ]}
          />
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {isLoading ? <LoadingState /> : isError ? (
          <ErrorState message="Failed to load blogs" onRetry={mutate} />
        ) : blogs.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No blogs found"
            subtitle={search || statusFilter ? 'Try adjusting your filters' : 'Create your first blog post'}
            action={
              !search && !statusFilter && (
                <Link to="/blogs/new" className="btn-primary btn mt-2">
                  <Plus className="w-4 h-4" /> Create Blog
                </Link>
              )
            }
          />
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-ink-700 bg-ink-800/50">
                  <tr>
                    <th className="th">Title</th>
                    <th className="th">Status</th>
                    <th className="th text-center">Featured</th>
                    <th className="th">Image</th>
                    <th className="th">Created</th>
                    <th className="th text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog._id} className="table-row">
                      <td className="td max-w-xs">
                        <p className="font-medium text-cream truncate">{blog.heading}</p>
                        {blog.subHeading && (
                          <p className="text-xs text-ink-500 truncate mt-0.5">{blog.subHeading}</p>
                        )}
                      </td>
                      <td className="td">
                        <span className={`badge-${blog.status} badge`}>{blog.status}</span>
                      </td>
                      <td className="td text-center">
                        <button 
                          onClick={() => handleToggleFeatured(blog)}
                          className={`btn-icon btn-sm mx-auto ${blog.isFeatured ? 'text-amber hover:text-amber/80' : 'text-ink-600 hover:text-amber/60'}`}
                          title={blog.isFeatured ? "Unmark Featured" : "Mark as Featured"}
                        >
                          <Star className={`w-4 h-4 ${blog.isFeatured ? 'fill-current' : ''}`} />
                        </button>
                      </td>
                      <td className="td">
                        {blog.image?.hasImage ? (
                          <span className="flex items-center gap-1 text-xs text-success">
                            <Image className="w-3.5 h-3.5" /> Yes
                          </span>
                        ) : (
                          <span className="text-xs text-ink-600">—</span>
                        )}
                      </td>
                      <td className="td text-ink-400 font-mono text-xs">
                        {blog.createdAt ? formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true }) : '—'}
                      </td>
                      <td className="td">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => navigate(`/blogs/${blog._id}/edit`)}
                            className="btn-icon btn-ghost btn-sm"
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(blog)}
                            className="btn-icon btn-sm bg-transparent text-danger/60 hover:bg-danger/10 hover:text-danger border border-transparent hover:border-danger/30"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-ink-800">
              {blogs.map((blog) => (
                <div key={blog._id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-cream truncate">{blog.heading}</p>
                      <p className="text-xs text-ink-500 font-mono mt-1">
                        {blog.createdAt ? formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true }) : '—'}
                      </p>
                    </div>
                    <span className={`badge-${blog.status} badge flex-shrink-0`}>{blog.status}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <button 
                      onClick={() => handleToggleFeatured(blog)} 
                      className={`btn-ghost btn btn-sm ${blog.isFeatured ? 'text-amber bg-amber/10' : 'text-ink-500'}`}
                    >
                      <Star className={`w-3.5 h-3.5 ${blog.isFeatured ? 'fill-current' : ''}`} /> 
                      {blog.isFeatured ? 'Featured' : 'Feature'}
                    </button>
                    <button onClick={() => navigate(`/blogs/${blog._id}/edit`)} className="btn-ghost btn btn-sm">
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button onClick={() => setDeleteTarget(blog)} className="btn-danger btn btn-sm">
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Pagination pagination={pagination} onPage={setPage} />
          </>
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        loading={deleting}
        title="Delete Blog"
        message={`Are you sure you want to delete "${deleteTarget?.heading}"? This action cannot be undone.`}
      />
    </div>
  )
}

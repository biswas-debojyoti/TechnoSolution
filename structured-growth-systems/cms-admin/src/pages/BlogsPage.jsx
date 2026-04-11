import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, FileText, Pencil, Trash2, ImageOff } from "lucide-react";
import { useBlogs } from "../hooks/useData";
import { blogApi } from "../lib/api";
import { useToast } from "../context/ToastContext";
import {
  PageShell,
  TableSkeleton,
  Empty,
  StatusBadge,
  ConfirmModal,
  Pagination,
  SearchInput,
  SelectFilter,
} from "../components/ui/index";
const baseUrl = import.meta.env.VITE_API_URL;
function BlogImage({ blog }) {
  if (!blog.imageUrl)
    return (
      <div className="w-9 h-9 rounded-sm bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center shrink-0">
        <ImageOff size={12} className="text-[var(--text-muted)]" />
      </div>
    );
  return (
    <img
      src={baseUrl + blog.imageUrl}
      alt={blog.heading}
      className="w-9 h-9 rounded-sm object-cover shrink-0 border border-[var(--border)]"
    />
  );
}

export default function BlogsPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const { blogs, pagination, isLoading, mutate } = useBlogs({
    page,
    limit: 15,
    ...(search && { search }),
    ...(status && { status }),
  });

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await blogApi.delete(deleteTarget._id);
      toast.success("Blog deleted.");
      mutate();
      setDeleteTarget(null);
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to delete blog.");
    } finally {
      setDeleting(false);
    }
  };

  const handleSearch = (val) => {
    setSearch(val);
    setPage(1);
  };
  const handleStatus = (val) => {
    setStatus(val);
    setPage(1);
  };

  return (
    <PageShell
      title="Blogs"
      subtitle={pagination ? `${pagination.total} total` : ""}
      actions={
        <>
          <SearchInput
            value={search}
            onChange={handleSearch}
            placeholder="Search blogs…"
          />
          <SelectFilter
            value={status}
            onChange={handleStatus}
            placeholder="All status"
            options={[
              { value: "published", label: "Published" },
              { value: "draft", label: "Draft" },
            ]}
          />
          <Link to="/blogs/new" className="btn-primary text-xs py-1.5 px-3">
            <Plus size={13} /> New Blog
          </Link>
        </>
      }
    >
      <div className="card m-4 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--bg-elevated)]">
              {["Post", "Sub-heading", "Status", "Created", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-2.5 section-label font-normal"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton rows={8} cols={5} />
            ) : blogs.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <Empty
                    icon={FileText}
                    message={
                      search || status
                        ? "No blogs match your filters."
                        : "No blog posts yet."
                    }
                    action={
                      <Link to="/blogs/new" className="btn-primary text-xs">
                        Create first post
                      </Link>
                    }
                  />
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="border-b border-[var(--border)] hover:bg-[var(--bg-hover)] transition-colors"
                >
                  {/* Title + image */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <BlogImage blog={blog} />
                      <div className="min-w-0">
                        <p className="text-[var(--text-primary)] font-medium truncate max-w-[220px]">
                          {blog.heading}
                        </p>
                        <p className="text-xs text-[var(--text-muted)] font-mono">
                          {blog._id.slice(-6)}
                        </p>
                      </div>
                    </div>
                  </td>
                  {/* Subheading */}
                  <td className="px-4 py-3 text-[var(--text-secondary)] max-w-[180px]">
                    <span className="truncate block">
                      {blog.subHeading || "—"}
                    </span>
                  </td>
                  {/* Status */}
                  <td className="px-4 py-3">
                    <StatusBadge status={blog.status} />
                  </td>
                  {/* Created */}
                  <td className="px-4 py-3 text-[var(--text-muted)] font-mono text-xs whitespace-nowrap">
                    {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "2-digit",
                    })}
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          navigate("/blogs/" + blog.slug + "/edit")
                        }
                        className="p-1.5 rounded-sm text-[var(--text-muted)] hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
                        title="Edit"
                      >
                        <Pencil size={12} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(blog)}
                        className="p-1.5 rounded-sm text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Pagination pagination={pagination} onPageChange={setPage} />
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete blog post"
        message={`"${deleteTarget?.heading}" will be permanently deleted. This cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </PageShell>
  );
}

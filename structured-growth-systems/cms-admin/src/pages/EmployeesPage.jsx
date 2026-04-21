import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import { useEmployees } from "../hooks/useData";
import { employeeApi } from "../lib/api";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";
import {
  PageShell,
  TableSkeleton,
  Empty,
  ConfirmModal,
  Pagination,
  SearchInput,
  SelectFilter,
} from "../components/ui/index";

export default function EmployeesPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const { employees, pagination, isLoading, error, mutate } = useEmployees({
    page,
    limit: 10,
    ...(search && { search }),
    ...(status && { status }),
  });

  const toast = useToast();
  const { admin } = useAuth();

  const hasWriteAccess =
    ["admin", "superadmin"].includes(admin?.role) ||
    admin?.permissions?.includes("write");

  const toggleStatus = async (id, currentStatus) => {
    if (!hasWriteAccess) {
      toast.error("You do not have permission to change status.");
      return;
    }
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      await employeeApi.updateStatus(id, newStatus);
      toast.success(`Employee is now ${newStatus}`);
      mutate();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await employeeApi.delete(deleteTarget._id);
      toast.success("Employee deleted successfully");
      mutate();
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete employee");
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
      title="Employees"
      subtitle="Manage your employees and their system access"
      actions={
        <>
          <SearchInput
            value={search}
            onChange={handleSearch}
            placeholder="Search employees…"
          />
          <SelectFilter
            value={status}
            onChange={handleStatus}
            placeholder="All Status"
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
          />
          {hasWriteAccess && (
            <Link
              to="/employees/new"
              className="btn-primary text-xs py-1.5 px-3"
            >
              <Plus size={14} /> Add Employee
            </Link>
          )}
        </>
      }
    >
      <div className="card m-4 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border)] text-[var(--text-secondary)] uppercase text-[10px] tracking-wider font-mono">
              <tr>
                <th className="px-6 py-3 font-medium">Employee</th>
                <th className="px-6 py-3 font-medium">Contact</th>
                <th className="px-6 py-3 font-medium">Designation</th>
                <th className="px-6 py-3 font-medium">System Access</th>
                <th className="px-6 py-3 font-medium text-center">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {isLoading ? (
                <TableSkeleton rows={8} cols={6} />
              ) : employees.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    <Empty
                      icon={ImageIcon}
                      message={
                        search || status
                          ? "No employees match your filters."
                          : "No employees found."
                      }
                      action={
                        hasWriteAccess && (
                          <Link
                            to="/employees/new"
                            className="btn-primary text-xs"
                          >
                            Add first employee
                          </Link>
                        )
                      }
                    />
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr
                    key={emp._id}
                    className="hover:bg-[var(--bg-hover)] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[var(--bg-surface)] border border-[var(--border)] flex items-center justify-center overflow-hidden shrink-0">
                          {emp.image ? (
                            <img
                              src={employeeApi.imageUrl(emp._id)}
                              alt={emp.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon
                              size={16}
                              className="text-[var(--text-muted)]"
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-[var(--text-primary)]">
                            {emp.name}
                          </p>
                          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-tight">
                            Joined{" "}
                            {new Date(emp.joiningDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-[var(--text-primary)] text-xs">
                        {emp.contactNo}
                      </p>
                      <p className="text-[10px] text-[var(--text-muted)]">
                        {emp.whatsappNo || "—"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded-sm bg-[var(--bg-elevated)] border border-[var(--border)] text-[10px] text-[var(--text-secondary)]">
                        {emp.designation}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <p className="text-[10px] font-mono text-[var(--text-secondary)]">
                          {emp.userId}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {emp.permissions?.slice(0, 2).map((p) => (
                            <span
                              key={p}
                              className="px-1 py-0.5 rounded-sm bg-blue-500/5 text-blue-400 border border-blue-500/10 text-[9px] font-mono"
                            >
                              {p}
                            </span>
                          ))}
                          {emp.permissions?.length > 2 && (
                            <span className="text-[9px] text-[var(--text-muted)]">
                              +{emp.permissions.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => toggleStatus(emp._id, emp.status)}
                        disabled={!hasWriteAccess}
                        className={`toggle-switch ${
                          emp.status === "active"
                            ? "bg-amber-500"
                            : "bg-[var(--bg-elevated)]"
                        }`}
                        title={
                          emp.status === "active" ? "Deactivate" : "Activate"
                        }
                      >
                        <span
                          className={`toggle-switch-slider ${
                            emp.status === "active"
                              ? "translate-x-4"
                              : "translate-x-0"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {hasWriteAccess && (
                          <>
                            <button
                              onClick={() =>
                                navigate(`/employees/${emp._id}/edit`)
                              }
                              className="p-1.5 rounded-sm text-[var(--text-muted)] hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
                              title="Edit"
                            >
                              <Pencil size={13} />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(emp)}
                              className="p-1.5 rounded-sm text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={13} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination pagination={pagination} onPageChange={setPage} />
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Employee"
        message={`"${deleteTarget?.name}" will be permanently removed. Their system access will be revoked immediately.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </PageShell>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Check,
  X,
  Shield,
  Pencil,
  Image as ImageIcon,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { useEmployees } from "../hooks/useData";
import { employeeApi } from "../lib/api";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";

export default function EmployeesPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { employees, pagination, isLoading, error, mutate } = useEmployees({
    page,
    limit: 10,
  });
  const { showToast } = useToast();
  const { admin } = useAuth();

  // Ensure they have write permission. All internal Admins have write access. Employees only have it if specified.
  const hasWriteAccess =
    ["admin", "superadmin"].includes(admin?.role) ||
    admin?.permissions?.includes("write");

  const toggleStatus = async (id, currentStatus) => {
    if (!hasWriteAccess) {
      showToast("You do not have permission to change status.", "error");
      return;
    }
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      await employeeApi.updateStatus(id, newStatus);
      showToast(`Employee is now ${newStatus}`, "success");
      mutate();
    } catch (err) {
      showToast(
        err?.response?.data?.message || "Failed to update status",
        "error",
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-[var(--text-primary)]">
            Employees
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Manage your employees and their system access
          </p>
        </div>

        {hasWriteAccess && (
          <Link
            to="/employees/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-md transition-colors"
          >
            <Plus size={18} />
            <span>Add Employee</span>
          </Link>
        )}
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border)] text-[var(--text-secondary)] uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Employee</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Designation</th>
                <th className="px-6 py-4 font-medium">System Access</th>
                <th className="px-6 py-4 font-medium text-center">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
                      <span className="text-[var(--text-muted)]">
                        Fetching records...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : employees.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-[var(--text-muted)]"
                  >
                    No employees found.
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr
                    key={emp._id}
                    className="hover:bg-[var(--bg-elevated)]/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--bg-surface)] border border-[var(--border)] flex items-center justify-center overflow-hidden shrink-0">
                          {emp.image ? (
                            <img
                              src={employeeApi.imageUrl(emp._id)}
                              alt={emp.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon
                              size={18}
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
                      <p className="text-[var(--text-primary)]">
                        {emp.contactNo}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">
                        {emp.whatsappNo || "No WhatsApp"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border)] text-xs text-[var(--text-secondary)]">
                        {emp.designation}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <p className="text-xs font-mono text-[var(--text-secondary)]">
                          {emp.userId}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {emp.permissions?.map((p) => (
                            <span
                              key={p}
                              className="px-1.5 py-0.5 rounded bg-blue-500/5 text-blue-400 border border-blue-500/20 text-[9px] font-mono"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => toggleStatus(emp._id, emp.status)}
                        disabled={!hasWriteAccess}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                          emp.status === "active"
                            ? "bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20"
                            : "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {emp.status === "active" ? (
                          <Check size={12} />
                        ) : (
                          <X size={12} />
                        )}
                        <span className="capitalize">{emp.status}</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {hasWriteAccess && (
                          <button
                            onClick={() =>
                              navigate(`/employees/${emp._id}/edit`)
                            }
                            className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-amber-500 hover:bg-amber-500/10 transition-colors"
                            title="Edit Details"
                          >
                            <Pencil size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => toggleStatus(emp._id, emp.status)}
                          className={`p-1.5 rounded-md transition-colors ${
                            emp.status === "active"
                              ? "text-green-500"
                              : "text-[var(--text-muted)]"
                          } hover:bg-[var(--bg-hover)]`}
                          title={
                            emp.status === "active" ? "Deactivate" : "Activate"
                          }
                        >
                          {emp.status === "active" ? (
                            <ToggleRight size={20} />
                          ) : (
                            <ToggleLeft size={20} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {pagination && pagination.pages > 1 && (
          <div className="px-6 py-4 border-t border-[var(--border)] flex justify-between items-center bg-[var(--bg-elevated)]">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1.5 text-sm rounded-md border border-[var(--border)] disabled:opacity-50 hover:bg-[var(--bg-hover)]"
            >
              Previous
            </button>
            <span className="text-sm text-[var(--text-secondary)]">
              Page {page} of {pagination.pages}
            </span>
            <button
              disabled={page === pagination.pages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1.5 text-sm rounded-md border border-[var(--border)] disabled:opacity-50 hover:bg-[var(--bg-hover)]"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

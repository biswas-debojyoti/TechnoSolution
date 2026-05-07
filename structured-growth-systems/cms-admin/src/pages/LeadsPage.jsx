import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Pencil,
  Trash2,
  Users,
  Download,
  Filter,
  Calendar,
  ExternalLink,
  UserPlus
} from "lucide-react";
import { useLeads, useActiveEmployees } from "../hooks/useData";
import { leadApi } from "../lib/api";
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

const STATUS_OPTIONS = [
  { value: "New", label: "New" },
  { value: "Contacted", label: "Contacted" },
  { value: "Qualified", label: "Qualified" },
  { value: "Lost", label: "Lost" },
  { value: "Converted", label: "Converted" },
];

const SOURCE_OPTIONS = [
  { value: "Website", label: "Website" },
  { value: "Referral", label: "Referral" },
  { value: "Social Media", label: "Social Media" },
  { value: "Cold Call", label: "Cold Call" },
  { value: "Other", label: "Other" },
];

const SERVICE_OPTIONS = [
  { value: "website development", label: "Web Dev" },
  { value: "social media", label: "Social Media" },
  { value: "GMB", label: "GMB" },
  { value: "SEO", label: "SEO" },
  { value: "others", label: "Others" },
];

export default function LeadsPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [service, setService] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const { leads, pagination, isLoading, mutate } = useLeads({
    page,
    limit: 10,
    search,
    status,
    source,
    service,
    assignedTo,
    startDate,
    endDate,
  });

  const toast = useToast();
  const { admin } = useAuth();
  const { employees } = useActiveEmployees();

  const hasWriteAccess =
    ["admin", "superadmin"].includes(admin?.role) ||
    admin?.permissions?.includes("leads:write");

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await leadApi.updateStatus(id, newStatus);
      toast.success(`Status updated to ${newStatus}`);
      mutate();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await leadApi.delete(deleteTarget._id);
      toast.success("Lead deleted successfully");
      mutate();
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete lead");
    } finally {
      setDeleting(false);
    }
  };

  const handleExport = () => {
    const url = leadApi.exportUrl({ status, source, startDate, endDate, service, assignedTo });
    window.open(url, "_blank");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "New": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Contacted": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Qualified": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Lost": return "bg-red-500/10 text-red-400 border-red-500/20";
      case "Converted": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <PageShell
      title="Lead Management"
      subtitle="Track and manage potential customer inquiries"
      actions={
        <div className="flex items-center gap-2">
          <SearchInput
            value={search}
            onChange={(val) => { setSearch(val); setPage(1); }}
            placeholder="Search leads..."
          />
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
          >
            <Download size={14} /> Export
          </button>
          {hasWriteAccess && (
            <Link to="/leads/new" className="btn-primary text-xs py-1.5 px-3">
              <Plus size={14} /> Register Lead
            </Link>
          )}
          <Link to="/clients" className="btn-ghost text-xs py-1.5 px-3 flex items-center gap-1.5">
            <ExternalLink size={14} /> Clients
          </Link>
        </div>
      }
    >
      {/* Filters Bar */}
      <div className="px-6 py-3 border-b border-[var(--border)] bg-[var(--bg-surface)] flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter size={13} className="text-[var(--text-muted)]" />
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--text-muted)]">Filters:</span>
        </div>
        
        <SelectFilter
          value={status}
          onChange={(val) => { setStatus(val); setPage(1); }}
          placeholder="All Statuses"
          options={STATUS_OPTIONS}
        />

        <SelectFilter
          value={source}
          onChange={(val) => { setSource(val); setPage(1); }}
          placeholder="All Sources"
          options={SOURCE_OPTIONS}
        />

        <SelectFilter
          value={service}
          onChange={(val) => { setService(val); setPage(1); }}
          placeholder="All Services"
          options={SERVICE_OPTIONS}
        />

        <SelectFilter
          value={assignedTo}
          onChange={(val) => { setAssignedTo(val); setPage(1); }}
          placeholder="Follow up by"
          options={employees.map(e => ({ value: e._id, label: e.name }))}
        />

        <div className="flex items-center gap-2 ml-auto">
          <div className="flex items-center gap-1.5">
            <Calendar size={13} className="text-[var(--text-muted)]" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => { setStartDate(e.target.value); setPage(1); }}
              className="input-field h-8 text-xs px-2 w-32"
            />
          </div>
          <span className="text-[var(--text-muted)] text-xs">to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => { setEndDate(e.target.value); setPage(1); }}
            className="input-field h-8 text-xs px-2 w-32"
          />
          {(startDate || endDate || status || source || service || assignedTo || search) && (
            <button 
              onClick={() => { setStartDate(""); setEndDate(""); setStatus(""); setSource(""); setService(""); setAssignedTo(""); setSearch(""); setPage(1); }}
              className="text-[10px] text-amber-500 hover:underline px-2"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="card m-4 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border)] text-[var(--text-secondary)] uppercase text-[10px] tracking-wider font-mono">
              <tr>
                <th className="px-6 py-3 font-medium">Lead Info</th>
                <th className="px-6 py-3 font-medium">Contact</th>
                <th className="px-6 py-3 font-medium">Source</th>
                <th className="px-6 py-3 font-medium">Follow Up</th>
                <th className="px-6 py-3 font-medium">Budget</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {isLoading ? (
                <TableSkeleton rows={8} cols={7} />
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan="7">
                    <Empty
                      icon={Users}
                      message="No leads found matching your criteria."
                      action={hasWriteAccess && <Link to="/leads/new" className="btn-primary text-xs">Register your first lead</Link>}
                    />
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-[var(--bg-hover)] transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-[var(--text-primary)]">{lead.name}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-tight mr-1">
                            Added {new Date(lead.createdAt).toLocaleDateString('en-GB')}
                          </span>
                          {lead.services?.map((s, i) => (
                            <span key={i} className="px-1.5 py-0 rounded-[2px] bg-amber-500/5 text-amber-500/80 text-[8px] uppercase font-bold border border-amber-500/10 whitespace-nowrap">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-[var(--text-primary)] text-xs">{lead.phone}</p>
                      <p className="text-[10px] text-[var(--text-muted)] truncate max-w-[150px]">{lead.email || "No email"}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded-sm bg-[var(--bg-elevated)] border border-[var(--border)] text-[10px] text-[var(--text-secondary)]">
                        {lead.source}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex flex-col">
                         <span className="text-xs text-[var(--text-primary)] font-bold">{lead.assignedTo?.name || "Unassigned"}</span>
                         <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-tighter">Personnel</span>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-[var(--text-secondary)] font-mono">{lead.budget || "—"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateStatus(lead._id, e.target.value)}
                        disabled={!hasWriteAccess}
                        className={`text-[10px] font-bold px-2 py-1 rounded-sm border appearance-none cursor-pointer outline-none transition-all ${getStatusColor(lead.status)}`}
                      >
                        {STATUS_OPTIONS.map(opt => (
                          <option key={opt.value} value={opt.value} className="bg-[var(--bg-surface)] text-[var(--text-primary)] font-normal">{opt.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {hasWriteAccess && (
                          <>
                            <button
                              onClick={() => navigate(`/leads/${lead._id}/edit`)}
                              className="p-1.5 rounded-sm text-[var(--text-muted)] hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
                              title="Edit"
                            >
                              <Pencil size={13} />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(lead)}
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
        title="Delete Lead"
        message={`"${deleteTarget?.name}" will be removed from the pipeline. This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </PageShell>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Pencil,
  Trash2,
  Users,
  LayoutGrid,
  List,
  Search,
  Filter,
  ArrowRight,
  Briefcase,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { useClients } from "../hooks/useData";
import { clientApi } from "../lib/api";
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
  { value: "Active", label: "Active" },
  { value: "Completed", label: "Completed" },
  { value: "On Hold", label: "On Hold" },
];

const SERVICE_OPTIONS = [
  { value: "website development", label: "Web Dev" },
  { value: "social media", label: "Social Media" },
  { value: "GMB", label: "GMB" },
  { value: "SEO", label: "SEO" },
  { value: "others", label: "Others" },
];

export default function ClientsPage() {
  const navigate = useNavigate();
  const [view, setView] = useState("list"); // 'list' or 'grid'
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [service, setService] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const { clients, pagination, isLoading, mutate } = useClients({
    page,
    limit: view === "grid" ? 12 : 10,
    search,
    status,
    service,
  });

  const toast = useToast();
  const { admin } = useAuth();
  const hasWriteAccess = ["admin", "superadmin"].includes(admin?.role) || admin?.permissions?.includes("write");

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await clientApi.delete(deleteTarget._id);
      toast.success("Client record deleted successfully");
      mutate();
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete client");
    } finally {
      setDeleting(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active": return <CheckCircle size={14} className="text-emerald-500" />;
      case "Completed": return <Briefcase size={14} className="text-blue-500" />;
      case "On Hold": return <Clock size={14} className="text-amber-500" />;
      default: return <AlertCircle size={14} className="text-gray-500" />;
    }
  };

  return (
    <PageShell
      title="Client Management"
      subtitle="Manage your active clients and projects"
      actions={
        <div className="flex items-center gap-2">
          <SearchInput
            value={search}
            onChange={(val) => { setSearch(val); setPage(1); }}
            placeholder="Search clients..."
          />
          <div className="flex items-center bg-[var(--bg-elevated)] border border-[var(--border)] rounded-sm p-0.5">
            <button
              onClick={() => setView("list")}
              className={`p-1 rounded-sm transition-all ${view === "list" ? 'bg-amber-500 text-black' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}
              title="List View"
            >
              <List size={14} />
            </button>
            <button
              onClick={() => setView("grid")}
              className={`p-1 rounded-sm transition-all ${view === "grid" ? 'bg-amber-500 text-black' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}
              title="Grid View"
            >
              <LayoutGrid size={14} />
            </button>
          </div>
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
          value={service}
          onChange={(val) => { setService(val); setPage(1); }}
          placeholder="All Services"
          options={SERVICE_OPTIONS}
        />

        {(status || service || search) && (
          <button 
            onClick={() => { setStatus(""); setService(""); setSearch(""); setPage(1); }}
            className="text-[10px] text-amber-500 hover:underline px-2 ml-auto"
          >
            Reset Filters
          </button>
        )}
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        {isLoading ? (
          view === "list" ? (
            <div className="card overflow-hidden">
              <TableSkeleton rows={8} cols={5} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="card h-40 animate-pulse bg-[var(--bg-elevated)]/50" />
              ))}
            </div>
          )
        ) : clients.length === 0 ? (
          <Empty
            icon={Briefcase}
            message="No clients found. Leads marked as 'Converted' will appear here."
          />
        ) : view === "list" ? (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[var(--bg-elevated)] border-b border-[var(--border)] text-[var(--text-secondary)] uppercase text-[10px] tracking-wider font-mono">
                  <tr>
                    <th className="px-6 py-3 font-medium text-left">Client Info</th>
                    <th className="px-6 py-3 font-medium text-left">Services</th>
                    <th className="px-6 py-3 font-medium text-left">Source</th>
                    <th className="px-6 py-3 font-medium text-left">Status</th>
                    <th className="px-6 py-3 font-medium text-right">Project Value</th>
                    <th className="px-6 py-3 font-medium text-right">Balance Due</th>
                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {clients.map((client) => (
                    <tr key={client._id} className="hover:bg-[var(--bg-hover)] transition-colors group">
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => navigate(`/clients/${client._id}`)}
                          className="flex items-center gap-3 text-left hover:opacity-80 transition-opacity"
                        >
                          <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold text-xs uppercase">
                            {client.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-[var(--text-primary)]">{client.name}</p>
                            <p className="text-[10px] text-[var(--text-muted)] truncate max-w-[150px]">{client.email || client.phone}</p>
                          </div>
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                          {client.services?.map((s, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-[2px] bg-amber-500/5 text-amber-500/90 text-[9px] uppercase font-bold border border-amber-500/20 whitespace-nowrap">
                              {s}
                            </span>
                          ))}
                          {(!client.services || client.services.length === 0) && (
                            <span className="text-[10px] text-[var(--text-muted)] italic">No services</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-[var(--text-secondary)]">{client.source || "Direct"}</span>
                      </td>
                       <td className="px-6 py-4">
                         <div className="flex items-center gap-1.5">
                           {getStatusIcon(client.status)}
                           <span className="text-xs text-[var(--text-primary)]">{client.status}</span>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-bold text-[var(--text-primary)] font-mono">
                          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(client.totalValue || 0)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {(() => {
                           const paid = client.payments?.reduce((acc, p) => acc + (p.amount || 0), 0) || 0;
                           const balance = (client.totalValue || 0) - paid;
                           return (
                             <span className={`text-sm font-bold font-mono ${balance > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                               {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(balance)}
                             </span>
                           );
                        })()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => navigate(`/clients/${client._id}/edit`)}
                            className="p-1.5 rounded-sm text-[var(--text-muted)] hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(client)}
                            className="p-1.5 rounded-sm text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination pagination={pagination} onPageChange={setPage} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {clients.map((client) => (
                <div key={client._id} className="card group hover:border-amber-500/50 transition-all p-4 flex flex-col space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-lg bg-amber-500 group-hover:rotate-3 transition-transform flex items-center justify-center text-black font-bold text-lg uppercase">
                      {client.name.charAt(0)}
                    </div>
                    <div className="flex flex-col items-end">
                      <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${
                        client.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                        client.status === 'Completed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                        'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      }`}>
                        {client.status}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-display font-700 text-base text-[var(--text-primary)] leading-tight">{client.name}</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1 truncate">{client.email || client.phone}</p>
                  </div>

                  <div className="flex-1 flex flex-wrap gap-1.5 content-start min-h-[40px]">
                    {client.services?.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 text-[10px] text-[var(--text-secondary)] capitalize italic">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                    <div>
                      {(() => {
                         const paid = client.payments?.reduce((acc, p) => acc + (p.amount || 0), 0) || 0;
                         const balance = (client.totalValue || 0) - paid;
                         return (
                           <>
                             <p className="text-[9px] uppercase text-[var(--text-muted)] font-bold tracking-tighter">
                               {balance > 0 ? "Balance Due" : "Fully Paid"}
                             </p>
                             <p className={`text-xs font-bold font-mono ${balance > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                               {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(balance)}
                             </p>
                           </>
                         );
                      })()}
                    </div>
                    <button 
                      onClick={() => navigate(`/clients/${client._id}`)}
                      className="p-2 rounded-full bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-black transition-all"
                    >
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Pagination pagination={pagination} onPageChange={setPage} />
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Remove Client"
        message={`Are you sure you want to remove "${deleteTarget?.name}"? This record will be archived.`}
        confirmLabel="Remove"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </PageShell>
  );
}

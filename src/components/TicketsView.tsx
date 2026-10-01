import React, { useState } from 'react';
import { 
  FileText, 
  Package, 
  Search,
  Plus,
  CheckCircle2,
  Lock,
  X,
  Building2,
  Clock,
  DollarSign,
  ArrowRight
} from 'lucide-react';
import { MaintenanceTicket, InventoryItem } from '../types';
import { INVENTORY_PARTS } from '../data/mockData';
import { soundEngine } from '../utils/soundEngine';

interface TicketsViewProps {
  tickets: MaintenanceTicket[];
  onCreateTicket: (ticket: Partial<MaintenanceTicket>) => void;
  inventory?: InventoryItem[];
  onReservePart?: (partNumber: string) => void;
}

export const TicketsView: React.FC<TicketsViewProps> = ({
  tickets,
  onCreateTicket,
  inventory = INVENTORY_PARTS,
  onReservePart
}) => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'inventory'>('tickets');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newPriority, setNewPriority] = useState<'Critical' | 'High' | 'Medium' | 'Low'>('High');
  const [newErrorCode, setNewErrorCode] = useState<string>('E17');
  const [newRootCause, setNewRootCause] = useState<string>('Axial cooling fan flow restriction.');

  const filteredTickets = tickets.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.errorCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.reportedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredInventory = inventory.filter(i => 
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.warehouseLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onCreateTicket({
      title: newTitle,
      priority: newPriority,
      errorCode: newErrorCode,
      suspectedRootCause: newRootCause,
      reportedBy: 'Alex Rivera (Technician)'
    });

    setShowCreateModal(false);
    setNewTitle('');
    soundEngine.playSuccess();
  };

  return (
    <div className="flex flex-col h-full bg-[#050816] p-6 sm:p-8 gap-7 overflow-y-auto max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-5 border-b border-white/[0.08] pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Tickets & Bay Stockroom
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            CMMS Work Orders & High-Turn Spare Parts Inventory
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#0B1020] p-1 rounded-xl border border-white/[0.1]">
            <button
              onClick={() => setActiveTab('tickets')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'tickets'
                  ? 'bg-white/[0.12] text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Work Orders ({tickets.length})
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'inventory'
                  ? 'bg-white/[0.12] text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Bay Stockroom ({inventory.length})
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search work orders or parts..."
              className="bg-[#0B1020] border border-white/[0.1] rounded-2xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#22D3EE] w-64 transition-all"
            />
          </div>

          {activeTab === 'tickets' && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary py-2.5 px-5 rounded-xl text-xs font-extrabold flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Create Work Order</span>
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'tickets' ? (
        <div className="space-y-5">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="p-6 rounded-3xl bg-[#0B1020] border border-white/[0.1] space-y-4 shadow-xl"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.08] pb-4">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-xs font-mono font-extrabold text-[#22D3EE] bg-[#22D3EE]/15 px-3 py-1 rounded-lg border border-[#22D3EE]/30">
                      {ticket.id}
                    </span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-lg ${
                      ticket.priority === 'Critical' ? 'badge-red' : ticket.priority === 'High' ? 'badge-amber' : 'badge-neutral'
                    }`}>
                      {ticket.priority} Priority
                    </span>
                    <span className="text-xs font-mono text-slate-300 bg-white/[0.06] px-2.5 py-1 rounded-lg border border-white/[0.08]">
                      Fault Code: {ticket.errorCode}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-lg text-white">
                    {ticket.title}
                  </h3>
                </div>

                <div className="text-right text-xs font-mono text-slate-400">
                  <span className="font-medium">{ticket.createdAt}</span>
                  <div className="text-emerald-400 font-bold mt-1 text-sm flex items-center justify-end gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{ticket.status}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
                <div>
                  <span className="text-slate-400 font-semibold block mb-1.5 text-xs uppercase tracking-wider font-mono">
                    Root Cause & Diagnostic Log:
                  </span>
                  <p className="text-slate-200 leading-relaxed bg-[#111827] p-4 rounded-2xl border border-white/[0.06]">
                    {ticket.suspectedRootCause}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#111827] space-y-2 flex flex-col justify-between border border-white/[0.06]">
                  <div>
                    <span className="text-slate-400 font-semibold block mb-1.5 text-xs uppercase tracking-wider font-mono">
                      Allocated Spare Parts:
                    </span>
                    {ticket.partsRequired && ticket.partsRequired.length > 0 ? (
                      ticket.partsRequired.map((p, idx) => (
                        <div key={idx} className="flex justify-between text-slate-200 font-mono py-1 border-b border-white/[0.04] last:border-none">
                          <span className="font-semibold">{p.quantity}x {p.name} (#{p.partNumber})</span>
                          <span className="font-black text-amber-400">${p.estimatedCost.toFixed(2)}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-slate-500 italic">No spare parts allocated</span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 pt-2 border-t border-white/[0.06] flex justify-between font-mono">
                    <span>Logged by: {ticket.reportedBy}</span>
                    <span className="text-emerald-400 font-bold">Downtime Estimate: {ticket.estimatedDowntimeHours}h</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredInventory.map((item) => (
            <div
              key={item.partNumber}
              className="p-6 rounded-3xl bg-[#0B1020] border border-white/[0.1] space-y-4 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-[#22D3EE] bg-[#22D3EE]/15 px-3 py-1 rounded-lg border border-[#22D3EE]/30">
                    {item.partNumber}
                  </span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-lg ${
                    item.inStock > 0 ? 'text-emerald-400 bg-emerald-500/15 border border-emerald-500/30' : 'text-red-400 bg-red-500/15 border border-red-500/30'
                  }`}>
                    {item.inStock > 0 ? `${item.inStock} In Stock` : 'Out of Stock'}
                  </span>
                </div>

                <h3 className="font-bold text-base text-white">
                  {item.name}
                </h3>

                <div className="space-y-2 text-xs text-slate-300 bg-[#111827] p-4 rounded-2xl border border-white/[0.06]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Unit Cost:</span>
                    <span className="font-mono font-black text-amber-400 text-sm">${item.unitCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Warehouse Location:</span>
                    <span className="font-mono font-bold text-slate-200">{item.warehouseLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Reserved Units:</span>
                    <span className="font-mono font-bold text-slate-300">{item.reserved} units</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  soundEngine.playSuccess();
                  if (onReservePart) onReservePart(item.partNumber);
                }}
                disabled={item.inStock === 0}
                className="w-full py-3 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-40 disabled:cursor-not-allowed text-slate-100 text-xs font-extrabold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-white/[0.08]"
              >
                <Package className="w-4 h-4 text-[#22D3EE]" />
                <span>Reserve Component from Bay</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Manual Create Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-[#0B1020] border border-white/[0.15] rounded-3xl p-7 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-[#22D3EE]" />
                Log CMMS Work Order
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicketSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1.5 font-bold">Work Order Title:</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Line 3 VX-420 Axial Fan Replacement"
                  className="w-full bg-[#111827] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#22D3EE]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 block mb-1.5 font-bold">Priority Level:</label>
                  <select
                    value={newPriority}
                    onChange={(e: any) => setNewPriority(e.target.value)}
                    className="w-full bg-[#111827] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#22D3EE]"
                  >
                    <option value="Critical">Critical Priority</option>
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1.5 font-bold">Fault Code:</label>
                  <input
                    type="text"
                    value={newErrorCode}
                    onChange={(e) => setNewErrorCode(e.target.value)}
                    className="w-full bg-[#111827] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#22D3EE]"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1.5 font-bold">Diagnostic Summary:</label>
                <textarea
                  rows={3}
                  value={newRootCause}
                  onChange={(e) => setNewRootCause(e.target.value)}
                  className="w-full bg-[#111827] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#22D3EE]"
                />
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-xs font-bold text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary py-3 rounded-xl text-xs font-black justify-center cursor-pointer shadow-lg"
                >
                  Log Work Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Lock, 
  Clock, 
  ChevronRight, 
  X, 
  Play,
  FileCode,
  Wrench,
  Search,
  Package,
  FileText,
  Bell,
  Calendar,
  Sparkles,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { ActionStatus } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface AgentRow {
  id: string;
  name: string;
  label: string;
  status: ActionStatus;
  timestamp: string;
  detail: string;
  payload: Record<string, any>;
  requiresApproval: boolean;
}

export const AgentActionsView: React.FC<{
  onOpenSafetyModal: () => void;
}> = ({ onOpenSafetyModal }) => {
  const [selectedAction, setSelectedAction] = useState<AgentRow | null>(null);

  const pipelineStages = [
    { name: 'VISION', status: 'COMPLETED' },
    { name: 'UNDERSTAND', status: 'COMPLETED' },
    { name: 'RETRIEVE', status: 'COMPLETED' },
    { name: 'RECOMMEND', status: 'COMPLETED' },
    { name: 'PREPARE ACTION', status: 'COMPLETED' },
    { name: 'HUMAN APPROVAL', status: 'REQUIRES_APPROVAL' },
    { name: 'EXECUTE', status: 'WAITING' }
  ];

  const [actions] = useState<AgentRow[]>([
    {
      id: 'act-1',
      name: 'searchTechnicalManual',
      label: 'Search technical service manual',
      status: 'COMPLETED',
      timestamp: '10:33:02',
      detail: 'Retrieved Section 4.3 (Page 42) from VX-420 OEM manual with 96% relevance score.',
      payload: { query: 'E17 Motor Thermal Overload', model: 'VX-420', matchedPage: 42, documentRev: 'Rev 4.2B' },
      requiresApproval: false
    },
    {
      id: 'act-2',
      name: 'checkInventory',
      label: 'Query Bay stockroom inventory',
      status: 'COMPLETED',
      timestamp: '10:33:15',
      detail: 'Located 3 units of Part #VX-CF42 (Axial Fan) in Bay 4 Stockroom (Bin C-14).',
      payload: { partNumber: 'VX-CF42', inStock: 3, location: 'Bay 4 — Bin C-14', unitPriceUsd: 245.00 },
      requiresApproval: false
    },
    {
      id: 'act-3',
      name: 'createMaintenanceTicket',
      label: 'Draft CMMS maintenance work order',
      status: 'REQUIRES_APPROVAL',
      timestamp: '10:33:30',
      detail: 'Prepared high-priority corrective work order #TCK-2026-881 for Line 3 Bay B.',
      payload: { equipment: 'VX-420', priority: 'High', errorCode: 'E17', downtimeEstimate: '1.5h' },
      requiresApproval: true
    },
    {
      id: 'act-4',
      name: 'requestReplacementPart',
      label: 'Requisition replacement spare part',
      status: 'REQUIRES_APPROVAL',
      timestamp: '10:33:31',
      detail: 'Requisition Part #VX-CF42 ($245.00) from Bay 4 inventory stockroom.',
      payload: { partNumber: 'VX-CF42', quantity: 1, costUsd: 245.00, approvalGateRequired: true },
      requiresApproval: true
    },
    {
      id: 'act-5',
      name: 'notifySupervisor',
      label: 'Notify shift supervisor of pending authorization',
      status: 'COMPLETED',
      timestamp: '10:33:32',
      detail: 'Dispatched push notification to Shift Supervisor David K. with safety gate packet.',
      payload: { supervisor: 'David K.', alertLevel: 'Medium Risk', channel: 'Mobile Push & Web' },
      requiresApproval: false
    }
  ]);

  return (
    <div className="flex flex-col h-full bg-[#02040A] p-6 sm:p-8 gap-7 overflow-y-auto max-w-[1600px] mx-auto w-full">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-5 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Agent Action Center
            </h1>
            <span className="text-xs font-mono font-bold text-[#00E5FF] bg-[#00E5FF]/10 px-3 py-1 rounded-lg border border-[#00E5FF]/30">
              STATEFUL TOOL EXECUTION
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1 font-medium">
            Autonomous Pipeline Activity & Multi-Tool Orchestrations for Session #VX-2048
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#08111F] px-4 py-2 rounded-xl border border-white/10 text-xs font-mono">
          <span className="text-slate-400">Target Line:</span>
          <strong className="text-white">Line 3 · VX-420 Packaging Unit</strong>
        </div>
      </div>

      {/* Horizontal Agent Pipeline Visualizer */}
      <div className="p-6 rounded-2xl bg-[#050914] border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#00E5FF]">
            Autonomous Execution Sequence
          </div>
          <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30">
            PAUSED AT LEVEL 2 SAFETY GATE
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {pipelineStages.map((stage, idx) => {
            const isCompleted = stage.status === 'COMPLETED';
            const isApproval = stage.status === 'REQUIRES_APPROVAL';
            return (
              <React.Fragment key={idx}>
                <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border shrink-0 transition-all ${
                  isCompleted 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                    : isApproval
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 ring-2 ring-amber-500/20 animate-pulse'
                      : 'bg-white/5 border-white/10 text-slate-500'
                }`}>
                  {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  {isApproval && <Lock className="w-4 h-4 text-amber-400 shrink-0" />}
                  <span className="text-xs font-mono font-black tracking-wider whitespace-nowrap">
                    {stage.name}
                  </span>
                </div>
                {idx < pipelineStages.length - 1 && (
                  <ArrowRight className={`w-4 h-4 shrink-0 ${isCompleted ? 'text-emerald-500/60' : 'text-slate-700'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Action Pipeline Rows */}
      <div className="space-y-3.5">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
          Individual Tool Invocations
        </div>

        {actions.map((act) => {
          const isCompleted = act.status === 'COMPLETED';
          const isPending = act.status === 'REQUIRES_APPROVAL';

          return (
            <div
              key={act.id}
              onClick={() => {
                setSelectedAction(act);
                soundEngine.playMicOn();
              }}
              className="p-5 rounded-2xl bg-[#08111F] border border-white/[0.08] hover:border-[#00E5FF]/40 cursor-pointer flex items-center justify-between gap-5 transition-all shadow-lg hover:shadow-cyan-500/5 group"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="shrink-0">
                  {isCompleted && (
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  )}
                  {isPending && (
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-sm">
                      <Lock className="w-5 h-5 animate-pulse" />
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="text-base font-bold text-white group-hover:text-[#00E5FF] transition-colors truncate">
                    {act.label}
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    {act.name}() · {act.detail}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border ${
                    isCompleted 
                      ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' 
                      : 'text-amber-400 bg-amber-500/15 border-amber-500/40 animate-pulse'
                  }`}>
                    {isCompleted ? 'COMPLETED' : 'SAFETY GATE PAUSE'}
                  </span>
                  <div className="text-[11px] text-slate-500 font-mono mt-1">
                    {act.timestamp}
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Detail Modal */}
      {selectedAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg bg-[#050914] border border-white/15 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {selectedAction.label}
                </h3>
                <span className="text-xs text-[#00E5FF] font-mono">
                  {selectedAction.name}()
                </span>
              </div>
              <button
                onClick={() => setSelectedAction(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="p-4 rounded-2xl bg-[#08111F] text-slate-200 leading-relaxed border border-white/5">
                {selectedAction.detail}
              </div>

              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                  Execution Payload Parameters:
                </span>
                <pre className="p-4 rounded-2xl bg-[#02040A] font-mono text-xs text-slate-300 overflow-x-auto border border-white/10">
                  {JSON.stringify(selectedAction.payload, null, 2)}
                </pre>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              {selectedAction.requiresApproval && (
                <button
                  onClick={() => {
                    setSelectedAction(null);
                    onOpenSafetyModal();
                  }}
                  className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs tracking-wider uppercase transition-colors cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  Review Safety Gate Authorization
                </button>
              )}
              <button
                onClick={() => setSelectedAction(null)}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

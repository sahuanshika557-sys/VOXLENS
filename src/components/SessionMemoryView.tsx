import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Square, 
  CheckSquare, 
  RotateCcw,
  Copy,
  Check,
  History,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight
} from 'lucide-react';
import { SessionMemoryItem, TriedAction } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface SessionMemoryViewProps {
  memoryItems: SessionMemoryItem[];
  triedActions: TriedAction[];
  onToggleTriedAction: (id: string) => void;
  onResetSession: () => void;
}

export const SessionMemoryView: React.FC<SessionMemoryViewProps> = ({
  memoryItems,
  triedActions,
  onToggleTriedAction,
  onResetSession
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const cleanTimeline = [
    { time: '10:30:12', label: 'Session initialized', detail: 'Line 3 VX-420 packaging unit connected via optical HUD and SCADA bus.', icon: 'connect' },
    { time: '10:31:05', label: 'E17 fault detected', detail: 'Optical CV OCR detected 7-segment display reading E17 with 96% visual confidence.', icon: 'scan' },
    { time: '10:32:18', label: 'Equipment digital twin verified', detail: 'Model VX-420 recognized (S/N DEMO-420-0192) in Assembly Sector 4.', icon: 'equipment' },
    { time: '10:33:02', label: 'OEM manual evidence retrieved', detail: 'Rev 4.2B, Section 4.3 (Page 42) retrieved via semantic dense vector index with 96% relevance.', icon: 'rag' },
    { time: '10:34:10', label: 'Diagnostic checks recommended', detail: 'Technician instructed to check axial cooling shroud and TB-2 wiring.', icon: 'recommend' },
    { time: '10:35:00', label: 'Maintenance ticket drafted', detail: 'Work Order #TCK-2026-881 drafted with High priority for Line 3.', icon: 'ticket' },
    { time: '10:36:15', label: 'Human safety approval granted', detail: 'Technician Alex Rivera signed off on Part #VX-CF42 ($245.00) requisition.', icon: 'approval' },
    { time: '10:36:40', label: 'Part reserved in Bay 4', detail: '1 unit of Part #VX-CF42 reserved at Bin C-14 stockroom.', icon: 'part' }
  ];

  const handleCopy = () => {
    soundEngine.playSuccess();
    navigator.clipboard?.writeText(JSON.stringify({ 
      session: 'VX-2048', 
      equipment: 'VX-420 Packaging Unit', 
      timeline: cleanTimeline, 
      whatWeAlreadyTried: triedActions 
    }, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#050816] p-6 sm:p-8 gap-7 overflow-y-auto max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-5 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Session Memory Ledger
            </h1>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-lg border border-emerald-500/30">
              MEMORY UPDATED & DEDUPLICATED
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Session #VX-2048 · VX-420 High-Speed Packaging Unit (Line 3)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-bold text-slate-200 hover:text-white flex items-center gap-2 transition-colors cursor-pointer border border-white/[0.08]"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied JSON' : 'Export Session'}</span>
          </button>
          
          <button
            onClick={onResetSession}
            className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-bold text-slate-200 hover:text-white flex items-center gap-2 transition-colors cursor-pointer border border-white/[0.08]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Memory</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Repair Timeline */}
        <div className="lg:col-span-7 p-7 rounded-3xl bg-[#0B1020] border border-white/[0.1] space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2.5">
              <History className="w-5 h-5 text-[#22D3EE]" />
              <span>Multi-Turn Chronological Agent Ledger</span>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-lg">
              8 Synced Events
            </span>
          </div>

          <div className="space-y-6 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#22D3EE]/30">
            {cleanTimeline.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#22D3EE] ring-4 ring-[#22D3EE]/20 shadow-md" />
                <div className="flex items-baseline gap-3">
                  <span className="text-xs font-mono text-slate-400 font-bold bg-[#111827] px-2 py-0.5 rounded border border-white/[0.06]">{item.time}</span>
                  <span className="text-base font-extrabold text-white">{item.label}</span>
                </div>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What We Already Tried */}
        <div className="lg:col-span-5 p-7 rounded-3xl bg-[#0B1020] border border-white/[0.1] space-y-5 shadow-2xl h-fit">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>What We Already Tried</span>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
              Auto-Deduplicated
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Completed diagnostic checks are persisted in session state so the AI agent does not recommend redundant tests during subsequent turns.
          </p>

          <div className="space-y-3 pt-2">
            {[
              { id: '1', label: 'Error code E17 verified via optical CV', outcome: 'Passed' },
              { id: '2', label: 'Stator temperature measured (88.4°C)', outcome: 'Anomaly Found' },
              { id: '3', label: 'OEM Service manual retrieved (§4.3)', outcome: 'Passed' },
              { id: '4', label: 'Cooling airflow channel inspected (1.2 L/min)', outcome: 'Flow Restricted' },
              { id: '5', label: 'TB-2 terminal block screw torque checked', outcome: 'Passed (2.8 Nm)' }
            ].map((check) => (
              <div
                key={check.id}
                className="p-4 rounded-2xl bg-[#111827] flex items-center justify-between gap-3 text-sm text-slate-200 border border-white/[0.06] shadow-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="truncate font-medium">{check.label}</span>
                </div>
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg shrink-0 ${
                  check.outcome.includes('Anomaly') || check.outcome.includes('Restricted') ? 'badge-amber' : 'badge-emerald'
                }`}>
                  {check.outcome}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

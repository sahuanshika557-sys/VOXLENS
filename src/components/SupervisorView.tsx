import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  X, 
  Radio, 
  FileCheck,
  ShieldAlert,
  Sliders,
  DollarSign,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { SafetyGateRequest } from '../types';
import { SUPERVISOR_MACHINES } from '../data/mockData';
import { soundEngine } from '../utils/soundEngine';

interface SupervisorViewProps {
  safetyGate: SafetyGateRequest | null;
  onApproveSafetyGate: (id: string) => void;
  onRejectSafetyGate: (id: string, reason: string) => void;
  onOpenLiveRepair: () => void;
}

export const SupervisorView: React.FC<SupervisorViewProps> = ({
  safetyGate,
  onApproveSafetyGate,
  onRejectSafetyGate,
  onOpenLiveRepair
}) => {
  const [showFleetDetails, setShowFleetDetails] = useState<boolean>(false);
  const isGatePending = safetyGate && safetyGate.status === 'PENDING_APPROVAL';

  const machines = [
    { 
      id: 'm1', 
      name: 'VX-420 High-Speed Packaging Unit', 
      line: 'Line 3 — Assembly Sector 4', 
      status: isGatePending ? 'Approval Required' : 'Repair In Progress', 
      tech: 'Alex Rivera (Sr. Tech III)', 
      statusClass: isGatePending ? 'text-amber-400 bg-amber-500/15 border-amber-500/35' : 'text-emerald-400 bg-emerald-500/15 border-emerald-500/35',
      activeAlert: 'E17 Motor Thermal Overload (88.4°C)'
    },
    { 
      id: 'm2', 
      name: 'CR-800 Hydraulic Stamping Press', 
      line: 'Line 1 — Heavy Fabrication Bay A', 
      status: 'Operational', 
      tech: 'Elena Rostova (Tech II)', 
      statusClass: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/35',
      activeAlert: 'All Hydraulic Subsystems Nominal'
    },
    { 
      id: 'm3', 
      name: 'TR-9000 Turbo Gas Compressor', 
      line: 'Line 5 — Cryogenics Facility Yard', 
      status: 'Warning', 
      tech: 'Marcus Vance (Lead Tech)', 
      statusClass: 'text-amber-400 bg-amber-500/15 border-amber-500/35',
      activeAlert: 'P08 Intercooler DP Spike (1280 kPa)'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#050816] p-6 sm:p-8 gap-7 overflow-y-auto max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-5 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Supervisor Command Center
            </h1>
            <span className="text-xs font-mono font-bold text-[#22D3EE] bg-[#22D3EE]/15 px-3 py-1 rounded-lg border border-[#22D3EE]/30">
              PLANT 2 FLEET OVERSIGHT
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Real-Time Field Fleet Safety Gates, Requisitions & Shift Dispatch
          </p>
        </div>

        <button
          onClick={() => setShowFleetDetails(true)}
          className="px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-bold text-slate-200 hover:text-white transition-colors cursor-pointer border border-white/[0.08]"
        >
          View Fleet SLA Metrics
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-[#0B1020] border border-white/[0.1] shadow-xl space-y-2">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Pending Safety Approvals</span>
          <div className="text-4xl font-black font-mono text-amber-400">
            {isGatePending ? 1 : 0}
          </div>
          <span className="text-xs text-amber-400/80 font-mono block pt-1 border-t border-white/[0.04]">
            Action awaiting supervisor sign-off
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-[#0B1020] border border-white/[0.1] shadow-xl space-y-2">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Active Copilot Sessions</span>
          <div className="text-4xl font-black font-mono text-[#22D3EE]">
            2
          </div>
          <span className="text-xs text-[#22D3EE]/80 font-mono block pt-1 border-t border-white/[0.04]">
            Real-time multimodal telemetry linked
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-[#0B1020] border border-white/[0.1] shadow-xl space-y-2">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Open CMMS Work Orders</span>
          <div className="text-4xl font-black font-mono text-white">
            1
          </div>
          <span className="text-xs text-slate-400 font-mono block pt-1 border-t border-white/[0.04]">
            Assigned to field technician
          </span>
        </div>
      </div>

      {/* Pending Safety Gate Card */}
      {isGatePending && safetyGate && (
        <div className="p-7 rounded-3xl bg-[#0B1020] border-2 border-amber-500/50 space-y-5 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 flex items-center justify-center text-amber-400 border border-amber-500/30">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block font-mono">
                  LEVEL 2 SAFETY GATE AUTHORIZATION
                </span>
                <span className="text-lg font-extrabold text-white">
                  {safetyGate.title}
                </span>
              </div>
            </div>
            <span className="text-base font-mono font-black text-amber-400 bg-amber-500/20 px-4 py-1.5 rounded-xl border border-amber-500/40">
              ${safetyGate.financialImpactUsd.toFixed(2)} USD
            </span>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed bg-[#111827] p-5 rounded-2xl border border-white/[0.06]">
            {safetyGate.justification}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="text-xs text-slate-400 font-mono">
              Technician: <span className="text-slate-100 font-bold">Alex Rivera</span> · Machine: <span className="text-slate-100 font-bold">VX-420 (Line 3)</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  soundEngine.playAlert();
                  onRejectSafetyGate(safetyGate.id, 'Manual supervisor physical inspection requested.');
                }}
                className="px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 text-xs font-bold transition-colors cursor-pointer border border-white/[0.08]"
              >
                Reject Request
              </button>

              <button
                onClick={() => {
                  soundEngine.playSuccess();
                  onApproveSafetyGate(safetyGate.id);
                }}
                className="btn-primary py-3 px-7 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer shadow-xl"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Authorize Requisition ($245.00)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fleet Overview: 3 Machine Cards */}
      <div className="space-y-4">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
          Active Plant Fleet Subsystems
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {machines.map((m) => (
            <div
              key={m.id}
              onClick={onOpenLiveRepair}
              className="p-6 rounded-3xl bg-[#0B1020] border border-white/[0.1] hover:border-white/[0.25] cursor-pointer space-y-4 transition-all shadow-xl hover:scale-[1.01]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-base text-white">{m.name}</h3>
                  <span className="text-xs text-slate-400 font-mono mt-0.5 block">{m.line}</span>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-xl border ${m.statusClass}`}>
                  ● {m.status}
                </span>
              </div>

              <div className="text-xs text-slate-300 bg-[#111827] p-3 rounded-xl border border-white/[0.04]">
                <span className="text-slate-500 font-mono">Telemetry Status: </span>
                <span className="text-slate-200 font-medium">{m.activeAlert}</span>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Assigned: {m.tech}</span>
                <span className="text-[#22D3EE] flex items-center gap-1 font-bold">
                  Open Live HUD <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Fleet Analytics Modal */}
      {showFleetDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-[#0B1020] border border-white/[0.15] rounded-3xl p-7 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <h3 className="text-lg font-black text-white">
                Plant 2 Fleet Diagnostics & SLA
              </h3>
              <button
                onClick={() => setShowFleetDetails(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-[#111827]">
                <span className="text-slate-400 text-[11px] block font-bold">FIRST-TIME FIX RATE</span>
                <span className="text-emerald-400 text-xl font-black">92.4%</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#111827]">
                <span className="text-slate-400 text-[11px] block font-bold">AVG AGENT LATENCY</span>
                <span className="text-white text-xl font-black">420 ms</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#111827]">
                <span className="text-slate-400 text-[11px] block font-bold">SAFETY COMPLIANCE</span>
                <span className="text-[#22D3EE] text-xl font-black">100.0%</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#111827]">
                <span className="text-slate-400 text-[11px] block font-bold">PARTS ACCURACY</span>
                <span className="text-purple-400 text-xl font-black">99.1%</span>
              </div>
            </div>

            <button
              onClick={() => setShowFleetDetails(false)}
              className="w-full py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-xs font-bold text-white cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { PlayCircle, Ticket, Layers, ArrowRight, Boxes, CheckCircle, FileText } from 'lucide-react';

export const AgentScene: React.FC = () => {
  const steps = [
    { label: 'Identify', status: 'done' },
    { label: 'Read Fault', status: 'done' },
    { label: 'Retrieve RAG', status: 'done' },
    { label: 'Recommend', status: 'done' },
    { label: 'Prepare Ticket', status: 'active' },
    { label: 'Safety Gate', status: 'pending' },
    { label: 'Execute', status: 'pending' }
  ];

  return (
    <div className="flex flex-col items-center justify-center max-w-5xl mx-auto px-6 animate-fadeIn">
      {/* Scene Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-mono font-bold tracking-wider uppercase mb-4">
        <Layers className="w-3.5 h-3.5" />
        <span>AUTONOMOUS AGENT ORCHESTRATION</span>
      </div>

      {/* Main Headline */}
      <h2 className="text-4xl sm:text-6xl font-black text-white text-center leading-tight mb-4 tracking-tight">
        DON'T STOP AT <span className="text-[#00F0FF]">ANSWERS.</span>
      </h2>

      <p className="text-base sm:text-xl text-slate-300 text-center max-w-3xl mb-6">
        VoxLens autonomously stages maintenance tickets, inspects stockroom inventory, and prepares dispatch payloads.
      </p>

      {/* 7-Step Horizontal Pipeline */}
      <div className="w-full max-w-4xl p-4 rounded-2xl bg-[#0B1020] border border-white/[0.1] mb-6 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[650px] gap-2">
          {steps.map((s, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs transition-all ${
                    s.status === 'done'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : s.status === 'active'
                      ? 'bg-[#00F0FF] text-black font-black border border-[#00F0FF] shadow-lg shadow-[#00F0FF]/30 scale-110 animate-pulse'
                      : 'bg-white/[0.04] text-slate-500 border border-white/[0.08]'
                  }`}
                >
                  {s.status === 'done' ? '✓' : `0${idx + 1}`}
                </div>
                <span className={`text-[11px] font-mono whitespace-nowrap ${s.status === 'active' ? 'text-[#00F0FF] font-bold' : 'text-slate-400'}`}>
                  {s.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className="h-0.5 flex-1 bg-gradient-to-r from-emerald-500/40 to-[#00F0FF]/40 mb-5" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Staged Actions Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
        {/* CMMS Ticket Action */}
        <div className="p-5 rounded-2xl bg-[#0B1020] border border-[#00F0FF]/30 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#00F0FF]/15 text-[#00F0FF] flex items-center justify-center">
                <Ticket className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400">ACTION STAGED</div>
                <div className="text-sm font-bold text-white">Create CMMS Work Order</div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 rounded">
              #TCK-2026-881
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Auto-populated with E17 fault telemetry, thermal camera log, and OEM manual citation §4.3.
          </p>
        </div>

        {/* Inventory Stock Check */}
        <div className="p-5 rounded-2xl bg-[#0B1020] border border-emerald-500/30 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <Boxes className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400">INVENTORY QUERY</div>
                <div className="text-sm font-bold text-white">Part #VX-CF42 (Fan)</div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
              3 AVAILABLE
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Located in Bay 4 Stockroom (Shelf B2). Reserved pending financial authorization.
          </p>
        </div>
      </div>
    </div>
  );
};

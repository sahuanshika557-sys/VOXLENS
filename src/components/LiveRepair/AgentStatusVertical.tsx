import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Layers, 
  Lock, 
  ArrowRight,
  ShieldAlert,
  Boxes,
  Ticket
} from 'lucide-react';
import { AgentPlanStep, SafetyGateRequest } from '../../types';

interface AgentStatusVerticalProps {
  planSteps: AgentPlanStep[];
  safetyGate: SafetyGateRequest | null;
  onOpenSafetyModal: () => void;
  onOpenKnowledge: () => void;
}

export const AgentStatusVertical: React.FC<AgentStatusVerticalProps> = ({
  planSteps,
  safetyGate,
  onOpenSafetyModal,
  onOpenKnowledge
}) => {
  const progression = [
    {
      id: 'step-1',
      label: 'UNDERSTANDING',
      sublabel: 'Equipment Identified (VX-420 Packaging Unit)',
      status: 'completed',
      detail: 'Assembly Sector 4 · 99% match'
    },
    {
      id: 'step-2',
      label: 'VISION',
      sublabel: 'E17 Detected & Thermal Overheat (88.4°C)',
      status: 'completed',
      detail: 'OCR 96% conf · Stator sensor anomalous'
    },
    {
      id: 'step-3',
      label: 'KNOWLEDGE',
      sublabel: 'OEM Manual Evidence Grounded (§4.3 P.42)',
      status: 'completed',
      detail: 'Rev 4.2B · Motor & Cooling isolation spec'
    },
    {
      id: 'step-4',
      label: 'RECOMMENDATION',
      sublabel: 'Diagnostic Procedure Prepared',
      status: 'completed',
      detail: 'LOTO SW-1 + TB-2 torque verification'
    },
    {
      id: 'step-5',
      label: 'ACTION & SAFETY',
      sublabel: 'Human Authorization Required ($245.00)',
      status: safetyGate?.status === 'APPROVED' ? 'completed' : 'waiting_approval',
      detail: 'Part #VX-CF42 · Bay 4 Stockroom (3 Avail)'
    }
  ];

  return (
    <div className="flex flex-col h-full rounded-3xl bg-[#050914] border border-white/[0.08] p-5 sm:p-6 shadow-2xl relative overflow-hidden justify-between">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00E5FF]/15 text-[#00E5FF] flex items-center justify-center font-mono font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-white tracking-wide">
                AGENT WORKFLOW
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                PS-05 Autonomous Orchestration
              </div>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            ACTIVE PIPELINE
          </span>
        </div>

        {/* Vertical Progression */}
        <div className="space-y-4 relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[15px] top-3 bottom-5 w-0.5 bg-gradient-to-b from-emerald-500 via-[#00E5FF] to-amber-500 opacity-30" />

          {progression.map((step, idx) => {
            const isApproved = step.status === 'completed';
            const isWaiting = step.status === 'waiting_approval';

            return (
              <div key={step.id} className="flex items-start gap-3.5 relative z-10">
                {/* Node Icon */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                    isApproved
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                      : isWaiting
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-md shadow-amber-500/20 animate-pulse'
                      : 'bg-white/[0.05] text-slate-500 border border-white/[0.08]'
                  }`}
                >
                  {isApproved ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isWaiting ? (
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`text-xs font-mono font-bold uppercase tracking-wider ${
                        isApproved
                          ? 'text-emerald-400'
                          : isWaiting
                          ? 'text-amber-300'
                          : 'text-slate-400'
                      }`}
                    >
                      {step.label}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-slate-200 truncate mt-0.5">
                    {step.sublabel}
                  </div>

                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                    {step.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* High-Stakes Pending Action Box */}
      {safetyGate && safetyGate.status === 'PENDING_APPROVAL' && (
        <div className="mt-5 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 shadow-lg relative overflow-hidden">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300 mb-2">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>LEVEL 2 FINANCIAL GATE</span>
          </div>

          <div className="text-xs text-slate-200 mb-3 font-sans leading-relaxed">
            Reserve <strong className="text-white">#VX-CF42 Fan</strong> from Bay 4 Stockroom (<strong className="text-amber-300">$245.00</strong>).
          </div>

          <button
            onClick={onOpenSafetyModal}
            className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer transition-all hover:scale-[1.02]"
          >
            <span>Review &amp; Authorize</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

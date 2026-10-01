import React, { useState } from 'react';
import { 
  Check, 
  Circle, 
  Lock, 
  ChevronRight, 
  X,
  FileCode,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Wrench,
  CheckCircle2,
  Clock,
  Package,
  FileText
} from 'lucide-react';
import { AgentPlanStep, AIDecisionSummary, SafetyGateRequest, SessionMemoryItem } from '../../types';

interface AgentActionCenterProps {
  planSteps: AgentPlanStep[];
  decisionSummary: AIDecisionSummary;
  safetyGate: SafetyGateRequest | null;
  onOpenSafetyModal: () => void;
  onOpenKnowledge: () => void;
}

export const AgentActionCenter: React.FC<AgentActionCenterProps> = ({
  planSteps,
  decisionSummary,
  safetyGate,
  onOpenSafetyModal,
  onOpenKnowledge
}) => {
  const [showTechDetailsModal, setShowTechDetailsModal] = useState<boolean>(false);

  const pipelineSteps = [
    { id: 1, label: 'IDENTIFY', status: 'COMPLETED', desc: 'VX-420 Matched' },
    { id: 2, label: 'READ FAULT', status: 'COMPLETED', desc: 'E17 Detected' },
    { id: 3, label: 'RETRIEVE', status: 'COMPLETED', desc: 'Manual §4.3' },
    { id: 4, label: 'RECOMMEND', status: 'COMPLETED', desc: 'Inspect Cooling' },
    { id: 5, label: 'PREPARE ACTION', status: 'COMPLETED', desc: 'Ticket & Fan' },
    { id: 6, label: 'HUMAN APPROVAL', status: safetyGate?.status === 'APPROVED' ? 'COMPLETED' : 'LOCKED_APPROVAL', desc: '$245 Gate' },
    { id: 7, label: 'EXECUTE', status: safetyGate?.status === 'APPROVED' ? 'COMPLETED' : 'PENDING', desc: 'SAP CMMS' }
  ];

  return (
    <div className="w-full bg-[#080E24] border border-white/[0.1] rounded-3xl p-6 shadow-2xl space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-amber-500/15 flex items-center justify-center text-amber-400 border border-amber-500/30">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-base font-extrabold uppercase tracking-wider text-white font-sans">
                AGENT ACTION CENTER
              </span>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                STATEFUL TOOL WORKFLOW
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Autonomous execution pipeline with mandatory Level-2 safety gate authorization
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowTechDetailsModal(true)}
            className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-bold text-slate-200 hover:text-white flex items-center gap-2 transition-colors cursor-pointer border border-white/[0.08]"
          >
            <FileCode className="w-4 h-4 text-[#22D3EE]" />
            <span>View Technical Payload</span>
          </button>
        </div>
      </div>

      {/* Large Horizontal Pipeline */}
      <div className="space-y-2">
        <div className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">
          EXECUTION PIPELINE:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {pipelineSteps.map((step, idx) => {
            const isCompleted = step.status === 'COMPLETED';
            const isLocked = step.status === 'LOCKED_APPROVAL';
            const isPending = step.status === 'PENDING';

            return (
              <div
                key={step.id}
                className={`p-3.5 rounded-2xl border flex flex-col justify-between transition-all ${
                  isCompleted
                    ? 'bg-[#0F172A] border-emerald-500/40 text-emerald-400 shadow-sm'
                    : isLocked
                      ? 'bg-amber-950/40 border-amber-500/50 text-amber-300 ring-2 ring-amber-500/30 shadow-lg'
                      : 'bg-[#0B1020] border-white/[0.06] text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono font-bold">
                    0{step.id}
                  </span>
                  {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  {isLocked && <Lock className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />}
                  {isPending && <Circle className="w-3.5 h-3.5 text-slate-600 shrink-0" />}
                </div>

                <div className="text-xs font-black tracking-wide truncate">
                  {step.label}
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5 truncate">
                  {step.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Card & Decision Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
        {/* Left: Current Active Action */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-[#0F172A] border border-white/[0.08] flex flex-col justify-between space-y-4 shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                CURRENT PENDING ACTION
              </span>
              <span className="text-xs font-mono font-extrabold text-amber-400 bg-amber-500/20 px-3 py-1 rounded-lg border border-amber-500/30">
                $245.00 FINANCIAL ALLOCATION
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-1">
              Requisition Part #VX-CF42 & Dispatch Work Order #TCK-2026-881
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Reason: Detected thermal exceedance (88.4°C) caused by axial cooling restriction. Requisitioning 1 unit of Part #VX-CF42 from Bay 4 stockroom (Bin C-14).
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.06]">
            <div className="text-xs text-slate-400 font-mono">
              Status: <span className="text-amber-400 font-bold">{safetyGate?.status === 'APPROVED' ? '✓ APPROVED & DISPATCHED' : '● AWAITING HUMAN SIGN-OFF'}</span>
            </div>

            {safetyGate?.status !== 'APPROVED' ? (
              <button
                onClick={onOpenSafetyModal}
                className="btn-primary py-2.5 px-6 rounded-xl text-xs font-extrabold flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>AUTHORIZE & DISPATCH</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 font-mono bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4" />
                <span>COMMITTED IN SAP PM & BAY 4</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Decision Evidence & LOTO */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-[#0F172A] border border-white/[0.08] flex flex-col justify-between space-y-3 shadow-lg">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 font-mono block mb-2">
              DIAGNOSTIC EVIDENCE
            </span>
            <div className="space-y-2 text-xs text-slate-200">
              <div className="p-2.5 rounded-xl bg-[#070B1A] flex items-center justify-between">
                <span>Observed Fault:</span>
                <span className="font-mono font-bold text-red-400">E17 (88.4°C Overheat)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#070B1A] flex items-center justify-between">
                <span>OEM Manual Ref:</span>
                <span className="font-mono font-bold text-[#22D3EE]">Rev 4.2B, §4.3 (p. 42)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#070B1A] flex items-center justify-between">
                <span>Safety Requirement:</span>
                <span className="font-mono font-bold text-amber-400">LOTO SW-1 Disconnect</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 font-mono pt-2 border-t border-white/[0.06] flex items-center justify-between">
            <span>AI Confidence: 94%</span>
            <button onClick={onOpenKnowledge} className="text-[#22D3EE] hover:underline font-bold cursor-pointer">
              Read Manual Evidence →
            </button>
          </div>
        </div>
      </div>

      {/* Technical Details JSON Payload Modal */}
      {showTechDetailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl bg-[#0B1020] border border-white/[0.15] rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-[#22D3EE]" />
                Technical Tool Call Payloads
              </h3>
              <button
                onClick={() => setShowTechDetailsModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <pre className="p-5 rounded-2xl bg-[#070B1A] font-mono text-xs text-slate-300 overflow-x-auto max-h-96 border border-white/[0.08] leading-relaxed">
              {JSON.stringify({
                sessionId: 'VX-2048',
                equipment: 'VX-420 (DEMO-420-0192)',
                toolsExecuted: [
                  { tool: 'searchTechnicalManual', args: { query: 'E17', model: 'VX-420' }, status: '200 OK' },
                  { tool: 'queryBayInventory', args: { partNumber: 'VX-CF42', bay: 'Bay 4' }, stock: 3 },
                  { tool: 'draftCmmsTicket', args: { priority: 'High', errorCode: 'E17' }, ticketId: 'TCK-2026-881' },
                  { tool: 'requestSafetyApproval', amountUsd: 245.00, status: 'WAITING_HUMAN_AUTHORIZATION' }
                ],
                telemetrySnapshot: {
                  motorTempC: 88.4,
                  flowRateLMin: 1.2,
                  operatingRpm: 2840,
                  voltageV: 480.2
                }
              }, null, 2)}
            </pre>

            <button
              onClick={() => setShowTechDetailsModal(false)}
              className="w-full py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-xs font-bold text-white cursor-pointer"
            >
              Close Technical Viewer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

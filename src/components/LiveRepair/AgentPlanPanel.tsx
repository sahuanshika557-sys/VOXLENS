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
  ArrowRight
} from 'lucide-react';
import { AgentPlanStep, AIDecisionSummary, SafetyGateRequest } from '../../types';

interface AgentPlanPanelProps {
  planSteps: AgentPlanStep[];
  decisionSummary: AIDecisionSummary;
  safetyGate: SafetyGateRequest | null;
  onOpenSafetyModal: () => void;
  onOpenKnowledge: () => void;
}

export const AgentPlanPanel: React.FC<AgentPlanPanelProps> = ({
  planSteps,
  decisionSummary,
  safetyGate,
  onOpenSafetyModal,
  onOpenKnowledge
}) => {
  const [showFullPlanModal, setShowFullPlanModal] = useState<boolean>(false);
  const [showTechDetailsModal, setShowTechDetailsModal] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-full bg-[#0B1020] rounded-2xl border border-white/[0.08] overflow-hidden shadow-lg">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-100">
            Agent Control
          </span>
        </div>
        <span className="text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
          94% Confidence
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Decision Summary Card */}
        <div className="p-3.5 rounded-xl bg-[#111827] border border-white/[0.06] space-y-2.5">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block">
              Observed
            </span>
            <p className="text-xs text-slate-200 mt-0.5 leading-snug">
              E17 fault code + 88.4°C thermal anomaly (Constrained flow 1.2 L/min)
            </p>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block">
              Evidence Grounding
            </span>
            <div className="flex items-center justify-between mt-0.5">
              <p className="text-xs text-[#22D3EE] font-mono">
                Manual §4.3 (Page 42)
              </p>
              <button
                onClick={onOpenKnowledge}
                className="text-[11px] text-slate-400 hover:text-white underline"
              >
                Inspect
              </button>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block">
              Recommendation
            </span>
            <p className="text-xs text-slate-200 mt-0.5 leading-snug">
              Inspect cooling path & TB-2; requisition Part #VX-CF42 if drag persists.
            </p>
          </div>
        </div>

        {/* Current Task & Agent Pipeline */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
              Agent Execution Pipeline
            </span>
          </div>

          <div className="space-y-1.5">
            {planSteps.map((step) => {
              const isCompleted = step.status === 'COMPLETED';
              const isInProgress = step.status === 'IN_PROGRESS';
              const isLocked = step.status === 'LOCKED_APPROVAL';

              return (
                <div
                  key={step.id}
                  className={`px-3 py-2 rounded-xl flex items-center justify-between text-xs transition-colors ${
                    isInProgress
                      ? 'bg-white/[0.06] text-white border border-[#22D3EE]/30'
                      : isCompleted
                        ? 'text-slate-300 bg-white/[0.02]'
                        : isLocked
                          ? 'text-amber-300/90 bg-amber-500/[0.05] border border-amber-500/20'
                          : 'text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {isCompleted && (
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    )}
                    {isInProgress && (
                      <span className="text-[#22D3EE] font-bold shrink-0 animate-pulse">●</span>
                    )}
                    {isLocked && (
                      <Lock className="w-3 h-3 text-amber-400 shrink-0" />
                    )}
                    {!isCompleted && !isInProgress && !isLocked && (
                      <Circle className="w-3 h-3 text-slate-600 shrink-0" />
                    )}

                    <span className="truncate font-medium">
                      {step.title}
                    </span>
                  </div>

                  {isCompleted && (
                    <span className="text-[10px] text-emerald-400 font-mono shrink-0">
                      Done
                    </span>
                  )}
                  {isInProgress && (
                    <span className="text-[10px] text-[#22D3EE] font-mono shrink-0">
                      Active
                    </span>
                  )}
                  {isLocked && (
                    <span className="text-[10px] text-amber-400 font-mono font-bold shrink-0">
                      Safety Gate
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 pt-1">
            <button
              onClick={() => setShowFullPlanModal(true)}
              className="py-1.5 px-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-medium text-slate-300 hover:text-white flex items-center justify-center gap-1 transition-colors"
            >
              <span>Full Plan</span>
              <ChevronRight className="w-3 h-3" />
            </button>

            <button
              onClick={() => setShowTechDetailsModal(true)}
              className="py-1.5 px-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-medium text-slate-300 hover:text-white flex items-center justify-center gap-1 transition-colors"
            >
              <FileCode className="w-3 h-3 text-slate-400" />
              <span>Tech Payload</span>
            </button>
          </div>
        </div>

        {/* Safety Gate Trigger Callout */}
        {safetyGate && safetyGate.status === 'PENDING_APPROVAL' && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                Safety Gate Locked
              </span>
              <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded">
                $245.00
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-snug">
              Part #VX-CF42 & Work Order require human authorization.
            </p>
            <button
              onClick={onOpenSafetyModal}
              className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#050816] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md cursor-pointer"
            >
              <span>Review & Authorize</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Full Agent Plan Modal */}
      {showFullPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-[#0B1020] border border-white/[0.1] rounded-2xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h3 className="text-base font-semibold text-white">
                Detailed Agent Execution Pipeline
              </h3>
              <button
                onClick={() => setShowFullPlanModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {planSteps.map((step) => (
                <div
                  key={step.id}
                  className="p-3 rounded-xl bg-[#111827] border border-white/[0.06] space-y-1"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">
                      Step 0{step.id}: {step.title}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      step.status === 'COMPLETED' ? 'badge-emerald' : step.status === 'IN_PROGRESS' ? 'badge-cyan' : 'badge-amber'
                    }`}>
                      {step.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {step.description}
                  </p>
                  {step.resultSummary && (
                    <div className="text-[11px] text-emerald-400 font-mono pt-1 border-t border-white/[0.04] mt-1">
                      Result: {step.resultSummary}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowFullPlanModal(false)}
              className="w-full py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-xs font-semibold text-white cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Technical Details JSON Payload Modal */}
      {showTechDetailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-[#0B1020] border border-white/[0.1] rounded-2xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <FileCode className="w-4 h-4 text-[#22D3EE]" />
                Technical Tool Call Payloads
              </h3>
              <button
                onClick={() => setShowTechDetailsModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-[#070B1A] font-mono text-xs text-slate-300 overflow-x-auto max-h-80 border border-white/[0.06]">
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
              className="w-full py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-xs font-semibold text-white cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

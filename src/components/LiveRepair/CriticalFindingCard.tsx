import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, ArrowRight, Eye, Wrench, Package, HelpCircle, Activity, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

interface CriticalFindingCardProps {
  faultTitle?: string;
  defectCategory?: string;
  severity?: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  confidenceLabel?: string;
  observedEvidence?: string[];
  aiInferences?: string[];
  verifiedTelemetryStatus?: string;
  recommendedAction?: string;
  errorCode?: string;
  temperatureC?: number;
  onOpenSafetyModal?: () => void;
  onOpenKnowledge?: () => void;
  onOpenWorkflow?: () => void;
}

export const CriticalFindingCard: React.FC<CriticalFindingCardProps> = ({
  faultTitle = 'Packaging Integrity / Crushed Carton Defect',
  defectCategory = 'Packaging Integrity / Carton Damage',
  severity = 'HIGH',
  confidenceLabel = 'Visual assessment — requires physical verification',
  observedEvidence = [
    'Severely crushed and torn cardboard carton on conveyor belt',
    'Red illuminated tower warning stack light active',
    'Multiple intact cartons & robotic packaging arm'
  ],
  aiInferences = [
    '1. Excessive robotic gripping force',
    '2. Gripper alignment / vacuum cups wear',
    '3. Conveyor transfer-point misalignment',
    '4. Carton material weakness / dimensions',
    '5. Upstream carton collision / jam'
  ],
  verifiedTelemetryStatus = 'Stack Light Alarm Code: Unknown — Must be verified from HMI/PLC log. Never infer from light color alone.',
  recommendedAction = 'Isolate damaged carton from production stream, inspect robotic gripper & conveyor transfer plate, verify PLC alarm log.',
  errorCode = 'UNKNOWN (VERIFY ON HMI)',
  temperatureC = 26.4,
  onOpenSafetyModal,
  onOpenKnowledge,
  onOpenWorkflow
}) => {
  const [showDetailedEvidence, setShowDetailedEvidence] = useState<boolean>(false);

  const severityBadgeClass = 
    severity === 'CRITICAL' ? 'bg-red-500/20 text-red-300 border-red-500/40' :
    severity === 'HIGH' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
    severity === 'MEDIUM' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
    'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';

  return (
    <div className="w-full rounded-3xl bg-gradient-to-br from-[#12080D] via-[#090C19] to-[#050914] border-2 border-red-500/40 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
      {/* Subtle warning ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-3.5 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shadow-lg shadow-red-500/20 shrink-0">
            <Package className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="text-[11px] font-mono font-black text-red-400 uppercase tracking-widest flex items-center gap-2">
              <span>VISUAL FAULT IDENTIFIED</span>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className={`px-2 py-0.5 rounded text-[10px] border font-mono ${severityBadgeClass}`}>
                SEVERITY: {severity}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-sans tracking-wide mt-0.5">
              {faultTitle}
            </h3>
          </div>
        </div>

        {/* Calibrated Confidence Badge - Never fabricated */}
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{confidenceLabel}</span>
          </span>
        </div>
      </div>

      {/* 3 Rigorous Pillars: OBSERVED EVIDENCE | AI INFERENCE | VERIFIED TELEMETRY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-4">
        {/* Pillar 1: OBSERVED EVIDENCE */}
        <div className="p-4 rounded-2xl bg-black/50 border border-red-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-red-400 font-black uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                OBSERVED EVIDENCE
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-500/20 text-red-300">Directly Visible</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-200">
              {observedEvidence.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-red-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pillar 2: AI INFERENCE */}
        <div className="p-4 rounded-2xl bg-black/50 border border-purple-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-purple-300 font-black uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                AI INFERENCE ({aiInferences.length} HYPOTHESES)
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">Plausible</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-300">
              {aiInferences.map((item, idx) => (
                <li key={idx} className="leading-snug">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pillar 3: VERIFIED TELEMETRY */}
        <div className="p-4 rounded-2xl bg-black/50 border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-amber-400 font-black uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                VERIFIED TELEMETRY
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">Action Required</span>
            </div>
            <div className="text-xs text-slate-300 space-y-1.5">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <span className="font-bold text-amber-300 block mb-0.5">Telemetry & Alarm State:</span>
                <span className="text-slate-200">{verifiedTelemetryStatus}</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Active Code: <span className="text-amber-300 font-mono font-bold">{errorCode}</span> · Temp: <span className="text-[#00F0FF] font-mono font-bold">{temperatureC}°C</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Immediate Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#08111F]/90 border border-white/[0.08]">
        <div className="space-y-1">
          <div className="text-xs font-mono text-[#00E5FF] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>Recommended Immediate Action:</span>
          </div>
          <p className="text-sm font-medium text-slate-200">
            {recommendedAction}
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 flex-wrap sm:flex-nowrap">
          {onOpenWorkflow && (
            <button
              onClick={() => {
                soundEngine.playMicOn();
                onOpenWorkflow();
              }}
              className="px-4 py-2 rounded-xl bg-[#00F0FF] hover:bg-[#38BDF8] text-slate-950 text-xs font-mono font-black flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:scale-105"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>8-Step Repair Workflow</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {onOpenKnowledge && (
            <button
              onClick={onOpenKnowledge}
              className="px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono font-bold text-slate-200 transition-colors cursor-pointer"
            >
              Grounded SOP
            </button>
          )}

          {onOpenSafetyModal && (
            <button
              onClick={() => {
                soundEngine.playMicOn();
                onOpenSafetyModal();
              }}
              className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-black flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Safety Gate</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


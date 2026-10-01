import React from 'react';
import { 
  Cpu, 
  Sparkles, 
  Eye, 
  BrainCircuit, 
  BookOpen, 
  Wrench, 
  ArrowRight, 
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { AIDecisionSummary } from '../../types';

interface AISynthesisHubProps {
  decisionSummary: AIDecisionSummary;
  errorCode: string;
  temperatureC: number;
  onOpenKnowledge: () => void;
  onOpenSafetyModal: () => void;
  isSynthesizing?: boolean;
}

export const AISynthesisHub: React.FC<AISynthesisHubProps> = ({
  decisionSummary,
  errorCode,
  temperatureC,
  onOpenKnowledge,
  onOpenSafetyModal,
  isSynthesizing = false
}) => {
  return (
    <div className="w-full rounded-2xl bg-[#050914] border border-white/[0.08] p-5 sm:p-6 shadow-2xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#00E5FF]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] shadow-lg shadow-[#00E5FF]/10">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-white tracking-wide">
                AI MULTIMODAL SYNTHESIS
              </span>
              <span className="text-[11px] font-mono font-bold text-[#00E5FF] bg-[#00E5FF]/10 px-2.5 py-0.5 rounded-full border border-[#00E5FF]/25">
                TRI-MODAL REASONING
              </span>
            </div>
            <div className="text-xs text-slate-400 font-medium">
              Real-time cross-correlation of optical telemetry, speech intent, and dense OEM vectors
            </div>
          </div>
        </div>

        {/* Confidence Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>94% GROUNDED REASONING</span>
          <span className="text-[10px] text-slate-400 font-normal">(DEMO METRIC)</span>
        </div>
      </div>

      {/* 5-Pillar Structured Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Pillar 1: OBSERVED */}
        <div className="p-4 rounded-xl bg-[#08111F] border border-white/[0.06] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400 mb-2">
              <Eye className="w-3.5 h-3.5" />
              <span>01 · OBSERVED</span>
            </div>
            <div className="text-sm font-bold text-white mb-1">
              Fault {errorCode || 'E17'} + {temperatureC || 88.4}°C
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Optical CV detected 7-segment readout; thermal sensor registers +23.4°C above baseline.
            </p>
          </div>
          <div className="mt-3 text-[11px] font-mono text-slate-500 bg-black/40 px-2 py-1 rounded">
            CV Match: 96%
          </div>
        </div>

        {/* Pillar 2: UNDERSTOOD */}
        <div className="p-4 rounded-xl bg-[#08111F] border border-white/[0.06] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 mb-2">
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>02 · UNDERSTOOD</span>
            </div>
            <div className="text-sm font-bold text-white mb-1">
              Motor Thermal Overload
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Airflow velocity dropped to 1.2 L/min, causing rotor core temperature buildup.
            </p>
          </div>
          <div className="mt-3 text-[11px] font-mono text-slate-500 bg-black/40 px-2 py-1 rounded">
            Intent: Diagnostics
          </div>
        </div>

        {/* Pillar 3: EVIDENCE */}
        <div 
          onClick={onOpenKnowledge}
          className="p-4 rounded-xl bg-[#08111F] border border-[#00E5FF]/20 hover:border-[#00E5FF]/50 flex flex-col justify-between cursor-pointer transition-all group"
        >
          <div>
            <div className="flex items-center justify-between text-xs font-mono font-bold text-[#00E5FF] mb-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>03 · EVIDENCE</span>
              </div>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="text-sm font-bold text-white mb-1">
              Manual §4.3 (P. 42)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              "Restricted axial airflow or seized fan #VX-CF42 triggers E17 thermal safety trip."
            </p>
          </div>
          <div className="mt-3 text-[11px] font-mono text-[#00E5FF] bg-[#00E5FF]/10 px-2 py-1 rounded flex items-center justify-between">
            <span>Rev 4.2B Verified</span>
            <span className="font-bold">→ View</span>
          </div>
        </div>

        {/* Pillar 4: RECOMMENDATION */}
        <div className="p-4 rounded-xl bg-[#08111F] border border-white/[0.06] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 mb-2">
              <Wrench className="w-3.5 h-3.5" />
              <span>04 · RECOMMENDATION</span>
            </div>
            <div className="text-sm font-bold text-white mb-1">
              Inspect Fan &amp; TB-2
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Follow LOTO SW-1 isolation. Check Terminal Block TB-2 torque spec (1.2 Nm).
            </p>
          </div>
          <div className="mt-3 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
            Safety Gate LOTO: Ready
          </div>
        </div>

        {/* Pillar 5: NEXT ACTION */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-[#08111F] to-amber-950/20 border border-amber-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300 mb-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>05 · NEXT ACTION</span>
            </div>
            <div className="text-sm font-bold text-white mb-1">
              Ticket #TCK-2026-881
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Part #VX-CF42 ($245) staged for Bay 4 dispatch. Awaiting technician sign-off.
            </p>
          </div>
          <button
            onClick={onOpenSafetyModal}
            className="mt-3 w-full py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Authorize ($245)</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

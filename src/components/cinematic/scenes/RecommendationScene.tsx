import React from 'react';
import { CheckSquare, AlertCircle, Wrench, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export const RecommendationScene: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl mx-auto px-6 animate-fadeIn">
      {/* Scene Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-mono font-bold tracking-wider uppercase mb-4">
        <Sparkles className="w-3.5 h-3.5" />
        <span>ACTIONABLE SYNTHESIS</span>
      </div>

      {/* Main Headline */}
      <h2 className="text-4xl sm:text-6xl font-black text-white text-center leading-tight mb-4 tracking-tight">
        FROM SIGNALS TO A<br />
        <span className="text-[#00F0FF]">CLEAR NEXT STEP.</span>
      </h2>

      <p className="text-base sm:text-xl text-slate-300 text-center max-w-3xl mb-8">
        Converting complex multimodal sensor data and manuals into structured, prioritized technician action items.
      </p>

      {/* AI Recommendation Card */}
      <div className="w-full max-w-3xl rounded-3xl bg-[#0B1020] border-2 border-[#00F0FF]/50 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-white/[0.1] pb-4 mb-5 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 font-mono font-black text-sm">
              FAULT: E17
            </span>
            <span className="text-base font-bold text-white">
              Motor Thermal Overload Diagnosis
            </span>
          </div>
          <div className="text-xs font-mono text-[#00F0FF] bg-[#00F0FF]/10 px-3 py-1 rounded-md border border-[#00F0FF]/25">
            Grounded by Manual §4.3 (P.42)
          </div>
        </div>

        {/* Likely Issue Banner */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 mb-6">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              LIKELY ROOT CAUSE
            </div>
            <div className="text-sm font-semibold text-slate-200">
              Cooling fan impeller obstruction or bearing thermal breakdown causing 88.4°C stator overheat.
            </div>
          </div>
        </div>

        {/* 3 Step Action Plan */}
        <div className="space-y-3 mb-6">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            RECOMMENDED TECHNICIAN CHECKS:
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.08] flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#00F0FF]/20 text-[#00F0FF] font-mono font-black flex items-center justify-center text-xs">
              01
            </div>
            <div className="text-sm text-slate-200 font-medium">
              Inspect axial cooling fan (#VX-CF42) for physical particulate obstruction or seized blades.
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.08] flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#00F0FF]/20 text-[#00F0FF] font-mono font-black flex items-center justify-center text-xs">
              02
            </div>
            <div className="text-sm text-slate-200 font-medium">
              Verify Terminal Block TB-2 wire torque (spec: 1.2 Nm) and motor winding resistance.
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.08] flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#00F0FF]/20 text-[#00F0FF] font-mono font-black flex items-center justify-center text-xs">
              03
            </div>
            <div className="text-sm text-slate-200 font-medium">
              Follow safety LOTO isolation procedure before opening the high-voltage junction box.
            </div>
          </div>
        </div>

        {/* Action Bottom Pill */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.1] text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Audited Diagnostic Flow</span>
          </div>
          <div>PROTOTYPE RECOMMENDATION ENGINE</div>
        </div>
      </div>
    </div>
  );
};

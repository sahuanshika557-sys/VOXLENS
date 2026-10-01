import React from 'react';
import { Sparkles } from 'lucide-react';

export const DashboardQuote: React.FC = () => {
  return (
    <div className="w-full rounded-2xl bg-gradient-to-r from-[#080F1E] via-[#060B16] to-[#0D0A1C] border border-white/[0.08] p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/25 flex items-center justify-center text-[#00F0FF] shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <p className="text-sm font-sans font-medium text-slate-200 tracking-wide italic">
            "See the fault. Understand the cause. Take the next step."
          </p>
          <span className="text-[11px] font-mono font-bold text-[#00F0FF] tracking-wider uppercase">
            — VOXLENS AI FIELD INTELLIGENCE
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
        <span className="px-3 py-1 rounded-lg bg-black/40 border border-white/[0.06]">
          PS-05 MULTIMODAL
        </span>
        <span className="px-3 py-1 rounded-lg bg-black/40 border border-white/[0.06]">
          VOXNOVA 2026
        </span>
      </div>
    </div>
  );
};

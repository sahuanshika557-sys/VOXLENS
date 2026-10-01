import React from 'react';
import { CheckCircle2, ArrowRight, RotateCcw, Sparkles, ShieldCheck, Play } from 'lucide-react';

interface ResultSceneProps {
  onEnterLiveRepair: () => void;
  onReplayStory: () => void;
}

export const ResultScene: React.FC<ResultSceneProps> = ({
  onEnterLiveRepair,
  onReplayStory
}) => {
  const auditItems = [
    'Optical CV OCR & Thermal Anomaly Isolated (E17 · 88.4°C)',
    'OEM Technical Manual Evidence Grounded (Manual §4.3 · Page 42)',
    'Low-Latency Diagnostic Guidance Delivered via Web Speech',
    'Simulated CMMS Ticket #TCK-2026-881 Staged & Logged',
    'Replacement Fan #VX-CF42 Reserved from Bay 4 Stockroom',
    'Financial Authorization Completed & Logged to Session Memory'
  ];

  return (
    <div className="flex flex-col items-center justify-center max-w-5xl mx-auto px-6 animate-fadeIn">
      {/* Scene Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase mb-4">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>REPAIR CYCLE COMPLETED · SESSION #VX-2048</span>
      </div>

      {/* Main Headline */}
      <h2 className="text-4xl sm:text-6xl font-black text-white text-center leading-tight mb-4 tracking-tight">
        THE FUTURE OF<br />
        <span className="text-emerald-400">FIELD SERVICE.</span>
      </h2>

      <p className="text-base sm:text-xl text-slate-300 text-center max-w-3xl mb-6">
        45 minutes of manual flipping transformed into a 45-second grounded diagnostic &amp; dispatch workflow.
      </p>

      {/* Audit Checklist Box */}
      <div className="w-full max-w-2xl rounded-3xl bg-[#0B1020] border-2 border-emerald-500/40 shadow-2xl p-6 mb-8">
        <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-white/[0.08] pb-2">
          AUDITED REPAIR MILESTONES:
        </div>
        <div className="grid grid-cols-1 gap-2.5">
          {auditItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-black/40 border border-white/[0.05] text-xs sm:text-sm text-slate-200 font-medium"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={onEnterLiveRepair}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00F0FF] to-emerald-400 text-[#050816] font-black text-base flex items-center gap-3 shadow-xl hover:scale-105 transition-transform cursor-pointer"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>ENTER LIVE REPAIR COPILOT</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          onClick={onReplayStory}
          className="px-6 py-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.15] text-slate-200 font-semibold text-sm flex items-center gap-2 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Replay Film</span>
        </button>
      </div>
    </div>
  );
};

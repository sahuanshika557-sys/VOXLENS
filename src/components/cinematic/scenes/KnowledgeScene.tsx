import React from 'react';
import { BookOpen, FileCheck, CheckCircle2, Bookmark, ShieldAlert, Sparkles } from 'lucide-react';

export const KnowledgeScene: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl mx-auto px-6 animate-fadeIn">
      {/* Scene Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold tracking-wider uppercase mb-4">
        <BookOpen className="w-3.5 h-3.5" />
        <span>RAG GROUNDING & DENSE RETRIEVAL</span>
      </div>

      {/* Main Headline */}
      <h2 className="text-4xl sm:text-6xl font-black text-white text-center leading-tight mb-4 tracking-tight">
        DON'T JUST ANSWER.<br />
        <span className="text-amber-400">GROUND THE ANSWER.</span>
      </h2>

      <p className="text-base sm:text-xl text-slate-300 text-center max-w-3xl mb-8">
        Eliminating LLM hallucinations by retrieving exact OEM technical manual paragraphs before generating any technician guidance.
      </p>

      {/* OEM Manual Document Presentation */}
      <div className="w-full max-w-3xl rounded-3xl bg-[#0B1020] border-2 border-amber-500/40 shadow-2xl overflow-hidden relative">
        {/* Document Header Bar */}
        <div className="bg-[#050816] px-6 py-3.5 border-b border-white/[0.1] flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-slate-200">
                VX-420 OEM SERVICE MANUAL · REV 4.2B
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Section 4.3: Motor & Cooling Diagnostics · Page 42
              </div>
            </div>
          </div>
          <div className="text-xs font-mono font-extrabold text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-lg border border-emerald-500/30 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>0.94 DENSE SIMILARITY MATCH</span>
          </div>
        </div>

        {/* Highlighted Manual Content */}
        <div className="p-6 space-y-4">
          <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            RETRIEVED EXCERPT [§4.3.2 THERMAL OVERLOAD ISOLATION]:
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border-l-4 border-amber-400 text-slate-100 text-sm sm:text-base leading-relaxed font-sans shadow-inner">
            <p className="mb-2">
              <strong className="text-amber-300">"Fault Code E17 (Motor Thermal Overload):</strong> Triggered when motor core temperature sensor exceeds 85°C for &gt; 30 seconds. Restricted axial airflow or seized impeller on fan <strong className="text-white">#VX-CF42</strong> is the primary cause."
            </p>
            <p className="text-xs text-slate-300 font-mono">
              → Required Action: Check Terminal Block TB-2 isolation, measure fan winding resistance, and replace damaged cooling fan assembly if seized.
            </p>
          </div>

          {/* Verification Callout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex items-center gap-2 text-slate-300">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span>Full Citation Traceability</span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex items-center gap-2 text-slate-300">
              <Sparkles className="w-4 h-4 text-[#00F0FF]" />
              <span>Zero Fabrication / 100% Fact-Checked</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Mic, Camera, BookOpen, Sparkles, ArrowRight, Zap, Cpu } from 'lucide-react';

export const FusionScene: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl mx-auto px-6 animate-fadeIn">
      {/* Scene Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 via-[#00F0FF]/20 to-amber-500/20 border border-white/[0.2] text-[#00F0FF] text-xs font-mono font-bold tracking-wider uppercase mb-4">
        <Zap className="w-3.5 h-3.5 text-amber-400" />
        <span>SIGNATURE MULTIMODAL MOMENT</span>
      </div>

      {/* Main Headline */}
      <h2 className="text-4xl sm:text-6xl font-black text-white text-center leading-tight mb-4 tracking-tight">
        THREE SIGNALS.<br />
        <span className="bg-gradient-to-r from-emerald-400 via-[#00F0FF] to-amber-400 bg-clip-text text-transparent">
          ONE UNDERSTANDING.
        </span>
      </h2>

      <p className="text-base sm:text-xl text-slate-300 text-center max-w-3xl mb-8">
        VoxLens combines spoken intent, optical telemetry, and dense OEM manual vector retrieval into a single grounded understanding.
      </p>

      {/* Interactive 3-to-1 Fusion Stage */}
      <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center justify-between gap-6 my-2">
        {/* Input Pillars Stack */}
        <div className="flex flex-col gap-3.5 w-full lg:w-5/12">
          {/* Signal 1: Voice */}
          <div className="p-4 rounded-2xl bg-[#0B1020] border-2 border-emerald-500/40 flex items-center justify-between shadow-lg shadow-emerald-500/5 group hover:border-emerald-400 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-emerald-400">SIGNAL 01 · VOICE</div>
                <div className="text-sm font-bold text-white">"Check error E17"</div>
              </div>
            </div>
            <div className="text-[11px] font-mono text-slate-400 bg-black/40 px-2 py-1 rounded">16 kHz Stream</div>
          </div>

          {/* Signal 2: Vision */}
          <div className="p-4 rounded-2xl bg-[#0B1020] border-2 border-[#00F0FF]/40 flex items-center justify-between shadow-lg shadow-[#00F0FF]/5 group hover:border-[#00F0FF] transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/15 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF]">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-[#00F0FF]">SIGNAL 02 · VISION</div>
                <div className="text-sm font-bold text-white">E17 Readout · 88.4°C</div>
              </div>
            </div>
            <div className="text-[11px] font-mono text-slate-400 bg-black/40 px-2 py-1 rounded">96% Conf</div>
          </div>

          {/* Signal 3: Knowledge */}
          <div className="p-4 rounded-2xl bg-[#0B1020] border-2 border-amber-500/40 flex items-center justify-between shadow-lg shadow-amber-500/5 group hover:border-amber-400 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-amber-400">SIGNAL 03 · KNOWLEDGE</div>
                <div className="text-sm font-bold text-white">Manual Rev 4.2B §4.3</div>
              </div>
            </div>
            <div className="text-[11px] font-mono text-slate-400 bg-black/40 px-2 py-1 rounded">Dense RAG</div>
          </div>
        </div>

        {/* Dynamic Animated Convergence Core */}
        <div className="flex items-center justify-center">
          <div className="hidden lg:flex flex-col items-center gap-2 text-[#00F0FF]">
            <div className="w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-[#00F0FF] animate-pulse" />
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#00F0FF] to-cyan-300 animate-pulse" />
            <div className="w-8 h-0.5 bg-gradient-to-r from-amber-400 to-[#00F0FF] animate-pulse" />
          </div>
          <ArrowRight className="w-8 h-8 text-[#00F0FF] lg:hidden animate-pulse" />
        </div>

        {/* Synthesized Output Hub */}
        <div className="w-full lg:w-6/12 p-6 rounded-3xl bg-[#0B1020] border-2 border-[#00F0FF] shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F0FF]/10 rounded-bl-full pointer-events-none" />

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#00F0FF]/20 border border-[#00F0FF]/50 flex items-center justify-center text-[#00F0FF] shadow-lg shadow-[#00F0FF]/20 animate-spin">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono font-black text-[#00F0FF] uppercase tracking-wider">
                MULTIMODAL CONTEXT SYNTHESIS
              </div>
              <div className="text-lg font-extrabold text-white">
                Cohesive Diagnostic Context
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/50 border border-white/[0.1] text-sm text-slate-200 leading-relaxed mb-4">
            <span className="text-[#00F0FF] font-bold">Tri-Modal Fusion Match:</span> The technician's query aligns with visual detection of <strong className="text-white">Error E17</strong> on the <strong className="text-white">VX-420 Packaging Unit</strong>, corroborated by <strong className="text-white">88.4°C</strong> thermal anomaly and grounded in OEM Manual <strong className="text-amber-300">Section 4.3 (Motor Overload Diagnostics)</strong>.
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/20">
            <span>AI SYNTHESIS READY</span>
            <span>GROUNDED · 0% HALLUCINATION</span>
          </div>
        </div>
      </div>
    </div>
  );
};

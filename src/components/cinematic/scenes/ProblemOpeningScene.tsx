import React from 'react';
import { Cpu, Sparkles, Shield, Activity, Radio } from 'lucide-react';

export const ProblemOpeningScene: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-6 animate-fadeIn min-h-[55vh]">
      {/* Radar scanning line effect */}
      <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
        <div className="absolute inset-0 rounded-3xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 animate-pulse" />
        <div className="absolute inset-2 rounded-2xl bg-[#0B1020] border border-white/[0.1] flex items-center justify-center shadow-2xl">
          <Cpu className="w-12 h-12 text-[#00F0FF] animate-pulse" />
        </div>
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#00F0FF]"></span>
        </span>
      </div>

      {/* Meta Badge */}
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-mono font-bold tracking-widest uppercase mb-6 shadow-sm">
        <Radio className="w-3.5 h-3.5 animate-pulse" />
        <span>PS-05 · Real-Time Voice & Multimodal Agents</span>
      </div>

      {/* Main Title */}
      <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight font-sans mb-4 drop-shadow-md">
        VOX<span className="text-[#00F0FF]">LENS</span>
      </h1>

      <div className="text-xl sm:text-2xl text-slate-300 font-semibold tracking-wider font-mono mb-8">
        AI FIELD COPILOT
      </div>

      {/* 3 Pillars Tagline Box */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl my-6">
        <div className="p-5 rounded-2xl bg-[#0B1020]/90 border border-white/[0.1] flex flex-col items-center gap-2 transform hover:-translate-y-1 transition-transform">
          <div className="text-[#00F0FF] text-lg font-bold font-mono">01 · VISION</div>
          <div className="text-base text-slate-200 font-medium">See the fault.</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0B1020]/90 border border-white/[0.1] flex flex-col items-center gap-2 transform hover:-translate-y-1 transition-transform">
          <div className="text-emerald-400 text-lg font-bold font-mono">02 · VOICE</div>
          <div className="text-base text-slate-200 font-medium">Hear the fix.</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0B1020]/90 border border-white/[0.1] flex flex-col items-center gap-2 transform hover:-translate-y-1 transition-transform">
          <div className="text-amber-400 text-lg font-bold font-mono">03 · AGENT</div>
          <div className="text-base text-slate-200 font-medium">Let the agent act.</div>
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-slate-400 max-w-2xl mt-4 leading-relaxed font-normal">
        Empowering industrial field service technicians with hands-free computer vision, live OEM manual grounding, and human-in-the-loop task execution.
      </p>

      {/* Prototype Metric Callout */}
      <div className="mt-8 flex items-center gap-6 text-xs text-slate-500 font-mono">
        <span className="flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-emerald-400" />
          Zero Blind Autonomous Execution
        </span>
        <span className="flex items-center gap-1.5">
          <Activity className="w-4 h-4 text-[#00F0FF]" />
          Edge + Web Audio Subsystem
        </span>
      </div>
    </div>
  );
};

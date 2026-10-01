import React, { useEffect, useState } from 'react';
import { Mic, Radio, Volume2, Sparkles, AudioWaveform } from 'lucide-react';

export const VoiceScene: React.FC = () => {
  const [waveHeights, setWaveHeights] = useState<number[]>([
    20, 45, 80, 60, 30, 95, 75, 40, 65, 90, 100, 70, 40, 85, 55, 30, 70, 90, 45, 25
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveHeights(prev =>
        prev.map(() => Math.floor(Math.random() * 75) + 20)
      );
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center max-w-5xl mx-auto px-6 animate-fadeIn">
      {/* Scene Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase mb-4">
        <Radio className="w-3.5 h-3.5 animate-pulse" />
        <span>VOICE MULTIMODAL STREAMING</span>
      </div>

      {/* Main Headline */}
      <h2 className="text-4xl sm:text-6xl font-black text-white text-center leading-tight mb-4 tracking-tight">
        JUST <span className="text-emerald-400">SPEAK.</span>
      </h2>

      <p className="text-base sm:text-xl text-slate-300 text-center max-w-2xl mb-8">
        Hands stay on the wrench. Technicians query the system conversationally in ambient plant noise.
      </p>

      {/* Center Mic & Active Waveform Visual */}
      <div className="w-full max-w-2xl p-8 rounded-3xl bg-[#0B1020]/90 border border-emerald-500/30 shadow-2xl relative overflow-hidden flex flex-col items-center gap-6">
        {/* Glow ambient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Pulsing Mic Icon */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20 animate-pulse">
            <Mic className="w-9 h-9" />
          </div>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
          </span>
        </div>

        {/* Live Animated Audio Waveform */}
        <div className="flex items-center justify-center gap-1.5 h-16 w-full max-w-lg px-4">
          {waveHeights.map((h, i) => (
            <div
              key={i}
              className="w-2 bg-gradient-to-t from-emerald-600 to-emerald-300 rounded-full transition-all duration-150 shadow-sm"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        {/* Technician Transcript Card */}
        <div className="w-full p-4 rounded-2xl bg-black/40 border border-white/[0.08] flex items-center gap-4">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
            Technician:
          </div>
          <div className="text-base sm:text-lg font-medium text-slate-100 italic">
            "VoxLens, the machine is showing error E17. What should I check?"
          </div>
        </div>

        {/* Voice Engine Subsystems */}
        <div className="grid grid-cols-3 gap-3 w-full text-center">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="text-xs text-slate-400 font-mono">Stream Pipeline</div>
            <div className="text-sm font-bold text-emerald-400">16 kHz PCM Low-Noise</div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="text-xs text-slate-400 font-mono">Intent Parser</div>
            <div className="text-sm font-bold text-white">Diagnostic Query</div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="text-xs text-slate-400 font-mono">Target Entity</div>
            <div className="text-sm font-bold text-[#00F0FF]">Fault Code E17</div>
          </div>
        </div>
      </div>
    </div>
  );
};

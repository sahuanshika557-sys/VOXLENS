import React from 'react';
import { Camera, Scan, Flame, Crosshair, Sparkles, ShieldCheck } from 'lucide-react';

export const VisionScene: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl mx-auto px-6 animate-fadeIn">
      {/* Scene Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-mono font-bold tracking-wider uppercase mb-4">
        <Scan className="w-3.5 h-3.5 animate-pulse" />
        <span>PROTOTYPE COMPUTER VISION HUD</span>
      </div>

      {/* Main Headline */}
      <h2 className="text-4xl sm:text-6xl font-black text-white text-center leading-tight mb-4 tracking-tight">
        SEE THE <span className="text-[#00F0FF]">MACHINE.</span>
      </h2>

      <p className="text-base sm:text-xl text-slate-300 text-center max-w-3xl mb-8">
        Optical telemetry adds visual ground truth — identifying equipment serials, reading error displays, and detecting anomalies.
      </p>

      {/* Simulated Camera HUD Viewport */}
      <div className="w-full max-w-3xl h-[340px] rounded-3xl bg-[#030712] border-2 border-[#00F0FF]/40 shadow-2xl relative overflow-hidden flex flex-col justify-between p-6">
        {/* Radar Scanning Line */}
        <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent opacity-80 animate-scanline pointer-events-none shadow-[0_0_15px_#00F0FF]" />

        {/* HUD Header Telemetry */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-xs font-mono font-bold text-slate-200 tracking-wider">
              CAM-01 · 60 FPS · 1080P PROTOTYPE STREAM
            </span>
          </div>
          <div className="text-xs font-mono font-extrabold text-[#00F0FF] bg-[#00F0FF]/15 px-3 py-1 rounded-lg border border-[#00F0FF]/30">
            OPTICAL OCR ACTIVE
          </div>
        </div>

        {/* Center Simulated Bounding Boxes */}
        <div className="relative flex-1 my-3 flex items-center justify-around z-10">
          {/* Target 1: Model Tag */}
          <div className="p-3.5 rounded-xl bg-black/60 border border-[#00F0FF] shadow-lg flex flex-col gap-1 backdrop-blur-sm animate-pulse">
            <div className="flex items-center gap-2 text-xs text-[#00F0FF] font-mono font-bold">
              <Crosshair className="w-3.5 h-3.5" />
              <span>EQUIPMENT TARGET</span>
            </div>
            <div className="text-lg font-extrabold text-white font-mono">
              VX-420 PACKAGING UNIT
            </div>
            <div className="text-[11px] font-mono text-emerald-400">
              99% MODEL MATCH · ASSEMBLY SECTOR 4
            </div>
          </div>

          {/* Target 2: Fault Display */}
          <div className="p-3.5 rounded-xl bg-black/60 border-2 border-red-500 shadow-lg flex flex-col gap-1 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs text-red-400 font-mono font-bold">
              <Flame className="w-3.5 h-3.5 animate-bounce" />
              <span>FAULT DISPLAY OCR</span>
            </div>
            <div className="text-2xl font-black text-red-400 font-mono tracking-widest">
              ERROR: E17
            </div>
            <div className="text-[11px] font-mono text-red-300">
              96% CONFIDENCE · 7-SEGMENT READOUT
            </div>
          </div>

          {/* Target 3: Thermal Anomaly */}
          <div className="p-3.5 rounded-xl bg-black/60 border border-amber-400 shadow-lg flex flex-col gap-1 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THERMAL SENSOR</span>
            </div>
            <div className="text-xl font-black text-amber-300 font-mono">
              88.4°C
            </div>
            <div className="text-[11px] font-mono text-amber-200">
              +23.4°C ABOVE THRESHOLD
            </div>
          </div>
        </div>

        {/* HUD Bottom Status */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-t border-white/[0.1] pt-3 z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Telemetry Verified: 3 Anomalies Isolated</span>
          </div>
          <div className="text-[#00F0FF]">
            PROTOTYPE VISION ANALYSIS
          </div>
        </div>
      </div>
    </div>
  );
};

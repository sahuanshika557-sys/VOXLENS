import React from 'react';
import { 
  Cpu, 
  Sparkles, 
  ShieldAlert, 
  Radio, 
  AlertTriangle, 
  BookOpen, 
  Wrench, 
  Camera, 
  Scan, 
  Flame, 
  Crosshair, 
  CheckCircle2, 
  ArrowRight, 
  Boxes, 
  Lock, 
  UserCheck, 
  History, 
  Play, 
  RotateCcw,
  Zap,
  Clock,
  Layers
} from 'lucide-react';
import { CinematicSceneDef, StoryLanguage, SceneTranslation } from './types';

interface StorySceneRendererProps {
  scene: CinematicSceneDef;
  language: StoryLanguage;
  onEnterLiveRepair: () => void;
  onReplayStory: () => void;
}

export const StorySceneRenderer: React.FC<StorySceneRendererProps> = ({
  scene,
  language,
  onEnterLiveRepair,
  onReplayStory
}) => {
  const trans: SceneTranslation = scene.translations[language] || scene.translations.en;

  switch (scene.id) {
    // ----------------------------------------------------
    // SCENE 01: OPENING / PROLOGUE
    // ----------------------------------------------------
    case 1:
      return (
        <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-6 animate-fadeIn py-6">
          <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-3xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 animate-pulse" />
            <div className="absolute inset-2 rounded-2xl bg-[#050914] border border-white/[0.1] flex items-center justify-center shadow-2xl">
              <Cpu className="w-12 h-12 text-[#00E5FF] animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#00E5FF]"></span>
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-mono font-bold tracking-widest uppercase mb-4">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>{trans.tag}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight mb-4 max-w-4xl">
            {trans.headline}
          </h1>

          <p className="text-lg sm:text-2xl text-slate-300 font-medium max-w-3xl leading-relaxed mb-8">
            {trans.supporting}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mt-2">
            <div className="p-4 rounded-2xl bg-[#08111F] border border-white/[0.08] text-center">
              <div className="text-[#00E5FF] text-xs font-mono font-bold uppercase mb-1">01 · VISION</div>
              <div className="text-sm font-semibold text-white">See the fault</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#08111F] border border-white/[0.08] text-center">
              <div className="text-emerald-400 text-xs font-mono font-bold uppercase mb-1">02 · VOICE</div>
              <div className="text-sm font-semibold text-white">Hear the fix</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#08111F] border border-white/[0.08] text-center">
              <div className="text-amber-400 text-xs font-mono font-bold uppercase mb-1">03 · AGENT</div>
              <div className="text-sm font-semibold text-white">Let the agent act</div>
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // SCENE 02: THE BOTTLENECK / PROBLEM
    // ----------------------------------------------------
    case 2:
      return (
        <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-6 animate-fadeIn py-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold tracking-wider uppercase mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{trans.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4 tracking-tight max-w-4xl">
            {trans.headline}
          </h2>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed mb-8">
            {trans.supporting}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full text-left">
            <div className="p-5 rounded-2xl bg-[#08111F] border border-red-500/25 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="text-base font-bold text-white">500+ Page PDF Manuals</div>
              <div className="text-xs text-slate-400">Searching through dense wiring diagrams while wearing greasy safety gloves.</div>
              <div className="text-xs font-mono text-red-400 font-bold bg-red-500/10 px-2.5 py-1 rounded w-fit">~15-20 Min Wasted</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#08111F] border border-amber-500/25 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                <Radio className="w-5 h-5" />
              </div>
              <div className="text-base font-bold text-white">Phone Support Tag</div>
              <div className="text-xs text-slate-400">Trying to describe 7-segment error codes over noisy plant machinery noise.</div>
              <div className="text-xs font-mono text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded w-fit">~10-15 Min Wait</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#08111F] border border-red-500/25 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center">
                <Wrench className="w-5 h-5" />
              </div>
              <div className="text-base font-bold text-white">Disconnected Parts ERP</div>
              <div className="text-xs text-slate-400">Walking back to the office bay terminal to verify stock and type descriptions.</div>
              <div className="text-xs font-mono text-red-400 font-bold bg-red-500/10 px-2.5 py-1 rounded w-fit">~15 Min CMMS Delay</div>
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // SCENE 03: VOXLENS ARRIVES / VISION HUD
    // ----------------------------------------------------
    case 3:
      return (
        <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-6 animate-fadeIn py-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-mono font-bold tracking-wider uppercase mb-4">
            <Scan className="w-3.5 h-3.5 animate-pulse" />
            <span>{trans.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4 tracking-tight max-w-4xl">
            {trans.headline}
          </h2>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed mb-6">
            {trans.supporting}
          </p>

          <div className="w-full max-w-3xl h-[320px] rounded-3xl bg-[#02040A] border-2 border-[#00E5FF]/40 shadow-2xl relative overflow-hidden flex flex-col justify-between p-6">
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent opacity-80 animate-scanline pointer-events-none shadow-[0_0_15px_#00E5FF]" />

            <div className="flex items-center justify-between text-xs font-mono text-slate-300 z-10">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span>VISOR CAM-01 · 1080P PROTOTYPE FEED</span>
              </span>
              <span className="text-[#00E5FF] font-bold bg-[#00E5FF]/10 px-2.5 py-1 rounded">OPTICAL OCR ACTIVE</span>
            </div>

            <div className="flex items-center justify-around gap-4 z-10 my-auto flex-wrap">
              <div className="p-3.5 rounded-2xl bg-black/60 border border-[#00E5FF] shadow-lg flex flex-col gap-1 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-xs text-[#00E5FF] font-mono font-bold">
                  <Crosshair className="w-3.5 h-3.5" />
                  <span>MODEL IDENTIFIED</span>
                </div>
                <div className="text-base font-extrabold text-white font-mono">VX-420 UNIT</div>
                <div className="text-[11px] font-mono text-emerald-400">99% MATCH · SECTOR 4</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/60 border-2 border-red-500 shadow-lg flex flex-col gap-1 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-xs text-red-400 font-mono font-bold">
                  <Flame className="w-3.5 h-3.5 animate-bounce" />
                  <span>OCR FAULT DISPLAY</span>
                </div>
                <div className="text-2xl font-black text-red-400 font-mono tracking-wider">ERROR: E17</div>
                <div className="text-[11px] font-mono text-red-300">96% CONFIDENCE</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/60 border border-amber-400 shadow-lg flex flex-col gap-1 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>THERMAL SENSOR</span>
                </div>
                <div className="text-xl font-black text-amber-300 font-mono">88.4°C</div>
                <div className="text-[11px] font-mono text-amber-200">+23.4°C OVERHEAT</div>
              </div>
            </div>

            <div className="text-xs font-mono text-slate-400 border-t border-white/[0.1] pt-2.5 flex items-center justify-between z-10">
              <span className="text-emerald-400 font-bold">✓ Visual Ground Truth Established</span>
              <span className="text-slate-500">(PROTOTYPE VISION ANALYSIS)</span>
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // SCENE 04: THREE STREAMS FUSION
    // ----------------------------------------------------
    case 4:
      return (
        <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-6 animate-fadeIn py-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 via-[#00E5FF]/20 to-amber-500/20 border border-white/[0.2] text-[#00E5FF] text-xs font-mono font-bold tracking-wider uppercase mb-4">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>{trans.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4 tracking-tight max-w-4xl">
            {trans.headline}
          </h2>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed mb-8">
            {trans.supporting}
          </p>

          <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-4 text-left">
            <div className="p-5 rounded-2xl bg-[#08111F] border-2 border-emerald-500/40 flex flex-col justify-between shadow-lg">
              <div>
                <div className="text-xs font-mono font-bold text-emerald-400 mb-1">01 · VOICE STREAM</div>
                <div className="text-base font-bold text-white mb-2">"Check error E17"</div>
                <p className="text-xs text-slate-400 leading-relaxed">Spoken intent decoded via 16 kHz stream parser.</p>
              </div>
              <div className="mt-4 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded w-fit">16 kHz Stream</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#08111F] border-2 border-[#00E5FF]/40 flex flex-col justify-between shadow-lg">
              <div>
                <div className="text-xs font-mono font-bold text-[#00E5FF] mb-1">02 · VISION TELEMETRY</div>
                <div className="text-base font-bold text-white mb-2">E17 Readout + 88.4°C</div>
                <p className="text-xs text-slate-400 leading-relaxed">OCR 7-segment readout &amp; thermal anomaly isolated.</p>
              </div>
              <div className="mt-4 text-[11px] font-mono text-[#00E5FF] bg-[#00E5FF]/10 px-2.5 py-1 rounded w-fit">96% Confirmed</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#08111F] border-2 border-amber-500/40 flex flex-col justify-between shadow-lg">
              <div>
                <div className="text-xs font-mono font-bold text-amber-400 mb-1">03 · MANUAL EVIDENCE</div>
                <div className="text-base font-bold text-white mb-2">Manual §4.3 (P.42)</div>
                <p className="text-xs text-slate-400 leading-relaxed">Dense vector RAG matches exact OEM motor procedure.</p>
              </div>
              <div className="mt-4 text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded w-fit">0.94 Similarity</div>
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // SCENE 05: THE INTELLIGENCE MOMENT
    // ----------------------------------------------------
    case 5:
      return (
        <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-6 animate-fadeIn py-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-mono font-bold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{trans.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4 tracking-tight max-w-4xl">
            {trans.headline}
          </h2>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed mb-6">
            {trans.supporting}
          </p>

          <div className="w-full max-w-3xl rounded-3xl bg-[#08111F] border-2 border-[#00E5FF]/50 p-6 sm:p-8 text-left shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.1] pb-3">
              <span className="text-base font-extrabold text-white">Grounded Diagnostic Recommendation</span>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-md border border-emerald-500/30">
                94% GROUNDED (OEM MANUAL §4.3)
              </span>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="text-xs font-mono font-bold text-amber-400 uppercase mb-1">Likely Root Cause</div>
              <div className="text-sm font-semibold text-slate-100">
                Axial cooling fan impeller seized or obstructed, causing 88.4°C thermal trip on motor core.
              </div>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-slate-200">
              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08] flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF] font-mono font-black flex items-center justify-center text-xs">01</span>
                <span>Follow Lockout/Tagout (LOTO SW-1) before removing fan cowl.</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08] flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF] font-mono font-black flex items-center justify-center text-xs">02</span>
                <span>Inspect axial fan #VX-CF42 for particulate blockage or bearing wear.</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08] flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF] font-mono font-black flex items-center justify-center text-xs">03</span>
                <span>Verify Terminal Block TB-2 torque spec (1.2 Nm) and winding resistance.</span>
              </div>
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // SCENE 06: THE AGENT ACTS
    // ----------------------------------------------------
    case 6:
      return (
        <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-6 animate-fadeIn py-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-mono font-bold tracking-wider uppercase mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>{trans.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4 tracking-tight max-w-4xl">
            {trans.headline}
          </h2>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed mb-6">
            {trans.supporting}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl text-left">
            <div className="p-5 rounded-2xl bg-[#08111F] border border-[#00E5FF]/30 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-slate-400 mb-1">CMMS ACTION STAGED</div>
                <div className="text-base font-extrabold text-white mb-2">Create Work Order #TCK-2026-881</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Auto-populated with E17 optical CV telemetry, 88.4°C thermal log, and OEM manual citation §4.3.
                </p>
              </div>
              <div className="mt-4 text-xs font-mono font-bold text-[#00E5FF] bg-[#00E5FF]/10 px-3 py-1 rounded-lg w-fit">
                Priority 1 Work Order
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#08111F] border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-slate-400 mb-1">STOCKROOM QUERY</div>
                <div className="text-base font-extrabold text-white mb-2">Part #VX-CF42 (Cooling Fan)</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Located in Bay 4 Stockroom (Shelf B2). Reserved pending technician sign-off.
                </p>
              </div>
              <div className="mt-4 text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg w-fit">
                3 Units Available
              </div>
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // SCENE 07: HUMAN SAFETY GATE
    // ----------------------------------------------------
    case 7:
      return (
        <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-6 animate-fadeIn py-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold tracking-wider uppercase mb-4 animate-pulse">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>{trans.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4 tracking-tight max-w-4xl">
            {trans.headline}
          </h2>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed mb-6">
            {trans.supporting}
          </p>

          <div className="w-full max-w-2xl rounded-3xl bg-[#08111F] border-2 border-amber-500 shadow-2xl p-6 sm:p-7 text-left space-y-4">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">LEVEL 2 FINANCIAL COMMITMENT</div>
                  <div className="text-xs font-mono text-amber-400">AWAITING AUTHORIZATION</div>
                </div>
              </div>
              <span className="text-xl font-black text-amber-400 font-mono">$245.00 USD</span>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40">
                <span className="text-slate-400">Requested Action:</span>
                <span className="text-white font-bold">Reserve Replacement Fan #VX-CF42</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40">
                <span className="text-slate-400">Evidence:</span>
                <span className="text-[#00E5FF]">E17 OCR + 88.4°C + Manual §4.3</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center">
              <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20">
                <UserCheck className="w-4 h-4" />
                <span>AUTHORIZE &amp; DISPATCH ($245.00)</span>
              </div>
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // SCENE 08: SESSION MEMORY
    // ----------------------------------------------------
    case 8:
      return (
        <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-6 animate-fadeIn py-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase mb-4">
            <History className="w-3.5 h-3.5" />
            <span>{trans.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4 tracking-tight max-w-4xl">
            {trans.headline}
          </h2>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed mb-6">
            {trans.supporting}
          </p>

          <div className="w-full max-w-2xl rounded-3xl bg-[#08111F] border border-white/[0.1] p-6 text-left space-y-3">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase border-b border-white/[0.08] pb-2">
              SESSION #VX-2048 · "WHAT WE ALREADY TRIED"
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-slate-200">
              <div className="p-2.5 rounded-xl bg-black/40 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>10:31 — Voice Query decoded &amp; intent mapped</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>10:32 — Optical CV isolated Error E17 &amp; VX-420 Unit</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>10:34 — Grounded in OEM Manual §4.3 (P.42)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>10:36 — Ticket #TCK-2026-881 &amp; Fan #VX-CF42 authorized</span>
              </div>
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------
    // SCENE 09: FINALE / ENTER VOXLENS
    // ----------------------------------------------------
    case 9:
    default:
      return (
        <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-6 animate-fadeIn py-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00E5FF]/15 border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-mono font-bold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{trans.tag}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight mb-4 max-w-4xl">
            {trans.headline}
          </h1>

          <p className="text-lg sm:text-2xl text-slate-300 font-medium max-w-3xl leading-relaxed mb-8">
            {trans.supporting}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={onEnterLiveRepair}
              className="px-9 py-4 rounded-2xl bg-gradient-to-r from-[#00E5FF] to-emerald-400 hover:from-[#33EDFF] hover:to-emerald-300 text-[#02040A] font-black text-base flex items-center gap-3 shadow-2xl hover:scale-105 transition-transform cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>ENTER VOXLENS COPILOT</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onReplayStory}
              className="px-6 py-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.15] text-slate-200 font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Replay Film</span>
            </button>
          </div>
        </div>
      );
  }
};

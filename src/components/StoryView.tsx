import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Cpu, 
  ShieldCheck, 
  Zap,
  Play
} from 'lucide-react';
import { QuoteReveal } from './common/QuoteReveal';

export const StoryView: React.FC<{
  onLaunchLiveRepair: () => void;
  onOpenCinematicStory?: () => void;
}> = ({ onLaunchLiveRepair, onOpenCinematicStory }) => {
  return (
    <div className="flex flex-col h-full bg-[#02040A] p-6 sm:p-10 gap-8 overflow-y-auto max-w-6xl mx-auto w-full justify-center">
      {/* Branding & Cinematic Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-xs font-mono font-bold text-[#00E5FF]">
          <Sparkles className="w-4 h-4 text-[#00E5FF]" />
          <span>TEAM: VOXNOVA · PROBLEM STATEMENT PS-05</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          "See the fault. Hear the fix.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-emerald-400">
            Let the agent handle the next step.
          </span>"
        </h1>

        <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          VoxLens unites real-time voice, live computer vision, grounded RAG manuals, and human-in-the-loop agentic tool execution for industrial field service technicians.
        </p>

        {onOpenCinematicStory && (
          <div className="pt-2">
            <button
              onClick={onOpenCinematicStory}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00E5FF] via-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-[#02040A] font-black text-sm tracking-wider shadow-2xl shadow-[#00E5FF]/20 hover:scale-105 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>WATCH 90-SEC CINEMATIC PRODUCT FILM</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Before vs After Visual Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* BEFORE Card */}
        <div className="p-7 rounded-3xl bg-[#050914] border border-white/[0.08] space-y-6 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-[#FF4057] uppercase tracking-wider bg-[#FF4057]/10 px-3 py-1 rounded-lg border border-[#FF4057]/20">
                Legacy Manual Workflow
              </span>
              <span className="text-xs font-mono text-slate-500">~45–60 Minutes</span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">
              Manual Friction & Plant Downtime
            </h2>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-[#FF4057] shrink-0 mt-0.5" />
                <span>Manual search through 500-page dense PDF service manuals while holding heavy tools.</span>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-[#FF4057] shrink-0 mt-0.5" />
                <span>Phone calls with remote senior engineers to interpret ambiguous 7-segment error codes.</span>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-[#FF4057] shrink-0 mt-0.5" />
                <span>Redundant diagnostic steps repeated because session memory is lost between shifts.</span>
              </div>
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-[#FF4057] shrink-0 mt-0.5" />
                <span>Disconnected ERP parts ordering requiring technician to walk back to bay terminal.</span>
              </div>
            </div>
          </div>

          <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Plant Mean Downtime:</span>
            <span className="text-[#FF4057] font-bold">~45 Min / Incident</span>
          </div>
        </div>

        {/* AFTER Card */}
        <div className="p-7 rounded-3xl bg-[#08111F] border border-[#00E5FF]/40 space-y-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-wider bg-[#00E5FF]/10 px-3 py-1 rounded-lg border border-[#00E5FF]/30">
                VoxLens AI Copilot
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">&lt; 45 Seconds (Target)</span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">
              Real-Time Multimodal Execution
            </h2>

            <div className="space-y-4 text-sm text-slate-100">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Hands-Free Voice & Vision:</strong> Point camera and speak naturally to diagnose fault in real time.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Grounded RAG Retrieval:</strong> Exact OEM manual section, page number, and torque specs matched in 145ms.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Autonomous Agent Tools:</strong> Instant stockroom inventory check and CMMS work order drafting.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>1-Click Safety Gate:</strong> Human technician verifies financial commitment before automatic dispatch.</span>
              </div>
            </div>
          </div>

          <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-300">
            <span>Diagnostic & Dispatch Time:</span>
            <span className="text-emerald-400 font-bold">&lt; 45 Seconds (Prototype Target)</span>
          </div>
        </div>
      </div>

      {/* Quote Insight Reveal */}
      <QuoteReveal quoteKey="q3" />

      {/* Launch CTA */}
      <div className="text-center pt-2">
        <button
          onClick={onLaunchLiveRepair}
          className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-[#00E5FF] hover:bg-[#38BDF8] text-[#02040A] font-black text-sm tracking-wider shadow-2xl shadow-[#00E5FF]/20 hover:scale-105 transition-all cursor-pointer"
        >
          <span>LAUNCH LIVE REPAIR COMMAND CENTER</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

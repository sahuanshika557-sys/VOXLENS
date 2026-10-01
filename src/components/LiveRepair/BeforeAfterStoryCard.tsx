import React from 'react';
import { Sparkles, Clock, Zap, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

interface BeforeAfterStoryCardProps {
  onWatchStory?: () => void;
}

export const BeforeAfterStoryCard: React.FC<BeforeAfterStoryCardProps> = ({ onWatchStory }) => {
  return (
    <div className="w-full rounded-3xl bg-gradient-to-r from-[#080E1E] via-[#050914] to-[#0D0A1C] border border-white/[0.1] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Background ambient gradient highlights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00E5FF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OPERATIONAL TRANSFORMATION STORY</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            From Manual Frustration to Real-Time AI Autonomy
          </h3>
        </div>

        {onWatchStory && (
          <button
            onClick={onWatchStory}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00E5FF]/15 hover:bg-[#00E5FF]/25 border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-mono font-bold transition-all cursor-pointer shadow-lg hover:scale-105"
          >
            <span>WATCH 90s FILM</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* BEFORE CARD */}
        <div className="p-6 rounded-2xl bg-red-950/15 border border-red-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-mono font-black text-red-400 uppercase tracking-wider">
                TRADITIONAL FIELD SERVICE
              </span>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-lg">
                <Clock className="w-3.5 h-3.5" />
                <span>45–60 MIN</span>
              </div>
            </div>

            <div className="text-2xl font-black text-white font-mono mb-4">
              Manual Diagnosis &amp; Ticketing
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 text-xs text-slate-300">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>Search 200-page PDF OEM manuals on greasy paper / phone</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-300">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>Call offsite supervisor for diagnostic approval on radio</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-300">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>Walk 15 minutes to stockroom to search ERP bins manually</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-300">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>Type maintenance work order ticket on terminal back at desk</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-red-500/20 text-xs font-mono text-red-300/80">
            Downtime Cost: ~$1,850/hr on Line 3
          </div>
        </div>

        {/* AFTER CARD (VOXLENS) */}
        <div className="p-6 rounded-2xl bg-[#00E5FF]/5 border-2 border-[#00E5FF]/40 flex flex-col justify-between relative shadow-xl shadow-[#00E5FF]/5">
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#00E5FF] text-slate-950 text-[10px] font-mono font-black uppercase tracking-wider">
            VOXLENS COPILOT
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono font-black text-[#00E5FF] uppercase tracking-wider">
                REAL-TIME MULTIMODAL AI
              </span>
              <div className="flex items-center gap-1.5 text-xs font-mono font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                <Zap className="w-3.5 h-3.5" />
                <span>45 SECONDS</span>
              </div>
            </div>

            <div className="text-2xl font-black text-white font-mono mb-4">
              See · Hear · Authorize · Done
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                <span><strong>SEE:</strong> Optical CV OCR instantly identifies fault E17 + 88.4°C thermal anomaly</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                <span><strong>UNDERSTAND:</strong> Dense vector RAG retrieves exact §4.3 manual step in 28ms</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                <span><strong>RECOMMEND:</strong> Voice Copilot explains fan inspection in native audio</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                <span><strong>ACT:</strong> Autonomous agent stages part #VX-CF42 for 1-click human sign-off</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#00E5FF]/20 flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-400 font-bold">98% Reduction in TTR</span>
            <span className="text-[#00E5FF]">Grounded Duplex AI</span>
          </div>
        </div>
      </div>
    </div>
  );
};

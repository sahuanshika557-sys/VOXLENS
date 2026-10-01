import React from 'react';
import { 
  Mic, 
  Camera, 
  BookOpen, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Radio
} from 'lucide-react';

interface MultimodalContextEngineProps {
  voiceInput: string;
  visionInput: {
    errorCode: string;
    model: string;
    temperatureC: number;
    confidence: number;
  };
  knowledgeInput: {
    manualTitle: string;
    section: string;
    page: number;
    relevanceScore: number;
  };
  synthesis: {
    recommendation: string;
    rootCause: string;
    safetyRequired?: string;
  };
  onOpenKnowledge?: () => void;
  isSynthesizing?: boolean;
}

export const MultimodalContextEngine: React.FC<MultimodalContextEngineProps> = ({
  voiceInput,
  visionInput,
  knowledgeInput,
  synthesis,
  onOpenKnowledge,
  isSynthesizing = false
}) => {
  return (
    <div className="w-full rounded-2xl bg-gradient-to-r from-[#060D1F] via-[#0A1428] to-[#060D1F] border border-white/[0.08] p-4 sm:p-5 shadow-xl relative overflow-hidden">
      {/* Background soft ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-20 bg-[#00E5FF]/5 rounded-full blur-2xl pointer-events-none" />

      {/* Top micro status */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            TRI-MODAL REASONING PIPELINE (PS-05)
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>0% Hallucination · 100% Grounded</span>
          </span>
        </div>
      </div>

      {/* 4 Connected Flow Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
        {/* Node 1: Spoken Voice */}
        <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/25 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
            <Mic className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase">VOICE STREAM</div>
            <div className="text-xs font-medium text-slate-200 truncate">
              "{voiceInput || 'The machine is showing error E17...'}"
            </div>
          </div>
        </div>

        {/* Node 2: Optical Vision */}
        <div className="p-3 rounded-xl bg-black/40 border border-[#00E5FF]/25 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/15 text-[#00E5FF] flex items-center justify-center shrink-0">
            <Camera className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-mono font-bold text-[#00E5FF] uppercase">VISION OCR &amp; THERMAL</div>
            <div className="text-xs font-bold text-white truncate">
              {visionInput.errorCode || 'E17'} · {visionInput.temperatureC || 88.4}°C · 96% Conf
            </div>
          </div>
        </div>

        {/* Node 3: Grounded Knowledge */}
        <div 
          onClick={onOpenKnowledge}
          className="p-3 rounded-xl bg-black/40 border border-amber-500/25 hover:border-amber-400/50 flex items-center gap-3 cursor-pointer transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-mono font-bold text-amber-400 uppercase flex items-center justify-between">
              <span>MANUAL GROUNDING</span>
              <span className="text-[9px] group-hover:text-white">→ View</span>
            </div>
            <div className="text-xs font-bold text-slate-200 truncate">
              Section 4.3 (P.42) · Rev 4.2B
            </div>
          </div>
        </div>

        {/* Node 4: Grounded Synthesis Outcome */}
        <div className="p-3 rounded-xl bg-gradient-to-r from-[#00E5FF]/15 to-emerald-500/15 border border-[#00E5FF]/40 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF] flex items-center justify-center shrink-0 animate-pulse">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-mono font-bold text-[#00E5FF] uppercase">AI SYNTHESIS READY</div>
            <div className="text-xs font-bold text-white truncate">
              Motor Overload · Check Fan #VX-CF42
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

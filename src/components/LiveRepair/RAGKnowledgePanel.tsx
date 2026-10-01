import React from 'react';
import { BookOpen, ExternalLink, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { ManualCitation } from '../../types';

interface RAGKnowledgePanelProps {
  onOpenKnowledge?: () => void;
  selectedCitation?: ManualCitation | null;
}

export const RAGKnowledgePanel: React.FC<RAGKnowledgePanelProps> = ({
  onOpenKnowledge,
  selectedCitation
}) => {
  return (
    <div className="w-full rounded-2xl bg-[#060B16] border border-white/[0.08] p-5 shadow-xl relative overflow-hidden flex flex-col justify-between">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-black text-purple-400 uppercase tracking-widest">
              GROUNDED EVIDENCE
            </div>
            <h4 className="text-sm font-black text-white font-mono">
              KNOWLEDGE GROUNDING (RAG)
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/30 text-[11px] font-mono font-bold text-purple-300">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
          <span>VECTOR MATCH: 94.7%</span>
        </div>
      </div>

      {/* Manual Metadata Strip */}
      <div className="grid grid-cols-2 gap-2.5 mb-3.5 text-xs font-mono">
        <div className="p-2.5 rounded-xl bg-[#0B1220] border border-white/[0.06]">
          <span className="text-[10px] text-slate-400 uppercase block mb-0.5">OEM MANUAL</span>
          <span className="text-white font-bold truncate block">VX-420 SERVICE MANUAL</span>
          <span className="text-[10px] text-slate-400">REV 4.2B · JUNE 2026</span>
        </div>

        <div className="p-2.5 rounded-xl bg-[#0B1220] border border-purple-500/30">
          <span className="text-[10px] text-purple-400 uppercase block mb-0.5">MATCH CITATION</span>
          <span className="text-[#00F0FF] font-bold block">SECTION 4.3</span>
          <span className="text-[10px] text-slate-300">PAGE 42 · DIAGNOSTICS</span>
        </div>
      </div>

      {/* Miniature Document Preview with highlight */}
      <div className="p-3.5 rounded-xl bg-[#030712] border border-white/[0.08] relative mb-3.5 shadow-inner">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-white/[0.06] pb-1.5 mb-2">
          <span>OEM MANUAL EXCERPT [§4.3 — MOTOR THERMAL TRIP]</span>
          <span className="text-emerald-400 font-bold">VERIFIED EVIDENCE</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed font-mono">
          "Fault code <mark className="bg-red-500/30 text-red-200 px-1 py-0.5 rounded">E17 indicates stator core thermal overload (&gt;75.0°C)</mark>. Check axial cooling fan shroud (#VX-CF42) for particulate binding and verify Terminal Block <mark className="bg-[#00F0FF]/25 text-[#00F0FF] px-1 py-0.5 rounded">TB-2 screw torque spec (2.8 Nm)</mark> before replacing the drive assembly."
        </p>
      </div>

      {/* Action to view full evidence */}
      {onOpenKnowledge && (
        <button
          onClick={onOpenKnowledge}
          className="w-full py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>VIEW FULL TECHNICAL MANUAL (§4.3)</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};

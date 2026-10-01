import React from 'react';
import { 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  Cpu,
  BarChart3,
  Activity,
  Zap
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-[#050816] p-6 sm:p-8 gap-7 overflow-y-auto max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-5 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Agent Performance & Reliability Analytics
            </h1>
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/15 px-3 py-1 rounded-lg border border-amber-500/30">
              PROTOTYPE / DEMO METRICS
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Real-Time Multimodal Diagnostic Accuracy & Plant Maintenance Metrics
          </p>
        </div>
      </div>

      {/* 4 Large Hero KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-7 rounded-3xl bg-[#0B1020] border border-white/[0.1] space-y-2 shadow-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>First-Time Fix Rate</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-4xl sm:text-5xl font-black font-mono text-emerald-400">
            92.4%
          </div>
          <span className="text-xs text-slate-400 block pt-1 border-t border-white/[0.04]">
            +24.4% vs unassisted manual average
          </span>
        </div>

        <div className="p-7 rounded-3xl bg-[#0B1020] border border-white/[0.1] space-y-2 shadow-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>Mean Time to Repair</span>
            <Clock className="w-5 h-5 text-[#22D3EE]" />
          </div>
          <div className="text-4xl sm:text-5xl font-black font-mono text-[#22D3EE]">
            14.2 <span className="text-base font-sans font-bold text-slate-400">min</span>
          </div>
          <span className="text-xs text-slate-400 block pt-1 border-t border-white/[0.04]">
            71% reduction in total line downtime
          </span>
        </div>

        <div className="p-7 rounded-3xl bg-[#0B1020] border border-white/[0.1] space-y-2 shadow-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>RAG Citation Accuracy</span>
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-4xl sm:text-5xl font-black font-mono text-purple-300">
            98.7%
          </div>
          <span className="text-xs text-slate-400 block pt-1 border-t border-white/[0.04]">
            Grounded OEM manual section match
          </span>
        </div>

        <div className="p-7 rounded-3xl bg-[#0B1020] border border-white/[0.1] space-y-2 shadow-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>Safety Gate Compliance</span>
            <ShieldCheck className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-4xl sm:text-5xl font-black font-mono text-amber-300">
            100%
          </div>
          <span className="text-xs text-slate-400 block pt-1 border-t border-white/[0.04]">
            0 unauthorized part requisitions
          </span>
        </div>
      </div>

      {/* Multimodal Latency Breakdown */}
      <div className="p-7 rounded-3xl bg-[#0B1020] border border-white/[0.1] space-y-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-[#22D3EE]" />
            <span className="text-sm font-extrabold text-white uppercase tracking-wider">
              Multimodal Processing Latency Budget (420 ms Total Round-Trip)
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-lg border border-emerald-500/30">
            Sub-500ms Real-Time SLM Target Met
          </span>
        </div>

        <div className="space-y-5 pt-1">
          <div>
            <div className="flex justify-between text-sm text-slate-200 mb-2 font-mono">
              <span className="font-semibold">Computer Vision OCR & Display Anomaly Localization</span>
              <span className="text-[#22D3EE] font-black">95 ms (23%)</span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div className="bg-[#22D3EE] h-full rounded-full" style={{ width: '23%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm text-slate-200 mb-2 font-mono">
              <span className="font-semibold">Dense Vector RAG Service Manual Index Retrieval</span>
              <span className="text-purple-400 font-black">145 ms (35%)</span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div className="bg-purple-400 h-full rounded-full" style={{ width: '35%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm text-slate-200 mb-2 font-mono">
              <span className="font-semibold">Agent Tool Reasoning & Tri-Modal Synthesis</span>
              <span className="text-amber-400 font-black">110 ms (26%)</span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full rounded-full" style={{ width: '26%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm text-slate-200 mb-2 font-mono">
              <span className="font-semibold">Web Speech Synthesis Stream Initial Chunk Delivery</span>
              <span className="text-emerald-400 font-black">70 ms (16%)</span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: '16%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

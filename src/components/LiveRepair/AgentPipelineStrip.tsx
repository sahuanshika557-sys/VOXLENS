import React from 'react';
import { CheckCircle2, Clock, Lock, Sparkles, Eye, Mic, BookOpen, BrainCircuit, Wrench, ShieldCheck } from 'lucide-react';

interface AgentPipelineStripProps {
  isScanning?: boolean;
  safetyPending?: boolean;
  currentStepIndex?: number;
}

export const AgentPipelineStrip: React.FC<AgentPipelineStripProps> = ({
  isScanning = false,
  safetyPending = true,
  currentStepIndex = 4
}) => {
  const pipelineSteps = [
    {
      id: '01',
      title: 'VISION SCAN',
      status: 'COMPLETE',
      icon: Eye,
      stateColor: 'text-emerald-400',
      nodeColor: 'border-emerald-500 bg-emerald-500/20 text-emerald-400',
      badge: '✓ COMPLETE'
    },
    {
      id: '02',
      title: 'VOICE INPUT',
      status: 'COMPLETE',
      icon: Mic,
      stateColor: 'text-emerald-400',
      nodeColor: 'border-emerald-500 bg-emerald-500/20 text-emerald-400',
      badge: '✓ COMPLETE'
    },
    {
      id: '03',
      title: 'RAG RETRIEVAL',
      status: 'COMPLETE',
      icon: BookOpen,
      stateColor: 'text-emerald-400',
      nodeColor: 'border-emerald-500 bg-emerald-500/20 text-emerald-400',
      badge: '✓ COMPLETE'
    },
    {
      id: '04',
      title: 'AI REASONING',
      status: 'COMPLETE',
      icon: BrainCircuit,
      stateColor: 'text-[#00F0FF]',
      nodeColor: 'border-[#00F0FF] bg-[#00F0FF]/20 text-[#00F0FF] shadow-lg shadow-[#00F0FF]/20',
      badge: '✓ COMPLETE'
    },
    {
      id: '05',
      title: 'TOOL ACTION',
      status: 'WAITING',
      icon: Wrench,
      stateColor: 'text-amber-400',
      nodeColor: 'border-amber-500 bg-amber-500/20 text-amber-400 animate-pulse',
      badge: '⌛ WAITING'
    },
    {
      id: '06',
      title: 'HUMAN APPROVAL',
      status: safetyPending ? 'LOCKED' : 'AUTHORIZED',
      icon: ShieldCheck,
      stateColor: safetyPending ? 'text-amber-300' : 'text-emerald-400',
      nodeColor: safetyPending ? 'border-amber-400 bg-amber-500/20 text-amber-300' : 'border-emerald-500 bg-emerald-500/20 text-emerald-400',
      badge: safetyPending ? '🔒 LOCKED' : '✓ AUTHORIZED'
    }
  ];

  return (
    <div className="w-full rounded-2xl bg-[#060B16] border border-white/[0.08] p-4 sm:p-5 shadow-xl">
      <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#00F0FF]" />
          <span className="text-xs font-mono font-black uppercase tracking-widest text-slate-200">
            AUTONOMOUS AGENT EXECUTION PIPELINE
          </span>
        </div>
        <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
          6 STEPS SYNCHRONIZED
        </span>
      </div>

      {/* Steps Pipeline Grid with connecting track */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative">
        {pipelineSteps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              className="p-3 rounded-xl bg-[#0B1220] border border-white/[0.06] flex flex-col justify-between relative group hover:border-[#00F0FF]/40 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-black text-slate-400">
                  {step.id}
                </span>
                <div className={`w-7 h-7 rounded-lg border flex items-center justify-center ${step.nodeColor}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <div className="text-xs font-mono font-black text-slate-100 mb-1 tracking-wide">
                  {step.title}
                </div>
                <div className={`text-[10px] font-mono font-extrabold ${step.stateColor}`}>
                  {step.badge}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

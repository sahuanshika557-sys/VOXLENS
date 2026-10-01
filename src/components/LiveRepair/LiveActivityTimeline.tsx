import React from 'react';
import { History, Eye, Thermometer, BookOpen, BrainCircuit, Lock, CheckCircle2 } from 'lucide-react';

export const LiveActivityTimeline: React.FC = () => {
  const events = [
    { time: '16:24:08', text: 'Vision detected E17 fault code', icon: Eye, color: 'text-red-400', dot: 'bg-red-400' },
    { time: '16:24:11', text: 'Thermal anomaly detected (88.4°C)', icon: Thermometer, color: 'text-amber-400', dot: 'bg-amber-400' },
    { time: '16:24:14', text: 'Manual Section 4.3 retrieved (94.7% match)', icon: BookOpen, color: 'text-[#00F0FF]', dot: 'bg-[#00F0FF]' },
    { time: '16:24:17', text: 'AI recommendation generated (Fan + TB-2)', icon: BrainCircuit, color: 'text-purple-400', dot: 'bg-purple-400' },
    { time: '16:24:21', text: 'Technician authorization requested ($245)', icon: Lock, color: 'text-amber-300', dot: 'bg-amber-300 animate-pulse' }
  ];

  return (
    <div className="w-full rounded-2xl bg-[#060B16] border border-white/[0.08] p-5 shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-[#00F0FF]" />
          <span className="text-xs font-mono font-black uppercase tracking-widest text-slate-200">
            LIVE ACTIVITY TIMELINE
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded">
          SESSION #VX-2048
        </span>
      </div>

      {/* Timeline Stream */}
      <div className="space-y-3 relative pl-4 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-white/[0.08]">
        {events.map((evt, idx) => {
          const Icon = evt.icon;
          return (
            <div key={idx} className="relative flex items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`w-2.5 h-2.5 rounded-full ${evt.dot} shrink-0 -ml-[19px] ring-2 ring-[#060B16]`} />
                <span className="text-slate-400 font-bold shrink-0">{evt.time}</span>
                <span className="text-slate-200 truncate">{evt.text}</span>
              </div>
              <Icon className={`w-3.5 h-3.5 shrink-0 ${evt.color}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

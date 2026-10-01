import React from 'react';
import { Eye, Mic, BookOpen, Layers, ShieldCheck, Zap } from 'lucide-react';
import { VoiceState } from '../../types';

interface TelemetryStripProps {
  voiceState?: VoiceState;
  isScanning?: boolean;
  safetyArmed?: boolean;
}

export const TelemetryStrip: React.FC<TelemetryStripProps> = ({
  voiceState = 'IDLE',
  isScanning = false,
  safetyArmed = true
}) => {
  const telemetryItems = [
    {
      label: 'VISION ENGINE',
      status: isScanning ? 'SCANNING' : 'ONLINE',
      icon: Eye,
      statusColor: isScanning ? 'text-[#00E5FF]' : 'text-emerald-400',
      dotColor: isScanning ? 'bg-[#00E5FF] animate-ping' : 'bg-emerald-400 animate-pulse'
    },
    {
      label: 'VOICE ENGINE',
      status: voiceState === 'LISTENING' ? 'LISTENING' : voiceState === 'PROCESSING' ? 'PROCESSING' : 'ONLINE',
      icon: Mic,
      statusColor: voiceState === 'LISTENING' ? 'text-red-400' : 'text-emerald-400',
      dotColor: voiceState === 'LISTENING' ? 'bg-red-400 animate-ping' : 'bg-emerald-400 animate-pulse'
    },
    {
      label: 'RAG KNOWLEDGE',
      status: 'GROUNDED (§4.3)',
      icon: BookOpen,
      statusColor: 'text-[#00E5FF]',
      dotColor: 'bg-[#00E5FF] animate-pulse'
    },
    {
      label: 'AGENT PIPELINE',
      status: 'READY',
      icon: Layers,
      statusColor: 'text-emerald-400',
      dotColor: 'bg-emerald-400 animate-pulse'
    },
    {
      label: 'SAFETY GATE',
      status: safetyArmed ? 'ARMED (LVL-2)' : 'DISARMED',
      icon: ShieldCheck,
      statusColor: safetyArmed ? 'text-amber-400' : 'text-slate-400',
      dotColor: safetyArmed ? 'bg-amber-400 animate-pulse' : 'bg-slate-400'
    },
    {
      label: 'LATENCY',
      status: '420ms',
      icon: Zap,
      statusColor: 'text-slate-200',
      dotColor: 'bg-[#00E5FF]'
    }
  ];

  return (
    <div className="w-full rounded-2xl bg-[#050914] border border-white/[0.08] p-3.5 sm:px-6 sm:py-3 shadow-xl backdrop-blur-md flex items-center justify-between overflow-x-auto gap-4 no-scrollbar">
      <div className="flex items-center gap-6 min-w-max w-full justify-between">
        {telemetryItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate-400 shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400">
                  {item.label}
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`w-2 h-2 rounded-full ${item.dotColor}`} />
                  <span className={`text-xs font-mono font-bold ${item.statusColor}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

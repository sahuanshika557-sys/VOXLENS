import React from 'react';
import { CheckCircle2, Crosshair, Zap, ShieldAlert, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const DashboardKPIs: React.FC = () => {
  const kpis = [
    {
      value: '98.4%',
      label: 'TASK COMPLETION',
      trend: '+4.2% vs manual baseline',
      trendPositive: true,
      subtext: 'First-time fix rate on Line 3',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/20'
    },
    {
      value: '99.1%',
      label: 'TOOL ACCURACY',
      trend: 'Zero false hallucinations',
      trendPositive: true,
      subtext: 'Grounded in OEM §4.3',
      icon: Crosshair,
      color: 'text-[#00E5FF]',
      borderColor: 'border-[#00E5FF]/20'
    },
    {
      value: '420ms',
      label: 'AI RESPONSE LATENCY',
      trend: '-78% faster than speech API',
      trendPositive: true,
      subtext: 'Edge SLM + Multimodal OCR',
      icon: Zap,
      color: 'text-purple-400',
      borderColor: 'border-purple-500/20'
    },
    {
      value: '12.2%',
      label: 'HUMAN INTERVENTION',
      trend: 'Financial & LOTO gated',
      trendPositive: true,
      subtext: 'Autonomous agent execution',
      icon: ShieldAlert,
      color: 'text-amber-400',
      borderColor: 'border-amber-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div
            key={idx}
            className={`p-6 rounded-3xl bg-[#050914] border ${kpi.borderColor} shadow-xl hover:border-white/[0.2] transition-all flex flex-col justify-between group`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-black text-slate-400 uppercase tracking-widest">
                  {kpi.label}
                </span>
                <div className="w-8 h-8 rounded-xl bg-white/[0.04] flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform">
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
              </div>

              {/* Large Primary Number */}
              <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight mb-2">
                {kpi.value}
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.06]">
              <div className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-400 mb-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{kpi.trend}</span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {kpi.subtext}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

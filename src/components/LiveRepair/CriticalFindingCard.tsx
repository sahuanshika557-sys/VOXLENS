import React from 'react';
import { AlertTriangle, Thermometer, ShieldAlert, ArrowRight, Eye, Wrench } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

interface CriticalFindingCardProps {
  errorCode?: string;
  temperatureC?: number;
  onOpenSafetyModal?: () => void;
  onOpenKnowledge?: () => void;
}

export const CriticalFindingCard: React.FC<CriticalFindingCardProps> = ({
  errorCode = 'E17',
  temperatureC = 88.4,
  onOpenSafetyModal,
  onOpenKnowledge
}) => {
  return (
    <div className="w-full rounded-3xl bg-gradient-to-br from-[#12080D] via-[#090C19] to-[#050914] border-2 border-red-500/40 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
      {/* Subtle warning glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header Badge */}
      <div className="flex items-center justify-between gap-4 mb-4 pb-3.5 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shadow-lg shadow-red-500/20">
            <AlertTriangle className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-[11px] font-mono font-black text-red-400 uppercase tracking-widest flex items-center gap-2">
              <span>CRITICAL FINDING</span>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-sans tracking-wide">
              {errorCode} Motor Thermal Overload
            </h3>
          </div>
        </div>

        {/* Confidence & Severity Pill */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-mono font-bold">
            96% CONFIDENCE
          </span>
        </div>
      </div>

      {/* Metrics & Anomaly Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-4">
        {/* Metric 1: Thermal Hotspot */}
        <div className="p-3.5 rounded-2xl bg-black/40 border border-red-500/30 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              Thermal Anomaly
            </span>
            <span className="text-2xl font-black text-red-400 font-mono">
              {temperatureC}°C
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center text-red-400">
            <Thermometer className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 2: Baseline Delta */}
        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.08] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              Safety Threshold
            </span>
            <span className="text-lg font-bold text-amber-300 font-mono">
              +13.4°C Limit
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-white/[0.06] px-2 py-1 rounded">
            Nom: &le;75.0°C
          </span>
        </div>

        {/* Metric 3: Airflow Restriction */}
        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.08] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              Airflow Velocity
            </span>
            <span className="text-lg font-bold text-red-400 font-mono">
              1.2 L/min
            </span>
          </div>
          <span className="text-xs font-mono text-red-400/90 bg-red-500/10 px-2 py-1 rounded">
            -73% Restriction
          </span>
        </div>
      </div>

      {/* Root Cause Diagnosis & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#08111F]/80 border border-white/[0.08]">
        <div className="space-y-1">
          <div className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>AI Multimodal Assessment:</span>
          </div>
          <p className="text-sm font-medium text-slate-200">
            Detected: Possible cooling airflow restriction. Impeller particulate drag or stalled fan #VX-CF42.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
          {onOpenKnowledge && (
            <button
              onClick={onOpenKnowledge}
              className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono font-bold text-slate-200 transition-colors cursor-pointer"
            >
              OEM Manual §4.3
            </button>
          )}

          {onOpenSafetyModal && (
            <button
              onClick={() => {
                soundEngine.playMicOn();
                onOpenSafetyModal();
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-black flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:scale-105"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Review Action ($245)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

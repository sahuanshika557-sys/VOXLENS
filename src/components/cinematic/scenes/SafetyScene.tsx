import React from 'react';
import { ShieldAlert, DollarSign, Lock, CheckCircle2, UserCheck, AlertOctagon } from 'lucide-react';

export const SafetyScene: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl mx-auto px-6 animate-fadeIn">
      {/* Scene Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold tracking-wider uppercase mb-4 animate-pulse">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
        <span>LEVEL 2 FINANCIAL SAFETY GATE</span>
      </div>

      {/* Main Headline */}
      <h2 className="text-4xl sm:text-6xl font-black text-white text-center leading-tight mb-4 tracking-tight">
        AI CAN ACT.<br />
        <span className="text-amber-400">HUMANS STAY IN CONTROL.</span>
      </h2>

      <p className="text-base sm:text-xl text-slate-300 text-center max-w-3xl mb-8">
        Actions with financial or operational consequences pause at an audited safety gate requiring explicit technician authorization.
      </p>

      {/* Amber Safety Gate Card */}
      <div className="w-full max-w-2xl rounded-3xl bg-[#0B1020] border-2 border-amber-500 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
        {/* Top Warning Stripe */}
        <div className="flex items-center justify-between border-b border-amber-500/30 pb-4 mb-6 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40 animate-pulse">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-white">
                FINANCIAL COMMITMENT GATE
              </div>
              <div className="text-xs font-mono text-amber-400">
                AWAITING TECHNICIAN / SUPERVISOR SIGN-OFF
              </div>
            </div>
          </div>
          <div className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/30">
            LEVEL 2 ACTION
          </div>
        </div>

        {/* Action Details Table */}
        <div className="space-y-3 mb-6 font-mono text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-black/50 border border-white/[0.08]">
            <span className="text-slate-400">Target Action:</span>
            <span className="text-white font-bold">Request Replacement Axial Cooling Fan</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-black/50 border border-white/[0.08]">
            <span className="text-slate-400">Part SKU / Stock:</span>
            <span className="text-emerald-400 font-bold">#VX-CF42 (Bay 4 · Shelf B2)</span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/40">
            <span className="text-amber-300 font-bold">Financial Allocation:</span>
            <span className="text-2xl font-black text-amber-400">$245.00 USD</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-black/50 border border-white/[0.08]">
            <span className="text-slate-400">Grounded Evidence:</span>
            <span className="text-[#00F0FF]">E17 OCR + 88.4°C Thermal + Manual §4.3</span>
          </div>
        </div>

        {/* Authorization Button Simulation */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20">
            <UserCheck className="w-4 h-4" />
            <span>AUTHORIZE &amp; DISPATCH ($245.00)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

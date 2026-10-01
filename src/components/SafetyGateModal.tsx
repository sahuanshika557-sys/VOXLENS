import React, { useState } from 'react';
import { 
  Lock, 
  CheckCircle2, 
  XCircle, 
  X, 
  ArrowRight, 
  DollarSign, 
  Package, 
  BookOpen, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SafetyGateRequest } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface SafetyGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  safetyGate: SafetyGateRequest;
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  onReviewEvidence?: () => void;
}

export const SafetyGateModal: React.FC<SafetyGateModalProps> = ({
  isOpen,
  onClose,
  safetyGate,
  onApprove,
  onReject,
  onReviewEvidence
}) => {
  const [rejectReason, setRejectReason] = useState<string>('');
  const [showRejectInput, setShowRejectInput] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleApproveAction = () => {
    soundEngine.playSuccess();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
    onApprove(safetyGate.id);
    onClose();
  };

  const handleRejectAction = () => {
    soundEngine.playAlert();
    onReject(safetyGate.id, rejectReason || 'Manual physical verification performed by technician.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-xl bg-[#050914] border-2 border-amber-500 rounded-3xl shadow-2xl overflow-hidden relative">
        {/* Amber pulse ambient glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="px-8 py-6 border-b border-amber-500/30 flex items-center justify-between bg-[#08111F]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 border border-amber-500/40 shadow-lg shadow-amber-500/20 animate-pulse">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono font-black text-amber-400 uppercase tracking-widest">
                LEVEL 2 FINANCIAL COMMITMENT GATE
              </div>
              <h3 className="text-2xl font-black text-white font-sans">
                HUMAN AUTHORIZATION REQUIRED
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {/* Action Spec Table */}
          <div className="p-6 rounded-2xl bg-[#08111F] border border-white/[0.08] space-y-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider border-b border-white/[0.08] pb-2">
              PART REQUISITION DETECTED
            </div>

            <div className="text-xl font-black text-white font-mono">
              VX-CF42 Cooling Fan Assembly
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                <span className="text-slate-400 block mb-1 font-bold">INVENTORY STATUS</span>
                <span className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
                  <Package className="w-4 h-4" />
                  <span>3 units available</span>
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <span className="text-slate-400 block mb-1 font-bold">COST COMMITMENT</span>
                <span className="text-amber-300 font-black text-base">$245.00 USD</span>
              </div>
            </div>

            <div className="text-xs text-slate-300 space-y-2.5">
              <div>
                <strong className="text-slate-400 block font-mono text-[11px]">REASON:</strong>
                <p className="mt-0.5 text-sm text-slate-200">Cooling airflow failure suspected. Persistent 88.4°C thermal overload after diagnostic inspection.</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-xs">
                <span className="text-slate-400 font-mono">AI CONFIDENCE:</span>
                <span className="text-emerald-400 font-bold font-mono">94% Grounded Vector Match</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">EVIDENCE SOURCE:</span>
                <span className="text-[#00E5FF] font-bold">VX-420 Service Manual §4.3 (Page 42)</span>
              </div>
            </div>
          </div>

          {/* Reject input dropdown */}
          {showRejectInput && (
            <div className="space-y-2 animate-fadeIn">
              <label className="text-xs font-mono font-bold text-red-400">
                Provide Rejection Justification:
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g. Fan cleared of debris manually, thermal readings normalized."
                rows={2}
                className="w-full p-3 text-xs bg-[#08111F] text-white border border-red-500/40 rounded-xl focus:outline-none"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-2">
            {!showRejectInput ? (
              <button
                onClick={() => setShowRejectInput(true)}
                className="px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-red-500/20 border border-white/[0.1] hover:border-red-500/40 text-slate-300 hover:text-red-300 font-bold text-xs font-mono transition-colors cursor-pointer"
              >
                REJECT
              </button>
            ) : (
              <button
                onClick={handleRejectAction}
                className="px-5 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500 text-red-300 font-bold text-xs font-mono transition-colors cursor-pointer"
              >
                CONFIRM REJECTION
              </button>
            )}

            {onReviewEvidence && (
              <button
                onClick={() => {
                  onReviewEvidence();
                  onClose();
                }}
                className="px-5 py-3 rounded-xl bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/30 text-[#00E5FF] font-bold text-xs font-mono transition-colors cursor-pointer flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>REVIEW ACTION</span>
              </button>
            )}

            <button
              onClick={handleApproveAction}
              className="flex-1 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black text-sm tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 cursor-pointer transition-transform hover:scale-[1.02]"
            >
              <span>AUTHORIZE &amp; DISPATCH</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

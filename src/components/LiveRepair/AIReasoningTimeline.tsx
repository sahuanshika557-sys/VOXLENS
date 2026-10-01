import React from 'react';
import { Eye, BookOpen, BrainCircuit, Wrench, ArrowRight, AlertCircle, HelpCircle } from 'lucide-react';
import { AIDecisionSummary } from '../../types';

interface AIReasoningTimelineProps {
  decisionSummary?: AIDecisionSummary;
  onOpenKnowledge?: () => void;
  onOpenSafetyModal?: () => void;
  onOpenWorkflow?: () => void;
}

export const AIReasoningTimeline: React.FC<AIReasoningTimelineProps> = ({
  decisionSummary,
  onOpenKnowledge,
  onOpenSafetyModal,
  onOpenWorkflow
}) => {
  const steps = [
    {
      stepNumber: '01',
      title: 'VISUAL OBSERVATION',
      desc: 'Severely crushed & torn carton detected on conveyor belt + Red tower stack light active.',
      meta: 'Visual Assessment · High Severity',
      icon: Eye,
      color: 'text-red-400',
      bg: 'bg-red-500/10 border-red-500/30'
    },
    {
      stepNumber: '02',
      title: 'GROUNDED KNOWLEDGE',
      desc: 'Material Handling SOP Section 6.2 (Packaging Integrity) & LOTO Protocol Section 2.1',
      meta: 'SOP Document Match: 98%',
      icon: BookOpen,
      color: 'text-[#00E5FF]',
      bg: 'bg-[#00E5FF]/10 border-[#00E5FF]/30',
      action: onOpenKnowledge,
      actionText: 'View SOP §6.2'
    },
    {
      stepNumber: '03',
      title: 'HYPOTHESIS FORMULATION',
      desc: 'Formulated 5 distinct root cause possibilities (Robotic gripper force, alignment, conveyor transfer, fluting strength, jam collision).',
      meta: '5 Unconfirmed Hypotheses',
      icon: BrainCircuit,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/30'
    },
    {
      stepNumber: '04',
      title: 'ALARM VERIFICATION GATE',
      desc: 'Check actual HMI / PLC error register to confirm stack light reason. Do not invent fault codes.',
      meta: 'Physical Verification Mandate',
      icon: AlertCircle,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/30'
    },
    {
      stepNumber: '05',
      title: 'GUIDED 8-STEP WORKFLOW',
      desc: 'Execute structured containment, mechanical check, packaging QA inspection, and controlled test run.',
      meta: 'Step-by-Step Operator Flow',
      icon: Wrench,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/30',
      action: onOpenWorkflow,
      actionText: 'Launch 8-Step Workflow'
    }
  ];

  return (
    <div className="w-full rounded-3xl bg-[#050914] border border-white/[0.08] p-5 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#00E5FF]/15 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono font-bold text-[#00E5FF] tracking-widest uppercase">
              REASONING ENGINE
            </div>
            <h3 className="text-xl font-bold text-white tracking-wide">
              GROUNDED DIAGNOSTIC TIMELINE
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Verification Required</span>
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="flex-1 space-y-4 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-[2px] before:bg-white/[0.08]">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="relative flex items-start gap-4 group">
              {/* Step Node */}
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 z-10 ${step.bg} ${step.color} shadow-lg transition-transform group-hover:scale-105`}>
                <Icon className="w-4 h-4" />
              </div>

              {/* Step Content Card */}
              <div className="flex-1 p-3.5 rounded-2xl bg-[#08111F] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className={`text-[11px] font-mono font-black tracking-wider ${step.color}`}>
                    {step.stepNumber} · {step.title}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-black/40 px-2 py-0.5 rounded">
                    {step.meta}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-200 leading-relaxed">
                  {step.desc}
                </p>

                {step.action && (
                  <button
                    onClick={step.action}
                    className="mt-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/30"
                  >
                    <span>{step.actionText}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

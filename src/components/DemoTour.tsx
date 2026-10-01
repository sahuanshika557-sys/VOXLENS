import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  RotateCcw, 
  X, 
  Minimize2,
  Maximize2,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface DemoTourProps {
  isRunning: boolean;
  onStopDemo: () => void;
  onExecuteDemoStep: (stepNumber: number) => void;
  currentStep: number;
}

export const DemoTour: React.FC<DemoTourProps> = ({
  isRunning,
  onStopDemo,
  onExecuteDemoStep,
  currentStep
}) => {
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const demoSteps = [
    { step: 1, title: 'DEMO 01 — Connect to VX-420', desc: 'Identified Line 3 VX-420 Packaging Unit (S/N DEMO-420-0192).' },
    { step: 2, title: 'DEMO 02 — Voice Query', desc: 'Technician asks: "VoxLens, the machine is showing error E17. What should I check?"' },
    { step: 3, title: 'DEMO 03 — Camera CV Scan', desc: 'Optical CV reads E17 (96%) and 88.4°C stator thermal anomaly.' },
    { step: 4, title: 'DEMO 04 — Multimodal Synthesis', desc: 'Unified Voice + Vision + Knowledge synthesized into actionable diagnosis.' },
    { step: 5, title: 'DEMO 05 — RAG Manual Retrieval', desc: 'Dense vector search retrieves Section 4.3 (Page 42) from OEM manual.' },
    { step: 6, title: 'DEMO 06 — AI Voice Response', desc: 'AI delivers spoken guidance via Text-to-Speech synthesis.' },
    { step: 7, title: 'DEMO 07 — Action Request', desc: 'Technician asks: "Create a maintenance ticket and check replacement fan."' },
    { step: 8, title: 'DEMO 08 — Agent Tool Reasoning', desc: 'Agent queries Bay 4 stockroom (3 fans in Bin C-14) and drafts CMMS ticket.' },
    { step: 9, title: 'DEMO 09 — Safety Gate Engagement', desc: 'Human authorization required for financial commitment ($245.00).' },
    { id: 10, step: 10, title: 'DEMO 10 — Authorize & Dispatch', desc: 'Technician authorizes requisition; ticket created and part reserved.' },
    { id: 11, step: 11, title: 'DEMO 11 — Session Memory Updated', desc: 'Repair session context synchronized to persistent ledger.' }
  ];

  useEffect(() => {
    let timer: any = null;
    if (isRunning && autoPlay) {
      timer = setTimeout(() => {
        if (currentStep < 11) {
          onExecuteDemoStep(currentStep + 1);
        } else {
          soundEngine.playSuccess();
          setAutoPlay(false);
        }
      }, 6500);
    }
    return () => clearTimeout(timer);
  }, [isRunning, autoPlay, currentStep]);

  if (!isRunning) return null;

  const currentStepData = demoSteps[currentStep - 1] || demoSteps[0];
  const isComplete = currentStep === 11;

  // Minimized Floating Pill Mode
  if (isMinimized) {
    return (
      <div
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 bg-[#0B1020] border-2 border-[#22D3EE] rounded-full px-5 py-3 shadow-2xl flex items-center gap-3 cursor-pointer transition-all hover:scale-105 select-none"
      >
        <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
        <span className="text-sm font-extrabold text-white font-mono">
          DEMO ACTIVE · {currentStep}/11
        </span>
        <Maximize2 className="w-4 h-4 text-slate-300 ml-1" />
      </div>
    );
  }

  // Expanded Compact Widget
  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 bg-[#0B1020]/98 border-2 border-white/[0.15] rounded-3xl shadow-2xl p-5 space-y-4 select-none backdrop-blur-xl animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div className="flex items-center gap-2.5">
          <span className={`w-3 h-3 rounded-full ${isComplete ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
          <span className="text-xs font-black text-white tracking-wider font-mono">
            {isComplete ? 'DEMO COMPLETED' : `HACKATHON DEMO · STEP ${currentStep}/11`}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            title="Minimize"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={onStopDemo}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            title="Exit Demo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step Info */}
      <div className="space-y-1.5">
        <div className="text-sm font-black text-[#22D3EE]">
          {currentStepData.title}
        </div>
        <p className="text-xs text-slate-300 leading-relaxed font-medium">
          {currentStepData.desc}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
        <div
          className="bg-[#22D3EE] h-full transition-all duration-300 rounded-full"
          style={{ width: `${(currentStep / 11) * 100}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-2.5 pt-1">
        <button
          onClick={() => onExecuteDemoStep(1)}
          className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Restart Demo from Step 1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restart</span>
        </button>

        {!isComplete && (
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className="px-3 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-bold text-slate-200 flex items-center gap-2 cursor-pointer"
          >
            {autoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{autoPlay ? 'Pause' : 'Auto Play'}</span>
          </button>
        )}

        <button
          onClick={() => {
            if (currentStep < 11) {
              onExecuteDemoStep(currentStep + 1);
            } else {
              onStopDemo();
            }
          }}
          className="btn-primary py-2 px-5 rounded-xl text-xs font-black flex items-center gap-2 shadow-lg cursor-pointer"
        >
          <span>{isComplete ? 'Finish' : 'Next Step'}</span>
          <SkipForward className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

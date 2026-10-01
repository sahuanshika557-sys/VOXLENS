import React, { useState, useEffect } from 'react';
import { Cpu, CheckCircle2, FastForward, ShieldCheck } from 'lucide-react';
import { AIOrb } from './AIOrb';
import { soundEngine } from '../../utils/soundEngine';

interface BootSequenceProps {
  onComplete: () => void;
}

interface BootStep {
  name: string;
  status: 'pending' | 'checking' | 'ready';
  latency: string;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  const [steps, setSteps] = useState<BootStep[]>([
    { name: 'Vision Engine (Optical OCR & Thermal)', status: 'checking', latency: '12ms' },
    { name: 'Voice Engine (Duplex & WebSpeech)', status: 'pending', latency: '4ms' },
    { name: 'RAG Knowledge (§4.3 Vector Embeddings)', status: 'pending', latency: '28ms' },
    { name: 'Agent Orchestration (Action Pipeline)', status: 'pending', latency: '8ms' },
    { name: 'Safety Gate (Human-in-the-Loop LOTO)', status: 'pending', latency: '1ms' }
  ]);

  useEffect(() => {
    try {
      soundEngine.playFusionHarmonic();
    } catch {}

    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          const next = prev + 1;
          setSteps((prevSteps) =>
            prevSteps.map((s, idx) => {
              if (idx < next) return { ...s, status: 'ready' };
              if (idx === next) return { ...s, status: 'checking' };
              return s;
            })
          );
          try {
            soundEngine.playDataScan();
          } catch {}
          return next;
        } else {
          clearInterval(timer);
          setSteps((prevSteps) => prevSteps.map((s) => ({ ...s, status: 'ready' })));
          
          setTimeout(() => {
            setIsFadingOut(true);
            try {
              soundEngine.playSuccessFanfare();
            } catch {}
            setTimeout(onComplete, 400);
          }, 350);
          return prev;
        }
      });
    }, 280);

    return () => clearInterval(timer);
  }, [onComplete, steps.length]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(onComplete, 150);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 bg-[#02040A]/85 backdrop-blur-xl flex flex-col items-center justify-center select-none transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Subtle Scanline Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Center Core HUD */}
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full px-6 text-center animate-fadeIn">
        {/* Animated AI Core */}
        <div className="mb-6">
          <AIOrb state="processing" size="lg" />
        </div>

        {/* Brand Reveal */}
        <div className="flex items-center gap-3 mb-1.5">
          <div className="p-2 rounded-xl bg-[#08111F] border border-[#00E5FF]/30 text-[#00E5FF]">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-widest text-white font-sans">
            VOXLENS
          </h1>
          <span className="text-xs font-mono font-bold text-[#00E5FF] bg-[#00E5FF]/10 px-2.5 py-1 rounded-md border border-[#00E5FF]/30">
            PS-05
          </span>
        </div>

        <p className="text-xs font-mono text-slate-400 tracking-wider mb-6">
          REAL-TIME MULTIMODAL AI COPILOT · SYSTEM BOOT
        </p>

        {/* Telemetry Initialization Checklist */}
        <div className="w-full bg-[#050914]/90 border border-white/10 rounded-2xl p-5 backdrop-blur-xl mb-5 text-left space-y-2.5 shadow-2xl">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className={`flex items-center justify-between text-xs font-mono transition-colors duration-200 ${
                step.status === 'ready' 
                  ? 'text-emerald-400 font-bold' 
                  : step.status === 'checking' 
                    ? 'text-[#00E5FF] animate-pulse font-bold' 
                    : 'text-slate-600'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {step.status === 'ready' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <span className={`w-2 h-2 rounded-full ${step.status === 'checking' ? 'bg-[#00E5FF]' : 'bg-slate-700'}`} />
                )}
                <span>{step.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] opacity-70">[{step.latency}]</span>
                <span>{step.status === 'ready' ? 'READY' : step.status === 'checking' ? 'SYNCING...' : 'PENDING'}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
        >
          <FastForward className="w-3.5 h-3.5" />
          <span>SKIP INTRO (SPACE / ESC)</span>
        </button>
      </div>
    </div>
  );
};

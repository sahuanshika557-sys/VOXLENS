import React from 'react';
import { Sparkles, Mic, Activity, CheckCircle, ShieldAlert, Radio } from 'lucide-react';

export type AIOrbState = 
  | 'idle' 
  | 'listening' 
  | 'processing' 
  | 'responding' 
  | 'scanning' 
  | 'executing' 
  | 'safety';

interface AIOrbProps {
  state?: AIOrbState;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  pulseIntensity?: 'subtle' | 'high';
  showLabel?: boolean;
  className?: string;
  onClick?: () => void;
}

export const AIOrb: React.FC<AIOrbProps> = ({
  state = 'idle',
  size = 'md',
  pulseIntensity = 'high',
  showLabel = false,
  className = '',
  onClick
}) => {
  // Dimension tokens
  const sizeMap = {
    sm: { container: 'w-8 h-8', core: 'w-4 h-4', ring: 'w-7 h-7', icon: 'w-3 h-3' },
    md: { container: 'w-16 h-16', core: 'w-8 h-8', ring: 'w-14 h-14', icon: 'w-4 h-4' },
    lg: { container: 'w-24 h-24', core: 'w-12 h-12', ring: 'w-20 h-20', icon: 'w-6 h-6' },
    xl: { container: 'w-36 h-36', core: 'w-18 h-18', ring: 'w-32 h-32', icon: 'w-9 h-9' }
  };

  // State visuals & palette definitions
  const stateConfig = {
    idle: {
      color: '#00E5FF',
      glow: 'rgba(0, 229, 255, 0.4)',
      gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
      label: 'STANDBY',
      icon: Sparkles,
      animateRing: 'animate-[spin_12s_linear_infinite]',
      pulseSpeed: 'animate-pulse'
    },
    listening: {
      color: '#00F0FF',
      glow: 'rgba(0, 240, 255, 0.7)',
      gradient: 'from-[#00F0FF] via-cyan-400 to-sky-600',
      label: 'LISTENING',
      icon: Mic,
      animateRing: 'animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]',
      pulseSpeed: 'animate-[pulse_1s_ease-in-out_infinite]'
    },
    processing: {
      color: '#A855F7',
      glow: 'rgba(168, 85, 247, 0.65)',
      gradient: 'from-purple-400 via-fuchsia-500 to-indigo-600',
      label: 'REASONING',
      icon: Activity,
      animateRing: 'animate-[spin_3s_linear_infinite]',
      pulseSpeed: 'animate-[pulse_1.2s_ease-in-out_infinite]'
    },
    responding: {
      color: '#38BDF8',
      glow: 'rgba(56, 189, 248, 0.7)',
      gradient: 'from-sky-300 via-cyan-500 to-blue-600',
      label: 'SPEAKING',
      icon: Radio,
      animateRing: 'animate-[spin_6s_linear_infinite]',
      pulseSpeed: 'animate-[bounce_2s_infinite]'
    },
    scanning: {
      color: '#00E5FF',
      glow: 'rgba(0, 229, 255, 0.8)',
      gradient: 'from-cyan-300 via-teal-400 to-blue-600',
      label: 'CV SCANNING',
      icon: Radio,
      animateRing: 'animate-[spin_2s_linear_infinite]',
      pulseSpeed: 'animate-pulse'
    },
    executing: {
      color: '#00E5A8',
      glow: 'rgba(0, 229, 168, 0.7)',
      gradient: 'from-emerald-300 via-teal-400 to-green-600',
      label: 'AGENT EXECUTING',
      icon: CheckCircle,
      animateRing: 'animate-[spin_8s_linear_infinite]',
      pulseSpeed: 'animate-[pulse_1.5s_ease-in-out_infinite]'
    },
    safety: {
      color: '#FFB000',
      glow: 'rgba(255, 176, 0, 0.8)',
      gradient: 'from-amber-300 via-orange-500 to-red-500',
      label: 'SAFETY GATE',
      icon: ShieldAlert,
      animateRing: 'animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]',
      pulseSpeed: 'animate-[pulse_0.8s_ease-in-out_infinite]'
    }
  };

  const current = stateConfig[state] || stateConfig.idle;
  const Icon = current.icon;
  const dims = sizeMap[size];

  return (
    <div 
      onClick={onClick}
      className={`relative inline-flex flex-col items-center justify-center select-none ${onClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''} ${className}`}
    >
      {/* Outer Holographic Glow Container */}
      <div className={`relative flex items-center justify-center ${dims.container}`}>
        {/* Deep Atmosphere Glow */}
        <div 
          className="absolute inset-0 rounded-full blur-xl opacity-60 transition-all duration-700 pointer-events-none"
          style={{
            backgroundColor: current.color,
            boxShadow: `0 0 35px ${current.glow}`
          }}
        />

        {/* Outer Orbital Ring 1 */}
        <div 
          className={`absolute rounded-full border border-dashed opacity-40 transition-all duration-700 ${dims.ring} ${current.animateRing}`}
          style={{ borderColor: current.color }}
        />

        {/* Outer Orbital Ring 2 (Counter-rotation) */}
        <div 
          className="absolute rounded-full border border-dotted opacity-30 transition-all duration-700 w-full h-full animate-[spin_15s_linear_infinite_reverse]"
          style={{ borderColor: current.color }}
        />

        {/* Core Luminous Sphere */}
        <div 
          className={`relative z-10 flex items-center justify-center rounded-full bg-gradient-to-tr ${current.gradient} shadow-2xl transition-all duration-500 ${dims.core} ${current.pulseSpeed}`}
          style={{
            boxShadow: `0 0 25px ${current.glow}, inset 0 0 10px rgba(255, 255, 255, 0.6)`
          }}
        >
          <Icon className={`${dims.icon} text-white drop-shadow-md`} />
        </div>

        {/* Concentric sound / radar ripples if active */}
        {(state === 'listening' || state === 'responding' || state === 'safety') && (
          <div 
            className="absolute inset-0 rounded-full border opacity-75 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]"
            style={{ borderColor: current.color }}
          />
        )}
      </div>

      {/* Optional Metadata Label */}
      {showLabel && (
        <div className="mt-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#050914]/90 border border-white/10 backdrop-blur-md">
          <span 
            className="w-1.5 h-1.5 rounded-full animate-ping"
            style={{ backgroundColor: current.color }}
          />
          <span 
            className="font-mono text-[10px] font-black tracking-widest uppercase"
            style={{ color: current.color }}
          >
            {current.label}
          </span>
        </div>
      )}
    </div>
  );
};

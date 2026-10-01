import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Mic, 
  Play, 
  ChevronDown,
  Radio,
  SlidersHorizontal,
  Sparkles,
  ShieldCheck,
  Activity,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { UserRole, VoiceState } from '../types';
import { soundEngine } from '../utils/soundEngine';
import { LanguageCode, getTranslation } from '../i18n/translations';
import { LanguageSelector } from './common/LanguageSelector';
import { AIOrb } from './common/AIOrb';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onStartDemo: () => void;
  isDemoRunning: boolean;
  onOpenStory: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  speechEnabled: boolean;
  onToggleSpeech: () => void;
  activeEquipmentName: string;
  activeErrorCode: string | null;
  pendingApprovalsCount: number;
  onSelectScenario: (scenario: string) => void;
  currentScenario: string;
  currentLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  voiceState?: VoiceState;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  onStartDemo,
  isDemoRunning,
  onOpenStory,
  soundEnabled,
  onToggleSound,
  speechEnabled,
  onToggleSpeech,
  activeEquipmentName,
  activeErrorCode,
  pendingApprovalsCount,
  onSelectScenario,
  currentScenario,
  currentLanguage,
  onSelectLanguage,
  voiceState = 'IDLE'
}) => {
  const [showScenarioMenu, setShowScenarioMenu] = useState<boolean>(false);
  const t = getTranslation(currentLanguage);

  const scenarios = [
    { id: 'e17-cooling', label: 'E17 Motor Thermal Overload (Standard Demo)' },
    { id: 'low-confidence', label: 'Low Visual Confidence (Conveyor Obstruction)' },
    { id: 'camera-blocked', label: 'Particulate Lens Flare / Camera Obscured' },
    { id: 'manual-missing', label: 'General Industrial Standards (IEC Fallback)' },
    { id: 'zero-inventory', label: 'Bay Stockroom Zero Inventory Alert' },
    { id: 'network-degraded', label: 'Offline Edge Mode (Local SLM Execution)' }
  ];

  const orbState = 
    voiceState === 'LISTENING' ? 'listening' :
    voiceState === 'PROCESSING' ? 'processing' :
    voiceState === 'RESPONDING' ? 'responding' :
    pendingApprovalsCount > 0 ? 'safety' : 'idle';

  return (
    <header className="w-full bg-[#030712]/95 backdrop-blur-xl border-b border-white/[0.08] px-5 sm:px-8 py-3.5 flex items-center justify-between gap-4 select-none sticky top-0 z-40 min-h-[72px]">
      {/* LEFT: Brand & System Badges */}
      <div className="flex items-center gap-4 min-w-max">
        <AIOrb state={orbState} size="sm" />
        
        <div>
          <div className="flex items-center gap-2">
            <span className="font-black text-2xl tracking-wider text-white font-sans">
              VOXLENS
            </span>
            <span className="text-[11px] font-mono font-bold text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 rounded-md border border-[#00F0FF]/30">
              AI COPILOT
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mt-0.5">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM ONLINE
            </span>
            <span>·</span>
            <span>#VX-2048</span>
            <span>·</span>
            <span className="text-slate-200 font-semibold">VX-420</span>
            <span>·</span>
            <span className="text-[#00F0FF]">LINE 3</span>
          </div>
        </div>
      </div>

      {/* CENTER: Mission Title */}
      <div className="hidden lg:flex items-center gap-3 px-6 py-2 rounded-2xl bg-[#080F1E] border border-white/10 shadow-inner">
        <Activity className="w-4 h-4 text-[#00F0FF] animate-pulse" />
        <span className="text-sm font-black text-white font-mono tracking-wider">
          LIVE REPAIR MISSION
        </span>
        <div className="h-4 w-px bg-white/10" />
        <span className="text-xs font-mono text-slate-300">
          Packaging Unit Line 3
        </span>
        {activeErrorCode && (
          <>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-xs font-mono font-black text-red-400 bg-red-500/15 px-2.5 py-0.5 rounded-lg border border-red-500/30 animate-pulse">
              FAULT: {activeErrorCode}
            </span>
          </>
        )}
      </div>

      {/* RIGHT: Controls, Language, Voice & Demo */}
      <div className="flex items-center gap-2.5">
        {/* Language Selector */}
        <LanguageSelector 
          currentLanguage={currentLanguage}
          onSelectLanguage={onSelectLanguage}
        />

        {/* Watch Story Button */}
        <button
          onClick={onOpenStory}
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#00F0FF]/15 to-purple-500/15 hover:from-[#00F0FF]/25 hover:to-purple-500/25 border border-[#00F0FF]/30 text-[#00F0FF] hover:text-white text-xs font-mono font-bold tracking-wider transition-all cursor-pointer shadow-lg shadow-[#00F0FF]/5 group"
          title="Watch product story film"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#00F0FF] group-hover:rotate-12 transition-transform" />
          <span>VOXLENS STORY</span>
        </button>

        {/* Scenario Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowScenarioMenu(!showScenarioMenu)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#080F1E] hover:bg-[#0E1B2E] border border-white/10 text-xs font-medium text-slate-200 transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="hidden xl:inline text-slate-400 font-mono">Scenario:</span>
            <span className="font-semibold text-slate-200 truncate max-w-[80px]">
              {scenarios.find(s => s.id === currentScenario)?.label.split(' ')[0] || 'E17'}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showScenarioMenu && (
            <div className="absolute right-0 mt-2 w-72 bg-[#050914] border border-white/15 rounded-2xl shadow-2xl p-2 z-50 animate-fadeIn backdrop-blur-xl">
              <div className="px-3 py-2 text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider border-b border-white/10">
                Simulation Scenarios
              </div>
              <div className="space-y-1 mt-1">
                {scenarios.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      onSelectScenario(sc.id);
                      setShowScenarioMenu(false);
                      soundEngine.playMicOn();
                    }}
                    className={`w-full px-3 py-2 rounded-xl text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      currentScenario === sc.id
                        ? 'bg-[#00F0FF]/15 text-[#00F0FF] font-bold border border-[#00F0FF]/30'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span>{sc.label}</span>
                    {currentScenario === sc.id && <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Audio / Mic Toggles */}
        <div className="flex items-center gap-1 bg-[#080F1E] p-1 rounded-xl border border-white/10">
          <button
            onClick={() => {
              onToggleSound();
              soundEngine.playMicOn();
            }}
            title={soundEnabled ? 'Mute audio' : 'Enable audio'}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              soundEnabled ? 'text-[#00F0FF] bg-[#00F0FF]/15' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
          
          <button
            onClick={onToggleSpeech}
            title={speechEnabled ? 'Disable TTS Speech' : 'Enable TTS Speech'}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              speechEnabled ? 'text-emerald-400 bg-emerald-500/15' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Start Demo Button */}
        <button
          onClick={onStartDemo}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-black tracking-wider transition-all cursor-pointer shadow-lg ${
            isDemoRunning
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 ring-2 ring-amber-500/20'
              : 'bg-[#00F0FF] text-slate-950 hover:bg-[#38BDF8] hover:scale-105 shadow-[#00F0FF]/20'
          }`}
        >
          {isDemoRunning ? (
            <>
              <Radio className="w-3.5 h-3.5 animate-spin" />
              <span>DEMO ACTIVE</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 fill-current" />
              <span>{t.header?.startDemo || 'START DEMO'}</span>
            </>
          )}
        </button>

        {/* Role Switcher */}
        <div className="hidden lg:flex items-center bg-[#080F1E] p-1 rounded-xl border border-white/10">
          <button
            onClick={() => onRoleChange('technician')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              currentRole === 'technician'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tech
          </button>
          <button
            onClick={() => onRoleChange('supervisor')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors relative cursor-pointer ${
              currentRole === 'supervisor'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Supervisor
            {pendingApprovalsCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-amber-500 text-black text-[10px] font-black">
                {pendingApprovalsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

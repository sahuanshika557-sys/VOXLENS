import React from 'react';
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  MessageSquare, 
  X, 
  Repeat,
  RotateCcw
} from 'lucide-react';
import { StoryLanguage } from './types';
import { LanguageSelector } from './LanguageSelector';

interface StoryControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onPrevScene: () => void;
  onNextScene: () => void;
  onRestart: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  captionsEnabled: boolean;
  onToggleCaptions: () => void;
  autoPlayEnabled: boolean;
  onToggleAutoPlay: () => void;
  currentLanguage: StoryLanguage;
  onSelectLanguage: (lang: StoryLanguage) => void;
  onClose: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

export const StoryControls: React.FC<StoryControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onPrevScene,
  onNextScene,
  onRestart,
  soundEnabled,
  onToggleSound,
  captionsEnabled,
  onToggleCaptions,
  autoPlayEnabled,
  onToggleAutoPlay,
  currentLanguage,
  onSelectLanguage,
  onClose,
  canGoPrev,
  canGoNext
}) => {
  return (
    <div className="flex items-center justify-between gap-3 px-4 sm:px-8 py-2.5 w-full max-w-6xl mx-auto select-none flex-wrap">
      {/* Left: Language Selector, Sound, Captions, Auto-Play */}
      <div className="flex items-center gap-2">
        {/* Language Selector */}
        <LanguageSelector
          currentLanguage={currentLanguage}
          onSelectLanguage={onSelectLanguage}
        />

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          className={`px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
            soundEnabled
              ? 'bg-[#00E5FF]/15 border-[#00E5FF]/40 text-[#00E5FF]'
              : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white'
          }`}
          title="Toggle audio chimes & speech narration"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          <span className="hidden md:inline">{soundEnabled ? 'SOUND ON' : 'MUTED'}</span>
        </button>

        {/* Captions Toggle */}
        <button
          onClick={onToggleCaptions}
          className={`px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
            captionsEnabled
              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
              : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white'
          }`}
          title="Toggle closed captions subtitles"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden md:inline">CC {captionsEnabled ? 'ON' : 'OFF'}</span>
        </button>

        {/* Auto Play Toggle */}
        <button
          onClick={onToggleAutoPlay}
          className={`px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
            autoPlayEnabled
              ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
              : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white'
          }`}
          title="Toggle auto advance vs manual step"
        >
          <Repeat className="w-4 h-4" />
          <span className="hidden md:inline">{autoPlayEnabled ? 'AUTO' : 'MANUAL'}</span>
        </button>
      </div>

      {/* Center: Playback Controls */}
      <div className="flex items-center gap-2.5">
        {/* Restart */}
        <button
          onClick={onRestart}
          className="p-2.5 rounded-xl border bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Restart from Beginning"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Previous Scene */}
        <button
          onClick={onPrevScene}
          disabled={!canGoPrev}
          className={`p-2.5 rounded-xl border transition-all ${
            canGoPrev
              ? 'bg-white/[0.05] border-white/[0.1] text-white hover:bg-white/[0.1] cursor-pointer'
              : 'bg-white/[0.02] border-white/[0.04] text-slate-600 cursor-not-allowed'
          }`}
          title="Previous Scene (←)"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Play/Pause */}
        <button
          onClick={onTogglePlay}
          className="px-6 py-2.5 rounded-2xl bg-[#00E5FF] hover:bg-[#33EDFF] text-[#02040A] font-black text-sm flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-[#00E5FF]/25"
          title="Play/Pause (Space)"
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 fill-current" />
              <span className="font-mono">PAUSE</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span className="font-mono">PLAY</span>
            </>
          )}
        </button>

        {/* Next Scene */}
        <button
          onClick={onNextScene}
          disabled={!canGoNext}
          className={`p-2.5 rounded-xl border transition-all ${
            canGoNext
              ? 'bg-white/[0.05] border-white/[0.1] text-white hover:bg-white/[0.1] cursor-pointer'
              : 'bg-white/[0.02] border-white/[0.04] text-slate-600 cursor-not-allowed'
          }`}
          title="Next Scene (→)"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Right: Exit / Skip to Live Repair */}
      <div>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.15] text-slate-200 hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          title="Exit film and return to Live Repair (Esc)"
        >
          <span>SKIP STORY</span>
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

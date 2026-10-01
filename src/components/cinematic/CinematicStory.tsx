import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Cpu, X, Volume2, VolumeX, Sparkles, MessageSquare, Globe } from 'lucide-react';
import { CINEMATIC_SCENES, CinematicSceneDef, StoryLanguage, SUPPORTED_LANGUAGES } from './types';
import { StoryTimeline } from './StoryTimeline';
import { StoryControls } from './StoryControls';
import { StorySceneRenderer } from './StorySceneRenderer';
import { soundEngine } from '../../utils/soundEngine';

interface CinematicStoryProps {
  isOpen: boolean;
  onClose: () => void;
  onEnterLiveRepair: () => void;
  currentLanguage?: string;
  onLanguageChange?: (lang: any) => void;
}

const mapToStoryLang = (lang: string): StoryLanguage => {
  if (lang === 'hi' || lang === 'bn' || lang === 'ta' || lang === 'te' || lang === 'mr' || lang === 'gu' || lang === 'kn' || lang === 'pa' || lang === 'ur') {
    return 'hi';
  }
  if (lang === 'es' || lang === 'fr' || lang === 'de' || lang === 'ja' || lang === 'hinglish') {
    return lang as StoryLanguage;
  }
  return 'en';
};

export const CinematicStory: React.FC<CinematicStoryProps> = ({
  isOpen,
  onClose,
  onEnterLiveRepair,
  currentLanguage: propLanguage = 'en',
  onLanguageChange
}) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [currentLanguage, setCurrentLanguage] = useState<StoryLanguage>(() => mapToStoryLang(propLanguage));
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [captionsEnabled, setCaptionsEnabled] = useState<boolean>(true);
  const [sceneProgress, setSceneProgress] = useState<number>(0); // 0-100%

  useEffect(() => {
    if (propLanguage) {
      setCurrentLanguage(mapToStoryLang(propLanguage));
    }
  }, [propLanguage, isOpen]);

  const activeScene: CinematicSceneDef = CINEMATIC_SCENES[currentSceneIndex] || CINEMATIC_SCENES[0];
  const activeTrans = activeScene.translations[currentLanguage] || activeScene.translations.en;
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Calculate total seconds and elapsed seconds
  const totalSeconds = CINEMATIC_SCENES.reduce((acc, s) => acc + s.durationSeconds, 0);
  const elapsedBeforeCurrent = CINEMATIC_SCENES.slice(0, currentSceneIndex).reduce(
    (acc, s) => acc + s.durationSeconds,
    0
  );
  const currentSceneElapsed = (sceneProgress / 100) * activeScene.durationSeconds;
  const totalElapsedSeconds = Math.min(totalSeconds, Math.floor(elapsedBeforeCurrent + currentSceneElapsed));

  // Trigger sound effect according to scene
  const triggerSceneAudio = useCallback((sceneId: number) => {
    if (!soundEnabled) return;
    switch (sceneId) {
      case 1:
        soundEngine.playCinematicSweep();
        break;
      case 3:
        soundEngine.playScanPing();
        break;
      case 4:
        soundEngine.playFusionHum();
        break;
      case 5:
        soundEngine.playDataScan();
        break;
      case 6:
        soundEngine.playStepTick();
        break;
      case 7:
        soundEngine.playMicOn();
        break;
      case 8:
        soundEngine.playAlert();
        break;
      case 9:
        soundEngine.playSuccess();
        break;
      case 10:
        soundEngine.playFusionHum();
        break;
      default:
        break;
    }
  }, [soundEnabled]);

  // Handle scene change & narration
  const goToScene = useCallback((targetIndex: number, overrideLang?: StoryLanguage) => {
    const safeIndex = Math.max(0, Math.min(CINEMATIC_SCENES.length - 1, targetIndex));
    setCurrentSceneIndex(safeIndex);
    setSceneProgress(0);
    startTimeRef.current = Date.now();

    const newScene = CINEMATIC_SCENES[safeIndex];
    triggerSceneAudio(newScene.id);

    const langToUse = overrideLang || currentLanguage;
    const langDef = SUPPORTED_LANGUAGES.find(l => l.id === langToUse);
    const trans = newScene.translations[langToUse] || newScene.translations.en;

    if (soundEnabled && trans.narration) {
      soundEngine.speak(trans.narration, langDef?.speechLocale || 'en-US');
    }
  }, [soundEnabled, currentLanguage, triggerSceneAudio]);

  // Language Change Handler
  const handleLanguageChange = (newLang: StoryLanguage) => {
    setCurrentLanguage(newLang);
    soundEngine.stopSpeaking();
    if (onLanguageChange) {
      onLanguageChange(newLang);
    }
    const langDef = SUPPORTED_LANGUAGES.find(l => l.id === newLang);
    const trans = activeScene.translations[newLang] || activeScene.translations.en;
    if (soundEnabled && trans.narration) {
      soundEngine.speak(trans.narration, langDef?.speechLocale || 'en-US');
    }
  };

  // Auto-play progress timer
  useEffect(() => {
    if (!isOpen) {
      soundEngine.stopSpeaking();
      return;
    }

    if (!isPlaying || !autoPlayEnabled) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const durationMs = activeScene.durationSeconds * 1000;
    const intervalMs = 50;

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(100, (elapsed / durationMs) * 100);
      setSceneProgress(progress);

      if (progress >= 100) {
        if (currentSceneIndex < CINEMATIC_SCENES.length - 1) {
          goToScene(currentSceneIndex + 1);
        } else {
          // Reached final scene
          setIsPlaying(false);
        }
      }
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPlaying, autoPlayEnabled, currentSceneIndex, activeScene, goToScene]);

  // Initial load when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentSceneIndex(0);
      setSceneProgress(0);
      setIsPlaying(true);
      startTimeRef.current = Date.now();
      triggerSceneAudio(1);
      const trans = CINEMATIC_SCENES[0].translations[currentLanguage] || CINEMATIC_SCENES[0].translations.en;
      const langDef = SUPPORTED_LANGUAGES.find(l => l.id === currentLanguage);
      if (soundEnabled && trans.narration) {
        soundEngine.speak(trans.narration, langDef?.speechLocale || 'en-US');
      }
    } else {
      soundEngine.stopSpeaking();
    }
  }, [isOpen, triggerSceneAudio, currentLanguage, soundEnabled]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToScene(currentSceneIndex + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToScene(currentSceneIndex - 1);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSceneIndex, goToScene, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#02040A] flex flex-col text-slate-100 select-none overflow-hidden font-sans animate-fadeIn">
      {/* Background cinematic grid & atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,#00E5FF15,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      {/* TOP BAR */}
      <div className="relative z-20 px-6 sm:px-8 py-4 border-b border-white/[0.08] bg-[#050914]/80 backdrop-blur-md flex items-center justify-between gap-4">
        {/* Brand & Mode Label */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF]">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black tracking-widest text-white text-base">
                VOXLENS PRODUCT FILM
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/[0.1]">
                PS-05
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              90-Second Cinematic Story & Solution Walkthrough
            </div>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3">
          {/* Enter Live Repair Button */}
          <button
            onClick={onEnterLiveRepair}
            className="px-4 py-2 rounded-xl bg-[#00E5FF] hover:bg-[#38BDF8] text-[#02040A] font-black text-xs tracking-wider transition-all cursor-pointer shadow-lg shadow-[#00E5FF]/20"
          >
            ENTER LIVE REPAIR
          </button>

          {/* Close Modal Button */}
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Exit Story Mode (ESC)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CENTER WORKSPACE: Active Cinematic Scene */}
      <div className="flex-1 relative overflow-hidden flex flex-col justify-center items-center p-6 sm:p-12">
        <StorySceneRenderer
          scene={activeScene}
          language={currentLanguage}
          onEnterLiveRepair={onEnterLiveRepair}
          onReplayStory={() => goToScene(0)}
        />
      </div>

      {/* BOTTOM TIMELINE & PLAYBACK CONTROLS */}
      <div className="relative z-20 border-t border-white/[0.08] bg-[#050914]/90 backdrop-blur-md p-4 sm:p-6 space-y-4">
        {/* 10-Scene Segmented Timeline */}
        <StoryTimeline
          currentSceneId={activeScene.id}
          onSelectScene={(id) => goToScene(id - 1)}
          sceneProgress={sceneProgress}
          elapsedSeconds={totalElapsedSeconds}
          totalSeconds={totalSeconds}
          language={currentLanguage}
        />

        {/* Playback Controls & Subtitles Toggle */}
        <StoryControls
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onPrevScene={() => goToScene(currentSceneIndex - 1)}
          onNextScene={() => goToScene(currentSceneIndex + 1)}
          onRestart={() => goToScene(0)}
          soundEnabled={soundEnabled}
          onToggleSound={() => {
            setSoundEnabled(!soundEnabled);
            if (soundEnabled) soundEngine.stopSpeaking();
          }}
          captionsEnabled={captionsEnabled}
          onToggleCaptions={() => setCaptionsEnabled(!captionsEnabled)}
          autoPlayEnabled={autoPlayEnabled}
          onToggleAutoPlay={() => setAutoPlayEnabled(!autoPlayEnabled)}
          currentLanguage={currentLanguage}
          onSelectLanguage={handleLanguageChange}
          onClose={onClose}
          canGoPrev={currentSceneIndex > 0}
          canGoNext={currentSceneIndex < CINEMATIC_SCENES.length - 1}
        />
      </div>
    </div>
  );
};

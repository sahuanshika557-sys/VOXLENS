import React from 'react';
import { CINEMATIC_SCENES, StoryLanguage } from './types';

interface StoryTimelineProps {
  currentSceneId: number;
  onSelectScene: (sceneId: number) => void;
  sceneProgress: number; // 0 to 100 percentage for active scene
  elapsedSeconds: number;
  totalSeconds: number;
  language: StoryLanguage;
}

export const StoryTimeline: React.FC<StoryTimelineProps> = ({
  currentSceneId,
  onSelectScene,
  sceneProgress,
  elapsedSeconds,
  totalSeconds,
  language
}) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const activeScene = CINEMATIC_SCENES.find(s => s.id === currentSceneId) || CINEMATIC_SCENES[0];
  const activeTitle = activeScene.translations[language]?.title || activeScene.translations.en.title;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-3 flex flex-col gap-2 select-none">
      {/* Time & Scene Counter */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="text-[#00E5FF] font-bold">
            SCENE {currentSceneId.toString().padStart(2, '0')} / {CINEMATIC_SCENES.length.toString().padStart(2, '0')}
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-200 font-medium truncate max-w-[200px] sm:max-w-none">
            {activeTitle}
          </span>
        </div>
        <div className="font-mono text-slate-300">
          <span className="text-[#00E5FF] font-bold">{formatTime(elapsedSeconds)}</span> / {formatTime(totalSeconds)}
        </div>
      </div>

      {/* 9 Step Segments */}
      <div className="grid grid-cols-9 gap-1.5 sm:gap-2">
        {CINEMATIC_SCENES.map((scene) => {
          const isCurrent = scene.id === currentSceneId;
          const isPassed = scene.id < currentSceneId;
          const title = scene.translations[language]?.title || scene.translations.en.title;

          return (
            <button
              key={scene.id}
              onClick={() => onSelectScene(scene.id)}
              className="group relative flex flex-col gap-1 py-1 cursor-pointer text-left focus:outline-none"
              title={`${scene.id}. ${title}`}
            >
              {/* Segment Bar */}
              <div className="h-1.5 sm:h-2 rounded-full bg-white/[0.1] overflow-hidden relative">
                {isPassed && (
                  <div className="absolute inset-0 bg-emerald-400" />
                )}
                {isCurrent && (
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-[#00E5FF] transition-all duration-100 ease-linear shadow-[0_0_8px_#00E5FF]"
                    style={{ width: `${sceneProgress}%` }}
                  />
                )}
              </div>

              {/* Number Label */}
              <span
                className={`text-[10px] sm:text-xs font-mono font-bold transition-colors hidden sm:block ${
                  isCurrent
                    ? 'text-[#00E5FF]'
                    : isPassed
                    ? 'text-emerald-400/80 group-hover:text-white'
                    : 'text-slate-500 group-hover:text-slate-300'
                }`}
              >
                0{scene.id}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

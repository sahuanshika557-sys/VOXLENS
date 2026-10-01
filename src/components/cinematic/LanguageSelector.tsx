import React, { useState } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { SUPPORTED_LANGUAGES, StoryLanguage } from './types';

interface LanguageSelectorProps {
  currentLanguage: StoryLanguage;
  onSelectLanguage: (lang: StoryLanguage) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onSelectLanguage
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const activeDef = SUPPORTED_LANGUAGES.find(l => l.id === currentLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="relative select-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.15] text-xs font-mono font-bold text-white transition-all cursor-pointer shadow-sm"
        title="Select story narration and subtitles language"
      >
        <Globe className="w-3.5 h-3.5 text-[#00E5FF]" />
        <span>{activeDef.flag}</span>
        <span className="hidden sm:inline">{activeDef.nativeLabel}</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 sm:bottom-auto sm:top-full sm:mt-2 w-52 bg-[#050914] border border-white/[0.15] rounded-2xl shadow-2xl p-1.5 z-50 animate-fadeIn backdrop-blur-xl">
          <div className="px-3 py-2 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider border-b border-white/[0.08]">
            🌐 Story Language
          </div>
          <div className="space-y-1 mt-1 max-h-60 overflow-y-auto">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = lang.id === currentLanguage;
              return (
                <button
                  key={lang.id}
                  onClick={() => {
                    onSelectLanguage(lang.id);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 rounded-xl text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#00E5FF]/15 text-[#00E5FF] font-bold border border-[#00E5FF]/30'
                      : 'text-slate-300 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">{lang.flag}</span>
                    <span>{lang.nativeLabel}</span>
                    <span className="text-[10px] text-slate-500">({lang.label})</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#00E5FF]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

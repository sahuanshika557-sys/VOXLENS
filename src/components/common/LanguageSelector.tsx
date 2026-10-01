import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { SUPPORTED_LANGUAGES, LanguageCode } from '../../i18n/translations';
import { soundEngine } from '../../utils/soundEngine';

interface LanguageSelectorProps {
  currentLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  variant?: 'compact' | 'full';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onSelectLanguage,
  variant = 'compact',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLang = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          soundEngine.playMicOn();
        }}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#08111F] hover:bg-[#0E1B2E] border border-white/10 hover:border-[#00E5FF]/40 text-xs font-mono font-medium text-slate-200 transition-all cursor-pointer shadow-sm"
        title="Select Interface & Voice Language"
      >
        <Globe className="w-3.5 h-3.5 text-[#00E5FF]" />
        <span className="font-bold text-slate-100">
          {variant === 'compact' ? activeLang.code.toUpperCase() : activeLang.nativeLabel}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-[#050914]/95 border border-white/15 rounded-2xl shadow-2xl p-2 z-50 animate-fadeIn backdrop-blur-xl max-h-80 overflow-y-auto">
          <div className="px-3 py-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider border-b border-white/10 flex items-center justify-between">
            <span>Select Language</span>
            <span className="text-[#00E5FF] font-mono">10 DIALECTS</span>
          </div>
          <div className="space-y-1 mt-1">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = lang.code === currentLanguage;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    onSelectLanguage(lang.code);
                    setIsOpen(false);
                    soundEngine.playSuccessFanfare();
                  }}
                  className={`w-full px-3 py-2 rounded-xl text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#00E5FF]/15 text-[#00E5FF] font-bold border border-[#00E5FF]/30'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-sans">{lang.nativeLabel}</span>
                    <span className="text-[10px] text-slate-500 font-mono">({lang.label})</span>
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

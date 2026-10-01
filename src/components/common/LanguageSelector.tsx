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
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#08111F] hover:bg-[#0E1B2E] border border-white/15 hover:border-[#00E5FF]/60 text-xs font-mono font-medium text-slate-200 transition-all cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98]"
        title="Select Interface & Voice Language"
        aria-expanded={isOpen}
      >
        <span className="text-base leading-none">{activeLang.flag}</span>
        <Globe className="w-3.5 h-3.5 text-[#00E5FF]" />
        <span className="font-bold text-slate-100">
          {variant === 'compact' ? activeLang.nativeLabel : `${activeLang.flag} ${activeLang.nativeLabel}`}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#00E5FF] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#050914]/98 border border-white/20 rounded-2xl shadow-2xl p-2 z-[999] animate-fadeIn backdrop-blur-2xl max-h-96 overflow-y-auto ring-1 ring-white/10">
          <div className="px-3 py-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider border-b border-white/10 flex items-center justify-between">
            <span className="flex items-center gap-1 text-[#00E5FF]">
              <Globe className="w-3 h-3" />
              <span>Select Language</span>
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
              10 REGIONS
            </span>
          </div>
          <div className="space-y-1 mt-1.5">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = lang.code === currentLanguage;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    onSelectLanguage(lang.code);
                    setIsOpen(false);
                    soundEngine.playSuccess();
                  }}
                  className={`w-full px-3 py-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between cursor-pointer group ${
                    isSelected
                      ? 'bg-[#00E5FF]/20 text-[#00E5FF] font-bold border border-[#00E5FF]/50 shadow-sm'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">{lang.flag}</span>
                    <div>
                      <div className="font-bold font-sans text-sm text-slate-100 group-hover:text-[#00E5FF]">
                        {lang.nativeLabel}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {lang.label} · {lang.speechLocale}
                      </div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#00E5FF] shrink-0 font-bold" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

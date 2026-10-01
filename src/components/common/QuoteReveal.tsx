import React from 'react';
import { Quote, Sparkles } from 'lucide-react';
import { LanguageCode, getTranslation } from '../../i18n/translations';

interface QuoteRevealProps {
  quoteKey?: string;
  customQuote?: string;
  author?: string;
  language?: LanguageCode;
  className?: string;
}

export const QuoteReveal: React.FC<QuoteRevealProps> = ({
  quoteKey = 'q1',
  customQuote,
  author = 'VOXLENS COPILOT · CORE PHILOSOPHY',
  language = 'en',
  className = ''
}) => {
  const t = getTranslation(language);
  const quoteText = customQuote || (t.quotes as Record<string, string>)?.[quoteKey] || (t.quotes ? t.quotes.q1 : 'Machines speak in signals. Technicians speak in experience. VOXLENS connects the two.');


  return (
    <div 
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#08111F]/90 via-[#050914]/95 to-[#08111F]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl ${className}`}
    >
      {/* Subtle Cyan Edge Accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00E5FF]/60 to-transparent" />
      
      {/* Background Watermark Quote Icon */}
      <div className="absolute -right-4 -bottom-6 opacity-5 pointer-events-none text-white">
        <Quote className="w-32 h-32" />
      </div>

      <div className="relative z-10 flex items-start gap-4">
        <div className="flex-shrink-0 p-2.5 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF]">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>

        <div className="space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#00E5FF] font-bold">
            {author}
          </div>
          <blockquote className="text-base sm:text-lg lg:text-xl font-medium text-slate-100 italic tracking-tight leading-relaxed">
            "{quoteText}"
          </blockquote>
          <div className="text-xs font-mono text-slate-400">
            PS-05 · Real-Time Voice & Multimodal Agents · VoxNova
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Send, 
  BookOpen, 
  ExternalLink, 
  Lock,
  ArrowRight,
  Sparkles,
  ListChecks,
  ShieldCheck,
  BrainCircuit,
  MessageSquare,
  Square,
  RotateCcw,
  Wrench
} from 'lucide-react';
import { CopilotMessage, VoiceState, ManualCitation } from '../../types';
import { AudioWaveform } from './AudioWaveform';
import { soundEngine } from '../../utils/soundEngine';
import { speechService } from '../../utils/speechRecognition';
import { LanguageCode, getTranslation } from '../../i18n/translations';

interface CopilotChatProps {
  messages: CopilotMessage[];
  voiceState: VoiceState;
  onSendMessage: (text: string, intent?: string) => void;
  onSelectManualCitation: (citation: ManualCitation) => void;
  onRequestSafetyApproval: () => void;
  onOpenWorkflow?: () => void;
  isProcessing: boolean;
  currentLanguage?: LanguageCode;
}

export const CopilotChat: React.FC<CopilotChatProps> = ({
  messages,
  voiceState,
  onSendMessage,
  onSelectManualCitation,
  onRequestSafetyApproval,
  onOpenWorkflow,
  isProcessing,
  currentLanguage = 'en'
}) => {
  const [inputText, setInputText] = useState<string>('');
  const [activeSpeechInterim, setActiveSpeechInterim] = useState<string>('');
  const [voiceFallbackNotice, setVoiceFallbackNotice] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const t = getTranslation(currentLanguage);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeSpeechInterim]);

  const quickPrompts = t.copilot?.quickPrompts || [
    { label: 'Explain carton defect', query: currentLanguage === 'hi' ? 'Carton damage defect explain karein' : 'Explain the visible carton damage on the conveyor' },
    { label: 'What should I check first?', query: currentLanguage === 'hi' ? 'Sabse pehle kya check karein?' : 'What should I check first for this packaging defect?' },
    { label: 'Red stack light meaning?', query: currentLanguage === 'hi' ? 'Red tower warning light ka kya matlab hai?' : 'What does the red tower warning light mean?' },
    { label: '8-step repair workflow', query: currentLanguage === 'hi' ? '8-step repair workflow dikhayein' : 'Show the 8-step repair workflow' }
  ];

  const handleVoiceToggle = () => {
    if (voiceState === 'LISTENING') {
      speechService.stop();
      setVoiceFallbackNotice(null);
    } else {
      soundEngine.playMicOn();
      setActiveSpeechInterim('');
      setVoiceFallbackNotice(null);
      
      const started = speechService.start({
        onStart: () => {},
        onEnd: () => {},
        onResult: (transcript, isFinal) => {
          setActiveSpeechInterim(transcript);
          if (isFinal && transcript.trim().length > 0) {
            onSendMessage(transcript);
            setActiveSpeechInterim('');
            speechService.stop();
          }
        },
        onError: () => {
          setVoiceFallbackNotice('Voice duplex simulated.');
          setTimeout(() => {
            const fallbackCommand = quickPrompts[0]?.query || "Explain the visible carton damage on the conveyor";
            setActiveSpeechInterim(fallbackCommand);
            setTimeout(() => {
              onSendMessage(fallbackCommand);
              setActiveSpeechInterim('');
              setVoiceFallbackNotice(null);
            }, 1200);
          }, 400);
        }
      });

      if (!started) {
        setTimeout(() => {
          const fallbackCommand = quickPrompts[0]?.query || "Explain the visible carton damage on the conveyor";
          setActiveSpeechInterim(fallbackCommand);
          setTimeout(() => {
            onSendMessage(fallbackCommand);
            setActiveSpeechInterim('');
          }, 1200);
        }, 300);
      }
    }
  };

  const handleStopSpeaking = () => {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      speechService.stop();
    } catch {}
  };

  const handleRepeatLast = () => {
    const lastVoxLensMsg = [...messages].reverse().find(m => m.sender === 'voxlens');
    if (lastVoxLensMsg) {
      try {
        soundEngine.playSuccess();
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(lastVoxLensMsg.text);
          utterance.rate = 1.0;
          if (currentLanguage === 'hi') {
            utterance.lang = 'hi-IN';
          }
          window.speechSynthesis.speak(utterance);
        }
      } catch {}
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isProcessing) return;
    onSendMessage(inputText);
    setInputText('');
    soundEngine.playMicOn();
  };

  return (
    <div className="flex flex-col h-full bg-[#060B16] rounded-3xl border border-white/[0.08] shadow-2xl overflow-hidden relative">
      {/* Top Voice Copilot Header */}
      <div className="p-5 border-b border-white/[0.08] bg-[#080F1E]/95 backdrop-blur-md flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#00F0FF]/15 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] shadow-lg shadow-[#00F0FF]/10">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black text-white font-sans tracking-wide">
                VOICE COPILOT
              </span>
              <span className="text-[10px] font-mono font-bold text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 rounded-md border border-[#00F0FF]/30">
                MULTIMODAL DUPLEX
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Voice + Packaging Vision + Grounded SOP §6.2
            </div>
          </div>
        </div>

        {/* Live Status Indicator */}
        <div className="flex items-center gap-2">
          {voiceState === 'LISTENING' && (
            <span className="px-3.5 py-1.5 rounded-xl bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-mono font-bold flex items-center gap-2 animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-ping" />
              <span>● LISTENING</span>
            </span>
          )}
          {voiceState === 'PROCESSING' && (
            <span className="px-3.5 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold flex items-center gap-2 animate-pulse">
              <BrainCircuit className="w-4 h-4 text-purple-400 animate-spin" />
              <span>● THINKING</span>
            </span>
          )}
          {voiceState === 'RESPONDING' && (
            <span className="px-3.5 py-1.5 rounded-xl bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40 text-xs font-mono font-bold flex items-center gap-2 animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF]" />
              <span>● RESPONDING</span>
            </span>
          )}
          {voiceState === 'IDLE' && (
            <span className="px-3.5 py-1.5 rounded-xl bg-white/[0.06] text-slate-400 border border-white/[0.08] text-xs font-mono font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>STANDBY</span>
            </span>
          )}
        </div>
      </div>

      {/* Voice Fallback Notice */}
      {voiceFallbackNotice && (
        <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 text-amber-300 text-xs flex items-center justify-between font-mono animate-fadeIn">
          <span>{voiceFallbackNotice}</span>
          <span className="text-amber-400/70 text-[10px]">[FALLBACK ACTIVE]</span>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
        {messages.map((msg) => {
          const isVoxLens = msg.sender === 'voxlens';
          const isSystem = msg.sender === 'system';

          if (isSystem) {
            return (
              <div key={msg.id} className="flex justify-center my-2">
                <div className="px-4 py-1.5 rounded-full bg-white/[0.04] text-slate-300 text-xs flex items-center gap-2 border border-white/[0.06] font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span>{msg.text}</span>
                </div>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isVoxLens ? 'items-start' : 'items-end'}`}
            >
              {/* Speaker label & timestamp */}
              <div className="flex items-center gap-2 mb-2 px-2 text-xs text-slate-400 font-mono">
                <span className={`font-bold ${isVoxLens ? 'text-[#00F0FF]' : 'text-slate-200'}`}>
                  {isVoxLens ? '✦ VOXLENS AI' : 'FIELD TECHNICIAN'}
                </span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[95%] rounded-3xl p-5 sm:p-6 text-sm sm:text-base leading-relaxed shadow-xl ${
                  isVoxLens
                    ? 'bg-[#080F1E] text-slate-100 border border-white/[0.1] ring-1 ring-white/[0.04]'
                    : 'bg-[#1E293B] text-white border border-white/[0.15]'
                }`}
              >
                <div className="whitespace-pre-line font-sans font-normal text-sm sm:text-base">
                  {msg.text}
                </div>

                {/* Grounded Citation Card */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-white/[0.08] space-y-2">
                    <div className="p-4 rounded-2xl bg-[#030712] border border-white/[0.1] flex items-center justify-between gap-4 shadow-inner">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400 border border-purple-500/30 shrink-0">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-mono uppercase tracking-wider text-purple-400 font-black">
                            GROUNDED IN:
                          </div>
                          <div className="text-sm font-bold text-white truncate">
                            {msg.citations[0].manualTitle.split('—')[0] || 'PACKAGING LINE 3 SOP'}
                          </div>
                          <div className="text-xs text-slate-400 font-mono">
                            {msg.citations[0].section} · Page {msg.citations[0].page} · {msg.citations[0].relevanceScore}% vector match
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectManualCitation(msg.citations![0])}
                        className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-xs font-mono font-bold text-white flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
                      >
                        <span>View Citation</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Recommended Next Step Callout Box */}
                {isVoxLens && (
                  <div className="mt-4 p-4 rounded-2xl bg-[#030712] border border-[#00F0FF]/30 space-y-2.5 shadow-md">
                    <div className="text-xs font-bold text-[#00F0FF] uppercase tracking-wider flex items-center gap-1.5 font-mono">
                      <ListChecks className="w-4 h-4" />
                      <span>RECOMMENDED IMMEDIATE STEPS:</span>
                    </div>
                    <div className="space-y-1.5 text-xs sm:text-sm text-slate-200">
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                        <span>Isolate affected damaged carton from line and apply LOTO before cell entry.</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#00F0FF]/20 text-[#00F0FF] text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                        <span>Inspect robotic gripper vacuum cups, conveyor transfer plate, and verify PLC alarm log.</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Safety Gate Action Card */}
                {msg.actionCard?.type === 'approval_request' && (
                  <div className="mt-4 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/40 space-y-3 shadow-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-amber-300 flex items-center gap-2 font-mono">
                        <Lock className="w-4 h-4" />
                        HUMAN AUTHORIZATION REQUIRED
                      </span>
                      <span className="text-xs font-mono font-black text-amber-400 bg-amber-500/20 px-3 py-1 rounded-lg border border-amber-500/30">
                        LOTO SW-1
                      </span>
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      Requisition Part #PKG-GRP42 (Gripper Vacuum Cup Assembly) and dispatch Maintenance Ticket #TCK-2026-881.
                    </p>
                    <button
                      onClick={onRequestSafetyApproval}
                      className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:scale-[1.01]"
                    >
                      <span>Review &amp; Authorize Action ($245.00)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Live speech interim rendering */}
        {activeSpeechInterim && (
          <div className="flex flex-col items-end animate-fadeIn">
            <div className="max-w-[85%] rounded-3xl p-5 bg-[#1E293B] border border-[#00F0FF]/50 text-[#00F0FF] text-sm italic font-sans shadow-xl">
              "{activeSpeechInterim}"
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="px-6 py-2.5 border-t border-white/[0.06] flex items-center gap-2.5 overflow-x-auto no-scrollbar bg-[#060B16]">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => onSendMessage(qp.query)}
            className="px-4 py-2 rounded-full bg-white/[0.05] hover:bg-[#00F0FF]/15 hover:text-[#00F0FF] hover:border-[#00F0FF]/40 text-xs font-semibold text-slate-300 whitespace-nowrap transition-all border border-white/[0.06] cursor-pointer"
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* Bottom Voice Controls & Mic Bar */}
      <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-[#060B16]">
        {/* SPEAK / STOP / REPEAT Action Buttons Strip */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleVoiceToggle}
              className="px-3 py-1.5 rounded-xl bg-[#00F0FF]/15 hover:bg-[#00F0FF]/25 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>SPEAK</span>
            </button>

            <button
              onClick={handleStopSpeaking}
              className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-slate-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Square className="w-3 h-3" />
              <span>STOP</span>
            </button>

            <button
              onClick={handleRepeatLast}
              className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-slate-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>REPEAT</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-400 hidden sm:block">
            {currentLanguage.toUpperCase()} · WebSpeech Duplex
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Large Voice Mic Button */}
          <button
            onClick={handleVoiceToggle}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shrink-0 shadow-2xl cursor-pointer ${
              voiceState === 'LISTENING'
                ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-500/30 scale-105'
                : 'bg-[#00F0FF] text-slate-950 hover:bg-[#38BDF8] hover:scale-105 shadow-[#00F0FF]/20'
            }`}
            title="Click to talk with VoxLens"
            aria-label="Toggle microphone"
          >
            {voiceState === 'LISTENING' ? (
              <MicOff className="w-6 h-6" />
            ) : (
              <Mic className="w-6 h-6" />
            )}
          </button>

          {/* Waveform and Input Form */}
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            <AudioWaveform voiceState={voiceState} height={20} />

            <form onSubmit={handleFormSubmit} className="flex items-center gap-2.5">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t.copilot?.placeholder || 'Ask VoxLens or speak in your language...'}
                className="flex-1 bg-[#080F1E] border border-white/[0.1] focus:border-[#00F0FF] rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all shadow-inner"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isProcessing}
                className="p-3.5 rounded-xl bg-[#00F0FF] hover:bg-[#38BDF8] text-slate-950 font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-md cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

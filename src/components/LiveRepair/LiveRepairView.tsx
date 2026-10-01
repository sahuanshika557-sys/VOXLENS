import React, { useState } from 'react';
import { CameraHUD } from './CameraHUD';
import { CopilotChat } from './CopilotChat';
import { CriticalFindingCard } from './CriticalFindingCard';
import { AIReasoningTimeline } from './AIReasoningTimeline';
import { TelemetryStrip } from './TelemetryStrip';
import { AgentPipelineStrip } from './AgentPipelineStrip';
import { RAGKnowledgePanel } from './RAGKnowledgePanel';
import { LiveActivityTimeline } from './LiveActivityTimeline';
import { DashboardKPIs } from './DashboardKPIs';
import { BeforeAfterStoryCard } from './BeforeAfterStoryCard';
import { DashboardQuote } from './DashboardQuote';
import { AgentActionCenter } from './AgentActionCenter';
import { 
  Equipment, 
  CopilotMessage, 
  VoiceState, 
  ManualCitation, 
  AgentPlanStep, 
  AIDecisionSummary, 
  SafetyGateRequest 
} from '../../types';
import { MessageSquare, Layers, ShieldCheck, BrainCircuit, History, BookOpen, AlertTriangle } from 'lucide-react';
import { LanguageCode } from '../../i18n/translations';

interface LiveRepairViewProps {
  equipment: Equipment;
  messages: CopilotMessage[];
  voiceState: VoiceState;
  planSteps: AgentPlanStep[];
  decisionSummary: AIDecisionSummary;
  safetyGate: SafetyGateRequest | null;
  onSendMessage: (text: string, intent?: string) => void;
  onSelectManualCitation: (cite: ManualCitation) => void;
  onOpenSafetyModal: () => void;
  onOpenKnowledge: () => void;
  onDetectFault: (code: string) => void;
  isScanning: boolean;
  onTriggerScan: () => void;
  isProcessing: boolean;
  currentLanguage?: LanguageCode;
}

export const LiveRepairView: React.FC<LiveRepairViewProps> = ({
  equipment,
  messages,
  voiceState,
  planSteps,
  decisionSummary,
  safetyGate,
  onSendMessage,
  onSelectManualCitation,
  onOpenSafetyModal,
  onOpenKnowledge,
  onDetectFault,
  isScanning,
  onTriggerScan,
  isProcessing,
  currentLanguage = 'en'
}) => {
  const [rightPanelTab, setRightPanelTab] = useState<'copilot' | 'reasoning' | 'evidence' | 'agent' | 'timeline'>('copilot');

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col gap-6 overflow-y-auto max-w-[1800px] mx-auto w-full bg-[#030712] select-none">
      {/* 1. TOP DOCK: System Telemetry & Autonomous Pipeline */}
      <div className="flex flex-col gap-3 w-full shrink-0">
        <TelemetryStrip
          voiceState={voiceState}
          isScanning={isScanning}
          safetyArmed={Boolean(safetyGate && safetyGate.status === 'PENDING_APPROVAL')}
        />
        <AgentPipelineStrip
          isScanning={isScanning}
          safetyPending={Boolean(safetyGate && safetyGate.status === 'PENDING_APPROVAL')}
        />
      </div>

      {/* 2. MAIN MISSION CONTROL COCKPIT (60% Machine Hero / 40% Intelligence Center) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
        {/* Left Column (7 cols ~ 58%): Machine Hero & Active Incident */}
        <div className="lg:col-span-7 flex flex-col gap-5 w-full">
          {/* Main Visual Camera HUD */}
          <div className="w-full">
            <CameraHUD
              equipment={equipment}
              onDetectFault={onDetectFault}
              isScanning={isScanning}
              onTriggerScan={onTriggerScan}
              voiceState={voiceState}
            />
          </div>

          {/* Active Critical Incident Banner */}
          <div className="w-full">
            <CriticalFindingCard
              errorCode={equipment.activeErrorCode || 'E17'}
              temperatureC={equipment.telemetry.motorTempC || 88.4}
              onOpenSafetyModal={onOpenSafetyModal}
              onOpenKnowledge={onOpenKnowledge}
            />
          </div>
        </div>

        {/* Right Column (5 cols ~ 42%): AI Copilot, Reasoning & Decision Workspace */}
        <div className="lg:col-span-5 flex flex-col rounded-3xl bg-[#060B16] border border-white/[0.08] shadow-2xl overflow-hidden w-full min-h-[640px] lg:h-[780px]">
          {/* Clean Navigation Tabs */}
          <div className="flex items-center justify-between p-3 border-b border-white/[0.08] bg-[#080F1E]/95 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/[0.06] overflow-x-auto no-scrollbar">
              <button
                onClick={() => setRightPanelTab('copilot')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                  rightPanelTab === 'copilot'
                    ? 'bg-[#00F0FF] text-slate-950 shadow-md shadow-[#00F0FF]/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>COPILOT</span>
              </button>

              <button
                onClick={() => setRightPanelTab('reasoning')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                  rightPanelTab === 'reasoning'
                    ? 'bg-[#00F0FF] text-slate-950 shadow-md shadow-[#00F0FF]/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BrainCircuit className="w-4 h-4" />
                <span>DECISION</span>
              </button>

              <button
                onClick={() => setRightPanelTab('evidence')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                  rightPanelTab === 'evidence'
                    ? 'bg-[#00F0FF] text-slate-950 shadow-md shadow-[#00F0FF]/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>EVIDENCE</span>
              </button>

              <button
                onClick={() => setRightPanelTab('agent')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                  rightPanelTab === 'agent'
                    ? 'bg-[#00F0FF] text-slate-950 shadow-md shadow-[#00F0FF]/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>ACTIONS</span>
                {safetyGate && safetyGate.status === 'PENDING_APPROVAL' && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                )}
              </button>

              <button
                onClick={() => setRightPanelTab('timeline')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                  rightPanelTab === 'timeline'
                    ? 'bg-[#00F0FF] text-slate-950 shadow-md shadow-[#00F0FF]/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <History className="w-4 h-4" />
                <span>TIMELINE</span>
              </button>
            </div>

            <span className="text-xs font-mono text-emerald-400 font-bold hidden xl:flex items-center gap-1.5 pr-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Grounded</span>
            </span>
          </div>

          {/* Panel Views Container */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {rightPanelTab === 'copilot' && (
              <CopilotChat
                messages={messages}
                voiceState={voiceState}
                onSendMessage={onSendMessage}
                onSelectManualCitation={onSelectManualCitation}
                onRequestSafetyApproval={onOpenSafetyModal}
                isProcessing={isProcessing}
                currentLanguage={currentLanguage}
              />
            )}

            {rightPanelTab === 'reasoning' && (
              <div className="flex-1 overflow-y-auto p-5">
                <AIReasoningTimeline
                  decisionSummary={decisionSummary}
                  onOpenKnowledge={onOpenKnowledge}
                  onOpenSafetyModal={onOpenSafetyModal}
                />
              </div>
            )}

            {rightPanelTab === 'evidence' && (
              <div className="flex-1 overflow-y-auto p-5">
                <RAGKnowledgePanel
                  onOpenKnowledge={onOpenKnowledge}
                />
              </div>
            )}

            {rightPanelTab === 'agent' && (
              <div className="flex-1 overflow-y-auto p-5">
                <AgentActionCenter
                  planSteps={planSteps}
                  decisionSummary={decisionSummary}
                  safetyGate={safetyGate}
                  onOpenSafetyModal={onOpenSafetyModal}
                  onOpenKnowledge={onOpenKnowledge}
                />
              </div>
            )}

            {rightPanelTab === 'timeline' && (
              <div className="flex-1 overflow-y-auto p-5">
                <LiveActivityTimeline />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. FOUR LARGE-FORMAT OPERATIONAL KPIS (Clear Spacing, No Overlaps) */}
      <div className="w-full shrink-0 pt-2">
        <DashboardKPIs />
      </div>

      {/* 4. VALUE TRANSFORMATION STORY */}
      <div className="w-full shrink-0">
        <BeforeAfterStoryCard onWatchStory={onOpenKnowledge} />
      </div>

      {/* 5. BRAND INSPIRATION QUOTE */}
      <div className="w-full shrink-0">
        <DashboardQuote />
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LiveRepairView } from './components/LiveRepair/LiveRepairView';
import { KnowledgeView } from './components/KnowledgeView';
import { AgentActionsView } from './components/AgentActionsView';
import { SessionMemoryView } from './components/SessionMemoryView';
import { EquipmentView } from './components/EquipmentView';
import { SupervisorView } from './components/SupervisorView';
import { TicketsView } from './components/TicketsView';
import { StoryView } from './components/StoryView';
import { AnalyticsView } from './components/AnalyticsView';
import { SafetyGateModal } from './components/SafetyGateModal';
import { DemoTour } from './components/DemoTour';
import { CinematicStory } from './components/cinematic/CinematicStory';
import { ToastContainer, ToastMessage } from './components/common/Toast';
import { BootSequence } from './components/common/BootSequence';
import { LanguageCode, getTranslation, SUPPORTED_LANGUAGES } from './i18n/translations';

import { 
  NavigationTab, 
  UserRole, 
  VoiceState, 
  Equipment, 
  CopilotMessage, 
  AgentPlanStep, 
  AIDecisionSummary, 
  SafetyGateRequest, 
  ManualCitation, 
  SessionMemoryItem, 
  TriedAction, 
  MaintenanceTicket,
  InventoryItem,
  RepairWorkflowStep,
  RootCauseHypothesis
} from './types';

import { 
  DEMO_EQUIPMENT, 
  INITIAL_CITATIONS, 
  INITIAL_TICKETS, 
  INITIAL_SAFETY_GATE,
  INVENTORY_PARTS 
} from './data/mockData';

import { 
  visionService, 
  knowledgeService, 
  inventoryService, 
  ticketService,
  INITIAL_8_STEP_REPAIR_WORKFLOW,
  INITIAL_PACKAGING_HYPOTHESES,
  PACKAGING_DEFECT_MANUAL_CITATIONS,
  getScenarioConfig
} from './services';

import { soundEngine } from './utils/soundEngine';

export function App() {
  // Multilingual & Boot State
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const [showBootSequence, setShowBootSequence] = useState<boolean>(() => !sessionStorage.getItem('voxlens_booted'));

  // Navigation & Role State
  const [activeTab, setActiveTab] = useState<NavigationTab>('live-repair');
  const [currentRole, setCurrentRole] = useState<UserRole>('technician');
  const [currentScenario, setCurrentScenario] = useState<string>('packaging-defect');

  // Active Equipment
  const [activeEquipment, setActiveEquipment] = useState<Equipment>(DEMO_EQUIPMENT[0]);

  // Audio / Speech Flags
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(true);
  const [voiceState, setVoiceState] = useState<VoiceState>('IDLE');

  // Scanning & Processing state
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Safety Gate Modal State
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState<boolean>(false);
  const [safetyGate, setSafetyGate] = useState<SafetyGateRequest | null>(INITIAL_SAFETY_GATE);

  // Knowledge Selected Citation
  const [selectedCitation, setSelectedCitation] = useState<ManualCitation | null>(PACKAGING_DEFECT_MANUAL_CITATIONS[0]);

  // 8-Step Interactive Repair Workflow & Hypothesis State
  const [workflowSteps, setWorkflowSteps] = useState<RepairWorkflowStep[]>(INITIAL_8_STEP_REPAIR_WORKFLOW);
  const [hypotheses, setHypotheses] = useState<RootCauseHypothesis[]>(INITIAL_PACKAGING_HYPOTHESES);

  // Tickets & Inventory State
  const [tickets, setTickets] = useState<MaintenanceTicket[]>(INITIAL_TICKETS);
  const [inventory, setInventory] = useState<InventoryItem[]>(INVENTORY_PARTS);

  // Demo Mode State
  const [isDemoRunning, setIsDemoRunning] = useState<boolean>(false);
  const [demoStep, setDemoStep] = useState<number>(1);

  // Cinematic Story Mode State
  const [isCinematicStoryOpen, setIsCinematicStoryOpen] = useState<boolean>(false);

  // Toast Notifications State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, description?: string, type: ToastMessage['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, title, description, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Session Memory Timeline
  const [memoryItems, setMemoryItems] = useState<SessionMemoryItem[]>([
    {
      id: 'mem-1',
      time: '10:31',
      iconType: 'scan',
      label: 'Packaging Defect Detected',
      detail: 'Optical vision pipeline detected severely crushed & torn cardboard carton on Line 3 conveyor.',
      status: 'warning'
    },
    {
      id: 'mem-2',
      time: '10:32',
      iconType: 'scan',
      label: 'Red Tower Light Identified',
      detail: 'Red stack light status active — requiring physical HMI/PLC error buffer register verification.',
      status: 'info'
    },
    {
      id: 'mem-3',
      time: '10:33',
      iconType: 'knowledge',
      label: 'Packaging SOP & LOTO Retrieved',
      detail: 'Packaging SOP Section 6.2 and Plant LOTO Section 2.1 loaded via dense semantic index.',
      status: 'success'
    }
  ]);

  // What We Already Tried Checklist
  const [triedActions, setTriedActions] = useState<TriedAction[]>([
    {
      id: 'try-1',
      step: 'Production Stream Quarantine',
      timeChecked: '10:33',
      outcome: 'Passed',
      notes: 'Damaged carton isolated. Upstream cartons visually verified intact.'
    },
    {
      id: 'try-2',
      step: 'Robotic Gripper Clearance Check',
      timeChecked: '10:34',
      outcome: 'Pending Verification',
      notes: 'LOTO SW-1 applied. Physical vacuum cup and transfer plate inspection in progress.'
    }
  ]);

  // Agent Plan Steps Pipeline
  const [planSteps, setPlanSteps] = useState<AgentPlanStep[]>([
    {
      id: 1,
      title: 'Inspect Visual Frame',
      description: 'Multimodal vision detection on packaging line',
      status: 'COMPLETED',
      requiresApproval: false,
      resultSummary: 'Observed: Crushed Carton + Red Stack Light'
    },
    {
      id: 2,
      title: 'Identify Defect Category',
      description: 'Packaging integrity & carton damage',
      status: 'COMPLETED',
      requiresApproval: false,
      resultSummary: 'Severity: High (Structural Damage)'
    },
    {
      id: 3,
      title: 'Retrieve SOP Evidence',
      description: 'Dense search on Packaging SOP & LOTO protocols',
      status: 'COMPLETED',
      requiresApproval: false,
      resultSummary: 'Loaded: SOP Section 6.2 & LOTO Section 2.1'
    },
    {
      id: 4,
      title: 'Guide 8-Step Repair Workflow',
      description: 'Safety, containment, mechanical, QA, and alarm check',
      status: 'IN_PROGRESS',
      requiresApproval: false
    },
    {
      id: 5,
      title: 'HMI Alarm Code Verification',
      description: 'Verify red stack light code in PLC fault buffer',
      status: 'LOCKED_APPROVAL',
      requiresApproval: false
    },
    {
      id: 6,
      title: 'Controlled Test Run & Sign-Off',
      description: 'Authorize test cartons & operator sign-off',
      status: 'LOCKED_APPROVAL',
      requiresApproval: true
    }
  ]);

  // AI Decision Summary
  const [decisionSummary, setDecisionSummary] = useState<AIDecisionSummary>({
    observed: [
      'Visibly crushed and torn cardboard carton on conveyor belt',
      'Multiple intact packaging cartons moving along line',
      'Red illuminated tower warning stack light active',
      'Industrial robotic arm & conveyor transfer plate present'
    ],
    knowledgeUsed: [
      'Line 3 Material Handling & Robotic SOP Section 6.2',
      'Plant Hazardous Energy Isolation (LOTO) Section 2.1',
      'Packaging Cell Tower Light Annex Section 3.4'
    ],
    recommendation: 'Isolate damaged carton from production stream, apply LOTO SW-1, inspect robotic gripper suction cups & conveyor transfer alignment, and verify red stack light alarm on PLC/HMI log.',
    confidence: 'Visual Assessment',
    confidenceScore: 92,
    nextAction: 'Follow 8-Step Guided Repair Workflow and document root-cause verification.',
    safetyRequirement: 'Apply LOTO padlocks to Disconnect-3A before reaching into conveyor transfer zone or robotic gripper envelopes.'
  });

  // Copilot Messages Stream with accurate initial message
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'msg-init',
      sender: 'voxlens',
      text: "The image shows a severely crushed and torn carton on the conveyor. Isolate the affected carton, inspect the robotic gripping and conveyor transfer mechanisms, and verify the warning indicator against the actual machine alarm log. Confirm the root cause before implementing corrective action.",
      timestamp: '10:30:12',
      citations: [PACKAGING_DEFECT_MANUAL_CITATIONS[0]],
      suggestedPrompts: [
        'Explain carton defect',
        'What should I check first?',
        'Red stack light meaning?',
        '8-step repair workflow'
      ]
    }
  ]);

  // 8-Step Workflow Interaction Handlers
  const handleToggleWorkflowStep = (stepId: number) => {
    setWorkflowSteps(prev => prev.map(s => {
      if (s.id === stepId) {
        const nextState = !s.isCompleted;
        if (nextState) {
          soundEngine.playSuccess();
          addToast(`Step ${s.stepNumber} Completed`, s.shortLabel, 'success');
        }
        return {
          ...s,
          isCompleted: nextState,
          completedAt: nextState ? new Date().toLocaleTimeString() : undefined
        };
      }
      return s;
    }));
  };

  const handleUpdateStepNotes = (stepId: number, notes: string) => {
    setWorkflowSteps(prev => prev.map(s => s.id === stepId ? { ...s, technicianNotes: notes } : s));
  };

  const handleUpdateHypothesisStatus = (hypoId: string, status: RootCauseHypothesis['status']) => {
    setHypotheses(prev => prev.map(h => {
      if (h.id === hypoId) {
        soundEngine.playMicOn();
        addToast(`Hypothesis Updated`, `${h.title}: ${status}`, 'info');
        return { ...h, status };
      }
      return h;
    }));
  };

  const handleAttachEvidence = (stepId: number, url: string) => {
    setWorkflowSteps(prev => prev.map(s => {
      if (s.id === stepId) {
        const existing = s.evidenceUrls || [];
        return { ...s, evidenceUrls: [...existing, url] };
      }
      return s;
    }));
    soundEngine.playSuccess();
    addToast('Evidence Attached', 'Photo inspection note logged to step record.', 'success');
  };

  const handleSignoffWorkflow = (notes: string) => {
    soundEngine.playSuccess();
    setWorkflowSteps(prev => prev.map(s => s.id === 8 ? {
      ...s,
      isCompleted: true,
      technicianNotes: notes,
      completedAt: new Date().toLocaleTimeString()
    } : s));

    const newMem: SessionMemoryItem = {
      id: `mem-signoff-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      iconType: 'approval',
      label: 'Packaging Case Resolved & Signed Off',
      detail: `Operator verification complete: ${notes}`,
      status: 'success'
    };
    setMemoryItems(prev => [...prev, newMem]);

    addToast('Case Resolved', 'Qualified operator verified corrective action & acceptance criteria.', 'success');
    soundEngine.speak("Case resolved and signed off. Corrective action verified on Line 3.");
  };

  const handleReopenWorkflow = () => {
    soundEngine.playAlert();
    setWorkflowSteps(prev => prev.map(s => s.id === 8 ? { ...s, isCompleted: false } : s));
    addToast('Case Reopened', 'Investigation returned to active troubleshooting.', 'warning');
  };

  // Handle Language Switch across the entire application (All 10 Dialects)
  const handleSelectLanguage = (newLang: LanguageCode) => {
    setCurrentLanguage(newLang);
    const t = getTranslation(newLang);
    const langMeta = SUPPORTED_LANGUAGES.find(l => l.code === newLang);

    // Provide localized packaging diagnostic message directly from dictionary
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const localizedMsg = t.copilot?.cartonDiagnosis || t.copilot?.greeting;

    const localizedInitMsg: CopilotMessage = {
      id: `msg-lang-${Date.now()}`,
      sender: 'voxlens',
      text: localizedMsg,
      timestamp: timeStr,
      citations: [PACKAGING_DEFECT_MANUAL_CITATIONS[0]],
      suggestedPrompts: t.copilot?.quickPrompts?.map(qp => qp.label) || [
        'Analyze Damaged Carton',
        'What should I check first?',
        'Red Warning Light Meaning',
        '8-Step Repair Workflow'
      ]
    };
    setMessages([localizedInitMsg]);

    setDecisionSummary(prev => ({
      ...prev,
      recommendation: `${t.copilot?.recStep1 || ''} ${t.copilot?.recStep2 || ''}`
    }));

    addToast(`Language: ${langMeta?.nativeLabel || newLang.toUpperCase()}`, localizedMsg.slice(0, 80) + '...', 'info');

    // Speak localized greeting in the exact regional voice
    soundEngine.speak(
      localizedMsg.slice(0, 200),
      langMeta?.speechLocale || 'en-US'
    );
  };

  // Handle Scenario Switch (All 11 Industrial Suites & Fallbacks)
  const handleSelectScenario = (scenarioId: string) => {
    setCurrentScenario(scenarioId);
    soundEngine.playMicOn();
    const t = getTranslation(currentLanguage);
    const langMeta = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage);
    const cfg = getScenarioConfig(scenarioId);

    // Synchronize all core application states to the chosen scenario
    setActiveEquipment(cfg.equipment);
    setWorkflowSteps(cfg.workflowSteps);
    setHypotheses(cfg.hypotheses);
    setSelectedCitation(cfg.citations[0] || null);
    setDecisionSummary(cfg.decisionSummary);

    let scenarioText = "";
    if (scenarioId === 'packaging-defect') {
      scenarioText = t.copilot?.cartonDiagnosis || t.copilot?.greeting;
    } else if (scenarioId === 'e17-cooling') {
      scenarioText = t.copilot?.responseE17Mean || `E17 Motor Stator Thermal Overload: 88.4°C detected on stator housing with restricted cooling airflow (1.2 L/min). Apply LOTO SW-1 and inspect axial fan impeller for particulate binding.`;
    } else {
      scenarioText = `${cfg.label} activated. Observed: ${cfg.observedEvidence.join(' · ')}. Recommendation: ${cfg.recommendedAction}`;
    }

    const msg: CopilotMessage = {
      id: `scen-${Date.now()}`,
      sender: 'voxlens',
      text: scenarioText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citations: cfg.citations
    };
    setMessages([msg]);
    addToast(cfg.label, `Telemetry & 8-Step Workflow synchronized.`, 'info');

    // Voice announcement
    soundEngine.speak(
      scenarioText.slice(0, 180),
      langMeta?.speechLocale || 'en-US'
    );
  };

  // Audio / Speech Toggles
  const handleToggleSound = () => {
    const next = soundEngine.toggleSound();
    setSoundEnabled(next);
    addToast(next ? 'Sound Effects Enabled' : 'Sound Effects Muted', undefined, 'info');
  };

  const handleToggleSpeech = () => {
    const next = soundEngine.toggleSpeech();
    setSpeechEnabled(next);
    addToast(next ? 'Speech Synthesis Enabled' : 'Speech Synthesis Disabled', undefined, 'info');
  };

  // Trigger Multimodal Vision Scan (Calibrated to Active Industrial Fault Suite)
  const handleTriggerScan = (targetScenarioId?: string) => {
    setIsScanning(true);
    soundEngine.playScanPing();
    const effectiveScenario = targetScenarioId || currentScenario;
    const t = getTranslation(currentLanguage);
    const langMeta = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage);
    const cfg = getScenarioConfig(effectiveScenario);

    addToast('Analyzing Image Feed', `Deep vision analysis for ${cfg.label}...`, 'info');

    setTimeout(() => {
      setIsScanning(false);
      soundEngine.playScanPing();

      let responseText = "";
      if (effectiveScenario === 'packaging-defect') {
        addToast('Defect Identified', 'Crushed & torn carton on conveyor · Red stack light active', 'warning');
        responseText = t.copilot?.responseScanDetected || "Image analysis verified: Severely crushed and torn cardboard carton observed on conveyor. Red stack light active — alarm meaning undetermined pending PLC/HMI verification.";
      } else if (effectiveScenario === 'camera-blocked') {
        addToast('Optical Mode Degraded', 'Lens glare / particulate dust detected. SCADA fallback active.', 'warning');
        responseText = "Optical Mode Degraded: Particulate dust and high-bay lighting glare detected over optical camera dome. Anti-Hallucination Guardrail: Optical guessing suspended. Autonomous fallback to real-time SCADA telemetry (Motor: 88.4°C, Cooling: 1.2 L/min) and Voice Copilot active.";
      } else if (effectiveScenario === 'low-confidence') {
        addToast('Low Visual Confidence', 'Conveyor safety guard mesh partially occludes view (38%).', 'warning');
        responseText = "⚠ Low Visual Confidence (38%): Protective wire-mesh safety cage and shadows partially occlude the robotic transfer zone. Anti-hallucination guardrail active: VOXLENS will not guess an unverified fault code. Please capture an orthogonal photo or verify clearances physically.";
      } else if (effectiveScenario === 'e17-cooling') {
        addToast('E17 Thermal Overload', '7-Segment OCR verified E17 · Stator hotspot 88.4°C', 'warning');
        responseText = "Thermal Overload Verified: 7-segment digital display OCR matches E17. Stator housing thermal hotspot registers 88.4°C (+13.4°C above safe limit) with severe cooling airflow restriction (1.2 L/min). Step 1 LOTO isolation required.";
      } else if (effectiveScenario === 'bearing-vibration') {
        addToast('Bearing Vibration Anomaly', 'ISO 10816-3 Zone C: 4.8 mm/s RMS', 'warning');
        responseText = "Mechanical Vibration Anomaly: Drive-end bearing accelerometer registers 4.8 mm/s RMS (ISO 10816-3 Zone C). Peak harmonic spectrum indicates inner race fatigue/spalling.";
      } else if (effectiveScenario === 'belt-slippage') {
        addToast('Drive Belt Slippage', 'Optical speed delta: 2708 vs 2840 RPM (-4.6%)', 'warning');
        responseText = "Transmission Slippage Detected: Optical shaft encoder measures 4.6% speed slip under load. Tension frequency measured at 38 Hz vs 52 Hz spec.";
      } else if (effectiveScenario === 'hydraulic-press') {
        addToast('Hydraulic Pressure Drop', 'CR-800 manifold transducer: 2200 kPa (-12%)', 'warning');
        responseText = "Hydraulic Manifold Anomaly: CR-800 digital pressure transducer reads 2200 kPa (-12% drop). Proportional directional valve weeping noted.";
      } else if (effectiveScenario === 'optical-ocr') {
        addToast('Electrical Overcurrent', '7-Segment OCR matches E04 · Current spike 34.8A', 'warning');
        responseText = "Electrical Overcurrent Trip: 7-segment display reads E04. VFD current spiked to 34.8A with 22% phase imbalance at Terminal Block TB-2.";
      } else if (effectiveScenario === 'zero-inventory') {
        addToast('Stockroom Zero Inventory', 'Bay 4 Bin C-14: 0 units available', 'warning');
        responseText = "Stockroom Stockout: Bin C-14 stock ledger verified 0 units for Part #VX-CF42. Engaging Level-2 Supervisor Gate for regional courier dispatch.";
      } else {
        addToast(cfg.faultTitle, `Visual scan verified: ${cfg.defectCategory}`, 'info');
        responseText = `${cfg.faultTitle} verified. Observed: ${cfg.observedEvidence.join(' · ')}. Recommended action: ${cfg.recommendedAction}`;
      }

      const botMsg: CopilotMessage = {
        id: `scan-msg-${Date.now()}`,
        sender: 'voxlens',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: cfg.citations
      };
      setMessages(prev => [...prev, botMsg]);

      soundEngine.speak(
        responseText.slice(0, 220),
        langMeta?.speechLocale || 'en-US'
      );
    }, 1200);
  };

  // Dispatch AI Copilot Response (Multilingual Aware & Grounded)
  const handleSendMessage = (userText: string, intent?: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const t = getTranslation(currentLanguage);
    const langMeta = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage);
    
    // Add user message
    const userMsg: CopilotMessage = {
      id: `user-${Date.now()}`,
      sender: 'technician',
      text: userText,
      timestamp: timeStr
    };

    setMessages(prev => [...prev, userMsg]);
    setIsProcessing(true);
    setVoiceState('PROCESSING');

    setTimeout(() => {
      const lower = userText.toLowerCase();
      let replyText = "";
      let citations = PACKAGING_DEFECT_MANUAL_CITATIONS;
      let toolCalls: any[] = [];
      let actionCard: any = undefined;

      // Handle Red Warning Light query
      if (lower.includes('light') || lower.includes('stack') || lower.includes('red') || lower.includes('लाल') || lower.includes('লাইট') || lower.includes('விளக்கு') || lower.includes('లైట్') || lower.includes('दिवा') || lower.includes('લાઇટ') || lower.includes('ದೀಪ') || lower.includes('ਬੱਤੀ') || lower.includes('لائٹ')) {
        replyText = t.copilot?.responseStackLight || t.copilot?.responseE17Mean || "A red illuminated tower warning light is visible in the background. Verify the active alarm code directly from the HMI screen or PLC fault buffer.";
        soundEngine.playAlert();
        addToast('Alarm Verification Gate', 'Verify red stack light code in PLC/HMI log.', 'warning');
      }
      // Handle "What should I check first" query
      else if (lower.includes('first') || lower.includes('check first') || lower.includes('पहले') || lower.includes('step 1') || lower.includes('প্রথম') || lower.includes('முதலில்') || lower.includes('మొదట') || lower.includes('प्रथम') || lower.includes('પહેલા') || lower.includes('ಮೊದಲು') || lower.includes('ਪਹਿਲਾਂ') || lower.includes('پہلے')) {
        replyText = t.copilot?.responseCheckFirst || "STEP 1 — SAFETY: First stop and isolate the affected equipment and apply Lockout/Tagout (LOTO SW-1). Next, STEP 2 — CONTAINMENT: Isolate the damaged carton from the production stream.";
        soundEngine.playMicOn();
        addToast('Safety & Containment', 'SOP Section 6.2 & LOTO Section 2.1', 'info');
      }
      // Handle ticket / CMMS request
      else if (lower.includes('ticket') || lower.includes('create ticket') || lower.includes('टिकट') || lower.includes('টিকিট') || lower.includes('டிக்கெட்') || lower.includes('టికెట్') || lower.includes('तिकीट') || lower.includes('ટિકિટ') || lower.includes('ಟಿಕೆಟ್') || lower.includes('ਟਿਕਟ') || lower.includes('ٹکٹ')) {
        replyText = t.copilot?.responseCreateTicket || "I have prepared Work Order #TCK-2026-881 for Line 3 Packaging. Human authorization is required for LOTO SW-1 isolation and part requisition.";
        actionCard = {
          type: 'approval_request',
          payload: {
            title: `${t.safetyGate?.authorize || 'Authorize Part Kit ($245.00)'} & Log Ticket #TCK-2026-881`
          }
        };
        soundEngine.playAlert();
        addToast('Human Approval Required', 'Financial & LOTO authorization required.', 'approval');
      }
      // Default: Comprehensive packaging defect diagnosis in the active language
      else {
        replyText = t.copilot?.cartonDiagnosis || t.copilot?.responseCartonHelp || t.copilot?.greeting;
        soundEngine.playMicOn();
      }

      const botMsg: CopilotMessage = {
        id: `bot-${Date.now()}`,
        sender: 'voxlens',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: citations,
        toolCalls: toolCalls,
        actionCard: actionCard
      };

      setMessages(prev => [...prev, botMsg]);
      setIsProcessing(false);
      setVoiceState('RESPONDING');

      // Speak response in the exact locale of chosen language
      soundEngine.speak(
        replyText.slice(0, 240),
        langMeta?.speechLocale || 'en-US',
        () => setVoiceState('RESPONDING'),
        () => setVoiceState('IDLE')
      );
    }, 850);
  };

  // Handle Safety Gate Approval
  const handleApproveSafetyGate = (gateId: string) => {
    soundEngine.playSuccess();
    setSafetyGate(prev => prev ? { ...prev, status: 'APPROVED', decidedAt: new Date().toLocaleTimeString() } : null);

    // Unlock plan steps
    setPlanSteps(prev => prev.map(s => {
      if (s.id === 5 || s.id === 6) {
        return {
          ...s,
          status: 'COMPLETED',
          resultSummary: s.id === 5 ? 'HMI Alarm Verified in Log' : 'Test Run Approved & Controlled Run Passed'
        };
      }
      return s;
    }));

    addToast('Action Authorized', 'LOTO Protocol & Ticket #TCK-2026-881 approved.', 'success');

    const botMsg: CopilotMessage = {
      id: `bot-approved-${Date.now()}`,
      sender: 'voxlens',
      text: "✓ Action Authorized! Maintenance Ticket #TCK-2026-881 logged and gripper replacement kit reserved in Bay 4 Stockroom. 8-step repair workflow updated.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, botMsg]);
    soundEngine.speak("Action authorized. Maintenance ticket created and repair steps unlocked.");
  };

  // Handle Safety Gate Rejection
  const handleRejectSafetyGate = (gateId: string, reason: string) => {
    soundEngine.playAlert();
    setSafetyGate(prev => prev ? { ...prev, status: 'REJECTED', rejectionReason: reason } : null);
    addToast('Action Override', `Requisition cancelled: ${reason}`, 'warning');
  };

  // Toggle Tried Action Checkbox
  const handleToggleTriedAction = (id: string) => {
    setTriedActions(prev => prev.map(t => {
      if (t.id === id) {
        const nextOutcome = t.outcome.includes('Passed') ? 'Pending Verification' : 'Passed';
        return { ...t, outcome: nextOutcome };
      }
      return t;
    }));
    addToast('Checklist Updated', 'Updated "What We Already Tried" log.', 'info');
  };

  // Handle Reserve Part Action
  const handleReservePart = (partNumber: string) => {
    setInventory(prev => prev.map(p => {
      if (p.partNumber === partNumber && p.inStock > 0) {
        return { ...p, inStock: p.inStock - 1, reserved: p.reserved + 1 };
      }
      return p;
    }));
    addToast('Component Reserved', `Reserved 1 unit of Part #${partNumber} in Bay stockroom.`, 'success');
  };

  // Handle Manual Create Ticket
  const handleCreateTicket = (draft: Partial<MaintenanceTicket>) => {
    const newTck = ticketService.createTicket(draft);
    setTickets(prev => [newTck, ...prev]);
    addToast('Ticket Created', `Maintenance Ticket #${newTck.id} logged in CMMS.`, 'success');
  };

  // Reset Session
  const handleResetSession = () => {
    soundEngine.playMicOn();
    setWorkflowSteps(INITIAL_8_STEP_REPAIR_WORKFLOW);
    setHypotheses(INITIAL_PACKAGING_HYPOTHESES);
    setMemoryItems([
      {
        id: 'mem-new',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        iconType: 'telemetry',
        label: 'New Session Initialized',
        detail: 'Session context reset for Line 3 Packaging Defect Inspection.',
        status: 'info'
      }
    ]);
    addToast('Session Reset', 'Context cleared for fresh repair session.', 'info');
  };

  // Guided Demo Orchestrator
  const handleStartDemo = () => {
    setIsDemoRunning(true);
    setActiveTab('live-repair');
    setDemoStep(1);
    soundEngine.playMicOn();
    handleExecuteDemoStep(1);
  };

  const handleExecuteDemoStep = (stepNumber: number) => {
    setDemoStep(stepNumber);

    switch (stepNumber) {
      case 1:
        setActiveTab('live-repair');
        addToast('DEMO 01: Packaging Image Analyzed', 'Crushed carton defect identified on conveyor.', 'info');
        soundEngine.speak("Starting visual inspection on Line 3 packaging conveyor.");
        break;

      case 2:
        setActiveTab('live-repair');
        soundEngine.playMicOn();
        setVoiceState('LISTENING');
        addToast('DEMO 02: Voice Query', 'Technician speaking into microphone...', 'info');
        setTimeout(() => {
          handleSendMessage("Explain the visible carton damage on the conveyor");
        }, 1000);
        break;

      case 3:
        handleTriggerScan();
        addToast('DEMO 03: Vision Scan', 'Crushed carton localized & red stack light noted.', 'warning');
        break;

      case 4:
        addToast('DEMO 04: Grounded Inferences', 'Formulated 5 distinct root-cause hypotheses without hallucinating alarm codes.', 'success');
        break;

      case 5:
        setActiveTab('knowledge');
        addToast('DEMO 05: SOP Evidence', 'Packaging SOP Section 6.2 & LOTO Section 2.1 loaded.', 'info');
        soundEngine.speak("Loaded Packaging SOP Section 6.2 and Lockout Tagout procedures.");
        break;

      case 6:
        setActiveTab('live-repair');
        break;

      case 7:
        // Complete Step 1 (Safety) and Step 2 (Containment)
        setWorkflowSteps(prev => prev.map(s => (s.id === 1 || s.id === 2) ? { ...s, isCompleted: true, completedAt: new Date().toLocaleTimeString() } : s));
        addToast('DEMO 07: Safety & Containment Done', 'Step 1 (LOTO) & Step 2 (Quarantine) verified.', 'success');
        break;

      case 8:
        // Complete Step 3 (Mechanical) & Step 4 (Packaging Spec)
        setWorkflowSteps(prev => prev.map(s => (s.id === 3 || s.id === 4 || s.id === 5) ? { ...s, isCompleted: true, completedAt: new Date().toLocaleTimeString() } : s));
        addToast('DEMO 08: Mechanical & Alarm Checked', 'Gripper inspected & PLC alarm verified on HMI.', 'info');
        break;

      case 9:
        setIsSafetyModalOpen(true);
        soundEngine.playAlert();
        addToast('DEMO 09: Authorization Gate', 'Human sign-off required for controlled test run.', 'approval');
        soundEngine.speak("Safety gate engaged. Human approval is required for controlled test run.");
        break;

      case 10:
        if (safetyGate) {
          handleApproveSafetyGate(safetyGate.id);
          setIsSafetyModalOpen(false);
          setWorkflowSteps(prev => prev.map(s => (s.id === 6 || s.id === 7) ? { ...s, isCompleted: true, completedAt: new Date().toLocaleTimeString() } : s));
          addToast('DEMO 10: Controlled Test Run Passed', '5 sample cartons processed with 0 defects.', 'success');
        }
        break;

      case 11:
        handleSignoffWorkflow('Authorized by Senior Operator Alex Rivera. All 5 test cartons passed QA inspection.');
        setActiveTab('session-memory');
        addToast('DEMO COMPLETE: Case Resolved', 'Verification complete and signed off.', 'success');
        soundEngine.speak("Controlled test run successful. Case resolved and signed off. Demo complete.");
        break;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#050816] text-slate-100 overflow-hidden font-sans select-none">
      {/* Global Toast Notification System */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Top Main Navigation Bar */}
      <Header
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        onStartDemo={handleStartDemo}
        isDemoRunning={isDemoRunning}
        onOpenStory={() => setIsCinematicStoryOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        speechEnabled={speechEnabled}
        onToggleSpeech={handleToggleSpeech}
        activeEquipmentName="Line 3 Packaging Cell"
        activeErrorCode="ACTIVE (VERIFY HMI)"
        pendingApprovalsCount={safetyGate && safetyGate.status === 'PENDING_APPROVAL' ? 1 : 0}
        onSelectScenario={handleSelectScenario}
        currentScenario={currentScenario}
        currentLanguage={currentLanguage}
        onSelectLanguage={handleSelectLanguage}
        voiceState={voiceState}
      />

      {/* Main Container: Sidebar + View Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            soundEngine.playMicOn();
          }}
          currentRole={currentRole}
          pendingApprovalsCount={safetyGate && safetyGate.status === 'PENDING_APPROVAL' ? 1 : 0}
          openTicketsCount={tickets.filter(t => t.status === 'OPEN' || t.status === 'REQUIRES_APPROVAL' || t.status === 'IN_PROGRESS').length}
          activeEquipmentName="Line 3 Packaging Unit"
          currentLanguage={currentLanguage}
        />

        {/* Center Viewport */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#050816] overflow-hidden relative">
          {activeTab === 'live-repair' && (() => {
            const activeScenarioConfig = getScenarioConfig(currentScenario);
            return (
              <LiveRepairView
                equipment={activeEquipment}
                messages={messages}
                voiceState={voiceState}
                planSteps={planSteps}
                decisionSummary={decisionSummary}
                safetyGate={safetyGate}
                workflowSteps={workflowSteps}
                hypotheses={hypotheses}
                onToggleWorkflowStep={handleToggleWorkflowStep}
                onUpdateStepNotes={handleUpdateStepNotes}
                onUpdateHypothesisStatus={handleUpdateHypothesisStatus}
                onAttachEvidence={handleAttachEvidence}
                onSignoffWorkflow={handleSignoffWorkflow}
                onReopenWorkflow={handleReopenWorkflow}
                onSendMessage={handleSendMessage}
                onSelectManualCitation={(cite) => {
                  setSelectedCitation(cite);
                  setActiveTab('knowledge');
                }}
                onOpenSafetyModal={() => setIsSafetyModalOpen(true)}
                onOpenKnowledge={() => setActiveTab('knowledge')}
                onDetectFault={(code) => {
                  handleSendMessage(`I detected defect ${code} on the equipment. What is the grounded troubleshooting workflow?`);
                }}
                isScanning={isScanning}
                onTriggerScan={handleTriggerScan}
                isProcessing={isProcessing}
                currentLanguage={currentLanguage}
                scenarioId={currentScenario}
                faultTitle={activeScenarioConfig.faultTitle}
                defectCategory={activeScenarioConfig.defectCategory}
                severity={activeScenarioConfig.severity}
                confidenceLabel={activeScenarioConfig.confidenceLabel}
                observedEvidence={activeScenarioConfig.observedEvidence}
                aiInferences={activeScenarioConfig.aiInferences}
                verifiedTelemetryStatus={activeScenarioConfig.verifiedTelemetryStatus}
                recommendedAction={activeScenarioConfig.recommendedAction}
                boundingBoxes={activeScenarioConfig.boundingBoxes}
                onSelectScenario={handleSelectScenario}
              />
            );
          })()}

          {activeTab === 'knowledge' && (
            <KnowledgeView
              selectedCitation={selectedCitation}
              onSelectCitation={setSelectedCitation}
            />
          )}

          {activeTab === 'agent-actions' && (
            <AgentActionsView
              onOpenSafetyModal={() => setIsSafetyModalOpen(true)}
            />
          )}

          {activeTab === 'session-memory' && (
            <SessionMemoryView
              memoryItems={memoryItems}
              triedActions={triedActions}
              onToggleTriedAction={handleToggleTriedAction}
              onResetSession={handleResetSession}
            />
          )}

          {activeTab === 'equipment' && (
            <EquipmentView
              currentEquipment={activeEquipment}
              onSelectEquipment={(eq) => {
                setActiveEquipment(eq);
                soundEngine.playMicOn();
              }}
            />
          )}

          {activeTab === 'supervisor' && (
            <SupervisorView
              safetyGate={safetyGate}
              onApproveSafetyGate={handleApproveSafetyGate}
              onRejectSafetyGate={handleRejectSafetyGate}
              onOpenLiveRepair={() => setActiveTab('live-repair')}
            />
          )}

          {activeTab === 'tickets' && (
            <TicketsView
              tickets={tickets}
              inventory={inventory}
              onReservePart={handleReservePart}
              onCreateTicket={handleCreateTicket}
            />
          )}

          {activeTab === 'story' && (
            <StoryView
              onLaunchLiveRepair={() => setActiveTab('live-repair')}
              onOpenCinematicStory={() => setIsCinematicStoryOpen(true)}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView />
          )}
        </main>
      </div>

      {/* Human-in-the-Loop Safety Gate Modal */}
      {safetyGate && (
        <SafetyGateModal
          isOpen={isSafetyModalOpen}
          onClose={() => setIsSafetyModalOpen(false)}
          safetyGate={safetyGate}
          onApprove={handleApproveSafetyGate}
          onReject={handleRejectSafetyGate}
        />
      )}

      {/* Guided Hackathon Demo Tour Overlay Controller */}
      <DemoTour
        isRunning={isDemoRunning}
        onStopDemo={() => setIsDemoRunning(false)}
        onExecuteDemoStep={handleExecuteDemoStep}
        currentStep={demoStep}
      />

      {/* Cinematic Product Story Overlay Experience */}
      <CinematicStory
        isOpen={isCinematicStoryOpen}
        onClose={() => setIsCinematicStoryOpen(false)}
        currentLanguage={currentLanguage}
        onLanguageChange={handleSelectLanguage}
        onEnterLiveRepair={() => {
          setIsCinematicStoryOpen(false);
          setActiveTab('live-repair');
          addToast('Entered Live Repair', 'Multimodal copilot ready for live voice & vision interactions.', 'info');
        }}
      />

      {/* Cinematic Boot Sequence (Startup) */}
      {showBootSequence && (
        <BootSequence
          onComplete={() => {
            setShowBootSequence(false);
            sessionStorage.setItem('voxlens_booted', 'true');
          }}
        />
      )}
    </div>
  );
}

export default App;

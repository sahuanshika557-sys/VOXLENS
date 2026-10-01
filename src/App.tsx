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
  InventoryItem
} from './types';

import { 
  DEMO_EQUIPMENT, 
  INITIAL_CITATIONS, 
  INITIAL_TICKETS, 
  INITIAL_SAFETY_GATE,
  INVENTORY_PARTS 
} from './data/mockData';

import { soundEngine } from './utils/soundEngine';
import { visionService, knowledgeService, inventoryService, ticketService } from './services';

export function App() {
  // Multilingual & Boot State
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const [showBootSequence, setShowBootSequence] = useState<boolean>(() => !sessionStorage.getItem('voxlens_booted'));

  // Navigation & Role State
  const [activeTab, setActiveTab] = useState<NavigationTab>('live-repair');
  const [currentRole, setCurrentRole] = useState<UserRole>('technician');
  const [currentScenario, setCurrentScenario] = useState<string>('e17-cooling');

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
  const [selectedCitation, setSelectedCitation] = useState<ManualCitation | null>(INITIAL_CITATIONS[0]);

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
      label: 'Error E17 Detected',
      detail: 'Optical CV OCR detected 7-segment display reading E17 with 96% visual confidence.',
      status: 'warning'
    },
    {
      id: 'mem-2',
      time: '10:32',
      iconType: 'scan',
      label: 'Equipment Identified',
      detail: 'Model VX-420 Packaging Unit (S/N DEMO-420-0192) recognized in Assembly Sector 4.',
      status: 'info'
    },
    {
      id: 'mem-3',
      time: '10:33',
      iconType: 'knowledge',
      label: 'OEM Manual Retrieved',
      detail: 'Rev 4.2B, Section 4.3 (Page 42) retrieved via semantic dense vector index.',
      status: 'success'
    }
  ]);

  // What We Already Tried Checklist
  const [triedActions, setTriedActions] = useState<TriedAction[]>([
    {
      id: 'try-1',
      step: 'Air Intake Shroud Inspection',
      timeChecked: '10:33',
      outcome: 'Failed - Anomaly Found',
      notes: 'Intake flow constrained at 1.2 L/min (Nominal >= 4.5 L/min). Particulate drag observed.'
    },
    {
      id: 'try-2',
      step: 'PT100 RTD Sensor Resistance',
      timeChecked: '10:34',
      outcome: 'Passed',
      notes: '133.5Ω measured across leads. Sensor calibration within ±0.2% tolerance.'
    }
  ]);

  // Agent Plan Steps Pipeline
  const [planSteps, setPlanSteps] = useState<AgentPlanStep[]>([
    {
      id: 1,
      title: 'Identify Equipment',
      description: 'Optical nameplate OCR & SCADA bus matching',
      status: 'COMPLETED',
      requiresApproval: false,
      resultSummary: 'Verified: VX-420 Packaging Unit (Line 3)'
    },
    {
      id: 2,
      title: 'Read Error Code',
      description: 'Computer vision 7-segment OCR',
      status: 'COMPLETED',
      requiresApproval: false,
      resultSummary: 'Detected: E17 (96% Confidence)'
    },
    {
      id: 3,
      title: 'Retrieve Manual Evidence',
      description: 'Dense vector search on OEM service manuals',
      status: 'COMPLETED',
      requiresApproval: false,
      resultSummary: 'Section 4.3 (Page 42) Loaded'
    },
    {
      id: 4,
      title: 'Recommend Diagnostic Step',
      description: 'Guide technician through cooling path inspection',
      status: 'IN_PROGRESS',
      requiresApproval: false
    },
    {
      id: 5,
      title: 'Create Maintenance Ticket',
      description: 'Draft CMMS high-priority work order',
      status: 'LOCKED_APPROVAL',
      requiresApproval: true
    },
    {
      id: 6,
      title: 'Request Replacement Part',
      description: 'Requisition Part #VX-CF42 ($245.00) from Bay 4',
      status: 'LOCKED_APPROVAL',
      requiresApproval: true
    }
  ]);

  // AI Decision Summary
  const [decisionSummary, setDecisionSummary] = useState<AIDecisionSummary>({
    observed: [
      'Error code E17 detected on 7-segment display (96% certainty)',
      'Equipment identified: VX-420 Packaging Unit (Line 3)',
      'Motor stator telemetry abnormal: 88.4°C (Safe limit: 75.0°C)',
      'Cooling airflow restricted: 1.2 L/min (Req: 3.8+ L/min)'
    ],
    knowledgeUsed: [
      'VX-420 Service Manual Rev 4.2B',
      'Section 4.3: Motor & Cooling Diagnostics (Page 42)',
      'Section 7.1: LOTO Isolation Procedures'
    ],
    recommendation: 'Inspect axial cooling fan shroud for particulate binding and verify Terminal Block TB-2 connections. If impeller drag persists, replace fan assembly with Part #VX-CF42.',
    confidence: 'High',
    confidenceScore: 94,
    nextAction: 'Guide technician through cooling-path inspection & authorize replacement fan.',
    safetyRequirement: 'Lockout/Tagout (LOTO SW-1) required before casing disassembly.'
  });

  // Copilot Messages Stream
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'msg-init',
      sender: 'voxlens',
      text: "Hello Alex. I am connected to the Line 3 VX-420 Packaging Unit (#VX-2048). I am monitoring live optical feeds, telemetry sensors, and technical service manuals.\n\nYou can speak naturally or point your camera at any component or error display.",
      timestamp: '10:30:12',
      citations: [INITIAL_CITATIONS[0]],
      suggestedPrompts: [
        'What does error E17 mean?',
        'What should I check first?',
        'Create a maintenance ticket'
      ]
    }
  ]);

  // Handle Language Switch across the entire application
  const handleSelectLanguage = (newLang: LanguageCode) => {
    setCurrentLanguage(newLang);
    const t = getTranslation(newLang);
    const langMeta = SUPPORTED_LANGUAGES.find(l => l.code === newLang);

    // Update greeting / diagnostic message immediately to the chosen language
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const localizedInitMsg: CopilotMessage = {
      id: `msg-lang-${Date.now()}`,
      sender: 'voxlens',
      text: t.copilot?.e17Diagnosis || t.copilot?.greeting,
      timestamp: timeStr,
      citations: [INITIAL_CITATIONS[0]],
      suggestedPrompts: t.copilot?.quickPrompts?.map(qp => qp.label) || [
        'What does error E17 mean?',
        'What should I check first?',
        'Create a maintenance ticket'
      ]
    };
    setMessages([localizedInitMsg]);

    // Update Decision Summary Recommendation in active language
    setDecisionSummary(prev => ({
      ...prev,
      recommendation: `${t.copilot?.recStep1 || ''} ${t.copilot?.recStep2 || ''}`
    }));

    addToast(`Language: ${langMeta?.nativeLabel || newLang.toUpperCase()}`, t.copilot?.greeting.split('\n')[0], 'info');

    // Speak brief localized greeting
    soundEngine.speak(
      t.copilot?.greeting.split('\n')[0] || 'Language updated.',
      langMeta?.speechLocale || 'en-US'
    );
  };

  // Handle Scenario Switch
  const handleSelectScenario = (scenarioId: string) => {
    setCurrentScenario(scenarioId);
    soundEngine.playMicOn();

    if (scenarioId === 'low-confidence') {
      const msg: CopilotMessage = {
        id: `scen-${Date.now()}`,
        sender: 'voxlens',
        text: "⚠ Low Visual Confidence (62%): The camera angle is partially obstructed by the secondary conveyor guard. Please adjust your camera angle or confirm the 7-segment LED reading manually.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, msg]);
      addToast('Low Visual Confidence', 'Conveyor guard is partially obscuring LED display.', 'warning');
      soundEngine.speak("Low visual confidence. Please adjust camera angle.");
    } else if (scenarioId === 'camera-blocked') {
      const msg: CopilotMessage = {
        id: `scen-${Date.now()}`,
        sender: 'voxlens',
        text: "⚠ Optical Feed Obscured: Lens flare / particulate contamination detected on sensor. Reverting to telemetry and voice assistant mode.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, msg]);
      addToast('Camera Obscured', 'Operating on SCADA telemetry and voice assistant.', 'warning');
      soundEngine.speak("Optical sensor obscured. Operating on telemetry.");
    } else if (scenarioId === 'manual-missing') {
      const msg: CopilotMessage = {
        id: `scen-${Date.now()}`,
        sender: 'voxlens',
        text: "ℹ OEM Manual Notice: No specific Rev 4.2 section found for auxiliary sub-assembly. Falling back to generalized industrial motor standards (IEC 60034-1). Recommend supervisor sign-off.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, msg]);
      addToast('Fallback Standards', 'Loaded IEC 60034-1 motor standards.', 'info');
    } else if (scenarioId === 'zero-inventory') {
      const msg: CopilotMessage = {
        id: `scen-${Date.now()}`,
        sender: 'voxlens',
        text: "⚠ Inventory Zero-Stock Alert: Part #VX-CF42 is out of stock in Bay 4. Lead time from Dallas Regional Vault is 2 business days. Expedited courier dispatch proposed.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, msg]);
      addToast('Inventory Zero Stock', 'Part #VX-CF42 unavailable in Bay 4 stockroom.', 'warning');
      soundEngine.speak("Replacement fan out of stock in Bay 4. Expedited courier required.");
    } else if (scenarioId === 'network-degraded') {
      const msg: CopilotMessage = {
        id: `scen-${Date.now()}`,
        sender: 'voxlens',
        text: "⚡ Offline Edge Mode Active: 5G signal degraded. Operating on cached local on-device SLM weights and local vector store. Full repair capabilities retained.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, msg]);
      addToast('Offline Edge Mode Active', 'Operating on local cached SLM weights.', 'info');
    } else {
      const msg: CopilotMessage = {
        id: `scen-${Date.now()}`,
        sender: 'voxlens',
        text: "✓ Connected to primary Line 3 packaging line. Ready for E17 fault diagnosis.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, msg]);
      addToast('Connected to Line 3', 'Ready for E17 fault diagnosis.', 'success');
    }
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

  // Trigger CV Scan
  const handleTriggerScan = () => {
    setIsScanning(true);
    soundEngine.playScanPing();
    const t = getTranslation(currentLanguage);
    const langMeta = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage);

    addToast(t.liveRepair?.visionTitle || 'Scanning Equipment', 'Optical CV OCR & thermal sensor analyzing frame...', 'info');

    setTimeout(() => {
      setIsScanning(false);
      soundEngine.playScanPing();
      addToast('Equipment Identified', 'VX-420 Unit identified · Error E17 (96% Confidence)', 'success');

      // Add localized scan diagnosis
      const botMsg: CopilotMessage = {
        id: `scan-msg-${Date.now()}`,
        sender: 'voxlens',
        text: t.copilot?.responseScanDetected || "Optical CV scan verified: Error Code E17 (96% confidence) and Stator Thermal Hotspot at 88.4°C.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: INITIAL_CITATIONS
      };
      setMessages(prev => [...prev, botMsg]);

      soundEngine.speak(
        (t.copilot?.responseScanDetected || "Optical scan complete.").slice(0, 200),
        langMeta?.speechLocale || 'en-US'
      );
    }, 1200);
  };

  // Dispatch AI Copilot Response (Multilingual Aware)
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

    // Simulate Agentic Multimodal Reasoning & RAG retrieval
    setTimeout(() => {
      const lower = userText.toLowerCase();
      let replyText = "";
      let citations = INITIAL_CITATIONS;
      let toolCalls: any[] = [];
      let actionCard: any = undefined;

      if (lower.includes('ticket') || lower.includes('create ticket') || lower.includes('टिकट') || lower.includes('টিকিট') || lower.includes('டிக்கெட்') || lower.includes('టికెట్') || lower.includes('ٹکٹ')) {
        replyText = t.copilot?.responseCreateTicket || "I have prepared Work Order #TCK-2026-881 for Line 3. Human authorization is required for $245.00 part requisition.";
        toolCalls = [
          {
            id: 'tc-draft',
            toolName: 'draft_cmms_ticket',
            arguments: { equipmentId: 'eq-vx420', priority: 'High', errorCode: 'E17' },
            status: 'WAITING_APPROVAL',
            timestamp: timeStr
          }
        ];
        actionCard = {
          type: 'approval_request',
          payload: {
            title: `${t.safetyGate?.title || 'Authorize Part #VX-CF42 ($245.00)'} & Log Ticket #TCK-2026-881`
          }
        };
        soundEngine.playAlert();
        addToast(t.safetyGate?.title || 'Human Approval Required', t.safetyGate?.subtitle || 'Financial allocation requires technician sign-off.', 'approval');
      } else if (lower.includes('inventory') || lower.includes('part') || lower.includes('fan') || lower.includes('स्टॉक') || lower.includes('फैन') || lower.includes('ফ্যান') || lower.includes('ఫ్యాన్') || lower.includes('ஃபேன்')) {
        replyText = t.copilot?.responseCheckFan || "Inventory search complete: Bay 4 Stockroom has 3 units of Part #VX-CF42 ($245.00) in Bin C-14.";
        toolCalls = [
          {
            id: 'tc-inv',
            toolName: 'query_bay_inventory',
            arguments: { partNumber: 'VX-CF42', location: 'Bay 4' },
            status: 'COMPLETED',
            timestamp: timeStr
          }
        ];
        soundEngine.playSuccess();
        addToast(t.liveRepair?.knowledgeTitle || 'Inventory Queried', 'Part #VX-CF42: 3 units in Bay 4 Stockroom (Bin C-14).', 'success');
      } else if (lower.includes('first') || lower.includes('check first') || lower.includes('पहले') || lower.includes('முதலில்') || lower.includes('ಮೊದಲು') || lower.includes('پہلے')) {
        replyText = t.copilot?.responseCheckFirst || "Per Service Manual Section 4.3 (Page 42), first inspect the axial cooling fan shroud for particulate obstruction, then verify Terminal Block TB-2 connections.";
        soundEngine.playMicOn();
        addToast(t.copilot?.recTitle || 'Recommended Steps', 'Section 4.3 (Page 42)', 'info');
      } else if (lower.includes('mean') || lower.includes('मतलब') || lower.includes('అర్థం') || lower.includes('பொருள்') || lower.includes('معنی')) {
        replyText = t.copilot?.responseE17Mean || "Error E17 indicates a Motor Thermal Overload caused by constrained cooling airflow across the stator housing.";
        soundEngine.playMicOn();
      } else {
        // Standard E17 query / what should I check
        replyText = t.copilot?.e17Diagnosis || "I detected error E17 and identified the equipment as the Line 3 VX-420 motor-driven packaging unit.";
        toolCalls = [
          {
            id: 'tc-scan',
            toolName: 'search_technical_manual',
            arguments: { query: 'E17 Motor Thermal Overload', model: 'VX-420' },
            status: 'COMPLETED',
            timestamp: timeStr
          }
        ];
        soundEngine.playMicOn();
        addToast(t.liveRepair?.synthesisTitle || 'Multimodal Context Unified', 'Voice + Vision + Manual §4.3', 'success');
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

      // Speak response using Web Speech Synthesis in the exact locale!
      soundEngine.speak(
        replyText.slice(0, 240),
        langMeta?.speechLocale || 'en-US',
        () => setVoiceState('RESPONDING'),
        () => setVoiceState('IDLE')
      );
    }, 900);
  };

  // Handle Safety Gate Approval
  const handleApproveSafetyGate = (gateId: string) => {
    soundEngine.playSuccess();

    // 1. Update Safety Gate
    setSafetyGate(prev => prev ? { ...prev, status: 'APPROVED', decidedAt: new Date().toLocaleTimeString() } : null);

    // 2. Unlock plan steps 5 & 6
    setPlanSteps(prev => prev.map(s => {
      if (s.id === 4 || s.id === 5 || s.id === 6) {
        return {
          ...s,
          status: 'COMPLETED',
          resultSummary: s.id === 5 ? 'Ticket #TCK-2026-881 Dispatched' : 'Part #VX-CF42 Requisitioned ($245.00)'
        };
      }
      return s;
    }));

    // 3. Add to Session Memory
    const newMem: SessionMemoryItem = {
      id: `mem-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      iconType: 'approval',
      label: 'Ticket #TCK-2026-881 Approved & Dispatched',
      detail: 'Technician Alex Rivera signed off on Part #VX-CF42 ($245.00) requisition for Line 3 Bay B.',
      status: 'success'
    };
    setMemoryItems(prev => [...prev, newMem]);

    // 4. Update Tickets list
    setTickets(prev => prev.map(t => {
      if (t.id === 'TCK-2026-881') {
        return {
          ...t,
          status: 'IN_PROGRESS',
          supervisorApproved: true
        };
      }
      return t;
    }));

    // 5. Reserve part in inventory
    setInventory(prev => prev.map(p => {
      if (p.partNumber === 'VX-CF42' && p.inStock > 0) {
        return {
          ...p,
          inStock: p.inStock - 1,
          reserved: p.reserved + 1
        };
      }
      return p;
    }));

    addToast('Action Authorized', 'Maintenance ticket #TCK-2026-881 dispatched and Part #VX-CF42 reserved in Bay 4.', 'success');

    // 6. Add Bot confirmation message
    const botMsg: CopilotMessage = {
      id: `bot-approved-${Date.now()}`,
      sender: 'voxlens',
      text: "✓ Action Authorized! Maintenance Ticket #TCK-2026-881 has been created in SAP PM and Part #VX-CF42 (Axial Fan) is reserved in Bay 4 Stockroom (Bin C-14). Session memory has been updated.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      toolCalls: [
        {
          id: 'tc-auth',
          toolName: 'commit_ticket_and_part_order',
          arguments: { ticketId: 'TCK-2026-881', part: 'VX-CF42', amount: 245.00 },
          status: 'COMPLETED',
          timestamp: new Date().toLocaleTimeString()
        }
      ]
    };
    setMessages(prev => [...prev, botMsg]);

    soundEngine.speak("Action authorized. Maintenance ticket created and replacement part reserved.");
  };

  // Handle Safety Gate Rejection
  const handleRejectSafetyGate = (gateId: string, reason: string) => {
    soundEngine.playAlert();
    setSafetyGate(prev => prev ? { ...prev, status: 'REJECTED', rejectionReason: reason } : null);
    addToast('Action Override', `Requisition cancelled: ${reason}`, 'warning');

    const botMsg: CopilotMessage = {
      id: `bot-rej-${Date.now()}`,
      sender: 'voxlens',
      text: `Action rejected: "${reason}". The ticket and part requisition have been cancelled. I will update session memory and adjust recommendations.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, botMsg]);
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
    setMemoryItems([
      {
        id: 'mem-new',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        iconType: 'telemetry',
        label: 'New Session Initialized',
        detail: 'Session context reset for Line 3 VX-420 Packaging Unit.',
        status: 'info'
      }
    ]);
    addToast('Session Reset', 'Context cleared for fresh repair session.', 'info');
  };

  // Guided Demo Orchestrator (11-Step Multimodal Story Script)
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
        setActiveEquipment(DEMO_EQUIPMENT[0]);
        addToast('DEMO 01: Connected', 'Line 3 VX-420 Packaging Unit identified.', 'info');
        soundEngine.speak("Starting live repair session on Line 3 packaging unit, model VX 420.");
        break;

      case 2:
        setActiveTab('live-repair');
        soundEngine.playMicOn();
        setVoiceState('LISTENING');
        addToast('DEMO 02: Voice Query', 'Technician speaking into microphone...', 'info');
        setTimeout(() => {
          handleSendMessage("VoxLens, the machine is showing error E17. What should I check first?");
        }, 1200);
        break;

      case 3:
        handleTriggerScan();
        addToast('DEMO 03: Vision Scan', 'E17 (96%) and 88.4°C thermal anomaly detected.', 'warning');
        break;

      case 4:
        addToast('DEMO 04: Multimodal Synthesis', 'Unified Voice + Vision + Knowledge into recommendation.', 'success');
        break;

      case 5:
        setActiveTab('knowledge');
        addToast('DEMO 05: RAG Search', 'Dense vector search matched Section 4.3 (Page 42) at 96% relevance.', 'info');
        soundEngine.speak("Dense RAG retrieval matched service manual Section 4.3 on page 42 with 96% relevance.");
        break;

      case 6:
        setActiveTab('live-repair');
        break;

      case 7:
        setVoiceState('LISTENING');
        addToast('DEMO 07: Action Request', 'Technician requests ticket preparation & fan check.', 'info');
        setTimeout(() => {
          handleSendMessage("Create a maintenance ticket and check replacement fan availability in Bay 4.");
        }, 1000);
        break;

      case 8:
        // Agent prepares ticket & triggers safety gate
        setPlanSteps(prev => prev.map(s => s.id === 5 || s.id === 6 ? { ...s, status: 'LOCKED_APPROVAL' } : s));
        addToast('DEMO 08: Agent Tools', 'Inventory checked (3 fans in Bay 4) and ticket drafted.', 'info');
        break;

      case 9:
        setIsSafetyModalOpen(true);
        soundEngine.playAlert();
        addToast('DEMO 09: Safety Gate', 'Human approval required for financial commitment of $245.00.', 'approval');
        soundEngine.speak("Safety gate engaged. Human approval is required for part requisition of $245.");
        break;

      case 10:
        if (safetyGate) {
          handleApproveSafetyGate(safetyGate.id);
          setIsSafetyModalOpen(false);
          addToast('DEMO 10: Authorized', 'Ticket #TCK-2026-881 created and Part #VX-CF42 reserved.', 'success');
        }
        break;

      case 11:
        setActiveTab('session-memory');
        addToast('DEMO COMPLETE', 'Repair context synchronized to persistent session memory.', 'success');
        soundEngine.speak("Repair context synchronized and saved to session memory. Demo complete.");
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
        activeEquipmentName={activeEquipment.name}
        activeErrorCode={activeEquipment.activeErrorCode}
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
          activeEquipmentName={activeEquipment.model}
          currentLanguage={currentLanguage}
        />

        {/* Center Viewport */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#050816] overflow-hidden relative">
          {activeTab === 'live-repair' && (
            <LiveRepairView
              equipment={activeEquipment}
              messages={messages}
              voiceState={voiceState}
              planSteps={planSteps}
              decisionSummary={decisionSummary}
              safetyGate={safetyGate}
              onSendMessage={handleSendMessage}
              onSelectManualCitation={(cite) => {
                setSelectedCitation(cite);
                setActiveTab('knowledge');
              }}
              onOpenSafetyModal={() => setIsSafetyModalOpen(true)}
              onOpenKnowledge={() => setActiveTab('knowledge')}
              onDetectFault={(code) => {
                handleSendMessage(`I detected error code ${code} on the equipment. What is the diagnosis?`);
              }}
              isScanning={isScanning}
              onTriggerScan={handleTriggerScan}
              isProcessing={isProcessing}
              currentLanguage={currentLanguage}
            />
          )}

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

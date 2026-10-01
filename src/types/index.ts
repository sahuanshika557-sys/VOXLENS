export type NavigationTab = 
  | 'live-repair' 
  | 'equipment' 
  | 'knowledge' 
  | 'agent-actions' 
  | 'session-memory' 
  | 'tickets' 
  | 'supervisor' 
  | 'story'
  | 'analytics';

export type UserRole = 'technician' | 'supervisor';

export type VoiceState = 'IDLE' | 'LISTENING' | 'PROCESSING' | 'RESPONDING';

export type ActionStatus = 'AVAILABLE' | 'RUNNING' | 'COMPLETED' | 'REQUIRES_APPROVAL' | 'BLOCKED' | 'REJECTED';

export type AlertSeverity = 'critical' | 'warning' | 'info' | 'normal';

export interface BoundingBox {
  id: string;
  label: string;
  type: 'defect' | 'warning_zone' | 'component' | 'intact_item' | 'error_code' | 'nameplate' | 'gauge';
  confidence?: number;
  confidenceLabel?: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number;
  height: number;
  detail: string;
  severity?: AlertSeverity;
  isObservedEvidence?: boolean;
}

export interface EquipmentTelemetry {
  motorTempC: number;
  bearingVibrationMmS: number;
  coolingFlowLMin: number;
  operatingRpm: number;
  busVoltageV: number;
  currentDrawA: number;
  ambientTempC: number;
  pressureKPa: number;
  isSimulatedTelemetry?: boolean;
}

export interface MaintenanceRecord {
  id: string;
  date: string;
  technician: string;
  type: 'Preventative' | 'Corrective' | 'Inspection' | 'Emergency';
  summary: string;
  partsReplaced: string[];
  durationMinutes: number;
  status: 'Resolved' | 'Escalated' | 'Pending Verification';
}

export interface Equipment {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  category: string;
  location: string;
  line: string;
  status: 'Operational' | 'Attention Required' | 'Warning' | 'Critical Failure' | 'Maintenance Lock';
  activeAlert: string | null;
  activeErrorCode: string | null;
  lastServiceDate: string;
  nextScheduledService: string;
  operatingHours: number;
  healthScore: number;
  imageThumbnail: string;
  telemetry: EquipmentTelemetry;
  history: MaintenanceRecord[];
  specifications: Record<string, string>;
}

export interface ManualCitation {
  manualId: string;
  manualTitle: string;
  section: string;
  page: number;
  relevanceScore: number;
  excerpt: string;
  recommendationSnippet: string;
  schematicUrl?: string;
}

export interface AIDecisionSummary {
  observed: string[];
  knowledgeUsed: string[];
  recommendation: string;
  confidence: 'High' | 'Medium' | 'Low' | 'Requires Verification' | 'Visual Assessment';
  confidenceScore?: number; // 0-100 or null if visual only
  confidenceStatusLabel?: string;
  nextAction: string;
  safetyRequirement: string | null;
}

export interface ToolCallExecution {
  id: string;
  toolName: string;
  arguments: Record<string, any>;
  result?: Record<string, any>;
  status: 'PENDING' | 'EXECUTING' | 'COMPLETED' | 'FAILED' | 'WAITING_APPROVAL';
  timestamp: string;
}

export interface CopilotMessage {
  id: string;
  sender: 'technician' | 'voxlens' | 'system';
  text: string;
  timestamp: string;
  audioUrl?: string;
  detectedIntent?: string;
  decisionSummary?: AIDecisionSummary;
  citations?: ManualCitation[];
  toolCalls?: ToolCallExecution[];
  suggestedPrompts?: string[];
  actionCard?: {
    type: 'approval_request' | 'ticket_created' | 'inventory_checked' | 'diagnostic_checklist' | 'defect_report';
    payload: any;
  };
}

export interface AgentPlanStep {
  id: number;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'LOCKED_APPROVAL' | 'FAILED';
  requiresApproval: boolean;
  toolTarget?: string;
  estimatedTime?: string;
  resultSummary?: string;
}

export interface InventoryItem {
  partNumber: string;
  name: string;
  category: string;
  inStock: number;
  reserved: number;
  unitCost: number;
  leadTimeDays: number;
  warehouseLocation: string;
  compatibleModels: string[];
  status: 'IN_STOCK' | 'LOW_STOCK' | 'BACKORDER' | 'CRITICAL';
}

export interface MaintenanceTicket {
  id: string;
  title: string;
  equipmentId: string;
  equipmentModel: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  errorCode: string;
  reportedBy: string;
  createdAt: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'WAITING_PARTS' | 'RESOLVED' | 'REQUIRES_APPROVAL';
  suspectedRootCause: string;
  diagnosticStepsTaken: string[];
  recommendedActions: string[];
  estimatedDowntimeHours: number;
  partsRequired: {
    partNumber: string;
    name: string;
    quantity: number;
    estimatedCost: number;
  }[];
  supervisorApproved: boolean;
  supervisorName?: string;
}

export interface SafetyGateRequest {
  id: string;
  actionType: 'ORDER_PART' | 'CREATE_TICKET' | 'SHUTDOWN_UNIT' | 'ESCALATE_SUPERVISOR' | 'DISPATCH_CREW' | 'LOTO_LOCKOUT';
  title: string;
  description: string;
  equipmentModel: string;
  equipmentSerial: string;
  financialImpactUsd: number;
  operationalRisk: 'Low' | 'Medium' | 'High' | 'Critical';
  aiConfidence: number | string;
  justification: string;
  evidenceSource: string;
  ticketDraft?: Partial<MaintenanceTicket>;
  partRequestDraft?: {
    partNumber: string;
    name: string;
    qty: number;
    cost: number;
  };
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
  requestedAt: string;
  decidedAt?: string;
  decidedBy?: string;
  rejectionReason?: string;
}

export interface SessionMemoryItem {
  id: string;
  time: string;
  iconType: 'scan' | 'voice' | 'knowledge' | 'action' | 'approval' | 'ticket' | 'telemetry' | 'safety';
  label: string;
  detail: string;
  status: 'success' | 'warning' | 'info' | 'pending';
}

export interface TriedAction {
  id: string;
  step: string;
  timeChecked: string;
  outcome: 'Passed' | 'Failed - Anomaly Found' | 'Inconclusive' | 'Pending Verification';
  notes: string;
}

export interface SupervisorMachineStatus {
  id: string;
  machineName: string;
  model: string;
  status: 'AI Assisting' | 'Approval Required' | 'Repair Completed' | 'Critical Alert' | 'Offline';
  confidence: number;
  activeTechnician: string;
  sessionDuration: string;
  currentStep: string;
  alertsCount: number;
  pendingApprovals: number;
}

// -------------------------------------------------------------
// PHASE 3 & PHASE 6: STRUCTURED DIAGNOSTIC & WORKFLOW SCHEMA
// -------------------------------------------------------------

export interface RootCauseHypothesis {
  id: string;
  title: string;
  category: 'ROBOTIC' | 'MECHANICAL' | 'MATERIAL' | 'OPERATIONAL';
  description: string;
  likelihood: 'High' | 'Medium' | 'Low';
  verificationMethod: string;
  status: 'UNVERIFIED' | 'INVESTIGATING' | 'CONFIRMED' | 'RULED_OUT';
  findings?: string;
}

export interface RepairWorkflowStep {
  id: number;
  stepNumber: number;
  phase: 'SAFETY' | 'CONTAINMENT' | 'MECHANICAL' | 'PACKAGING' | 'ALARM' | 'CORRECTIVE' | 'VERIFICATION' | 'RESOLUTION';
  title: string;
  shortLabel: string;
  instructions: string;
  safetyWarning?: string;
  isCompleted: boolean;
  completedAt?: string;
  completedBy?: string;
  technicianNotes: string;
  evidenceAttachment?: string | null;
  evidenceUrls?: string[];
  requiresSupervisorSignoff?: boolean;
}

export interface DiagnosticResponseSchema {
  caseId: string;
  imageId: string;
  timestamp: string;
  detectedObjects: {
    name: string;
    description: string;
    location: string;
    isDamaged: boolean;
  }[];
  observedDefects: {
    name: string;
    category: 'PACKAGING_INTEGRITY' | 'MECHANICAL_JAM' | 'ELECTRICAL' | 'THERMAL' | 'UNKNOWN';
    severity: 'HIGH' | 'MEDIUM' | 'LOW';
    visualDescription: string;
    evidenceLocation: string;
  }[];
  visualEvidence: {
    id: string;
    description: string;
    boundingBox?: BoundingBox;
    isDirectlyObserved: boolean;
  }[];
  severity: 'HIGH' | 'MEDIUM' | 'LOW' | 'CRITICAL';
  confidenceStatus: 'Visual assessment — requires physical verification' | 'Calibrated Model Score' | 'Unconfirmed Hypothesis';
  calibratedConfidencePercent?: number | null;
  possibleCauses: RootCauseHypothesis[];
  verifiedMachineData: {
    dataSource: 'PLC' | 'HMI' | 'SCADA' | 'MANUAL_INSPECTION' | 'NONE_CONNECTED';
    status: 'NO_LIVE_FEED' | 'PENDING_PHYSICAL_CHECK' | 'CONNECTED';
    notes: string;
  };
  alarmStatus: {
    stackLightColor: 'RED' | 'AMBER' | 'GREEN' | 'OFF';
    status: 'ACTIVE_VISUAL_INDICATOR';
    exactAlarmCode: 'UNKNOWN_VERIFY_PLC' | string;
    notes: string;
  };
  safetyPrecautions: string[];
  recommendedActions: RepairWorkflowStep[];
  verificationCriteria: string[];
  technicianApproval: {
    isApproved: boolean;
    technicianName?: string;
    notes?: string;
    signOffDate?: string;
  };
  resolutionStatus: 'OPEN' | 'CONTAINED' | 'INVESTIGATING' | 'CORRECTIVE_IN_PROGRESS' | 'VERIFIED_RESOLVED' | 'ESCALATED';
  citationsOrManualReferences: ManualCitation[];
}

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
  type: 'error_code' | 'component' | 'nameplate' | 'warning_zone' | 'gauge';
  confidence: number;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number;
  height: number;
  detail: string;
  severity?: AlertSeverity;
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
  confidence: 'High' | 'Medium' | 'Low';
  confidenceScore: number; // 0-100
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
    type: 'approval_request' | 'ticket_created' | 'inventory_checked' | 'diagnostic_checklist';
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
  actionType: 'ORDER_PART' | 'CREATE_TICKET' | 'SHUTDOWN_UNIT' | 'ESCALATE_SUPERVISOR' | 'DISPATCH_CREW';
  title: string;
  description: string;
  equipmentModel: string;
  equipmentSerial: string;
  financialImpactUsd: number;
  operationalRisk: 'Low' | 'Medium' | 'High' | 'Critical';
  aiConfidence: number;
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
  iconType: 'scan' | 'voice' | 'knowledge' | 'action' | 'approval' | 'ticket' | 'telemetry';
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

import { Equipment, ManualCitation, InventoryItem, MaintenanceTicket } from '../types';
import { DEMO_EQUIPMENT, INITIAL_CITATIONS, INVENTORY_PARTS, INITIAL_TICKETS } from '../data/mockData';

// Service Interfaces for Real API Ready Architecture

export interface VisionDetectionResult {
  equipmentModel: string;
  equipmentSerial: string;
  errorCode: string;
  confidence: number;
  temperatureC: number;
  anomalyDetected: boolean;
  components: {
    name: string;
    status: 'Normal' | 'Warning' | 'Fault';
    location: string;
  }[];
}

export interface RAGSearchResult {
  query: string;
  topCitation: ManualCitation;
  allCitations: ManualCitation[];
  matchedKeywords: string[];
  relevanceScore: number;
}

export interface AgentActionResult {
  toolName: string;
  executionId: string;
  status: 'COMPLETED' | 'WAITING_APPROVAL' | 'FAILED';
  payload: Record<string, any>;
  summary: string;
}

export class VisionService {
  public async analyzeFrame(imageSrc?: string): Promise<VisionDetectionResult> {
    // Simulated Multimodal Computer Vision Analysis (labeled DEMO VISION ANALYSIS)
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      equipmentModel: 'VX-420',
      equipmentSerial: 'DEMO-420-0192',
      errorCode: 'E17',
      confidence: 96,
      temperatureC: 88.4,
      anomalyDetected: true,
      components: [
        { name: 'Axial Cooling Fan', status: 'Warning', location: 'Top Shroud' },
        { name: 'Primary 3-Phase Motor', status: 'Fault', location: 'Stator Housing' },
        { name: 'Terminal Block TB-2', status: 'Normal', location: 'Junction Box' }
      ]
    };
  }
}

export class KnowledgeService {
  public searchManuals(query: string, model: string = 'VX-420'): RAGSearchResult {
    const q = query.toLowerCase();
    const allCitations = INITIAL_CITATIONS;

    let topCitation = allCitations[0];
    let score = 96;
    let matchedKeywords = ['E17', 'Motor Thermal Overload', 'Cooling Flow'];

    if (q.includes('torque') || q.includes('loto') || q.includes('isolation')) {
      topCitation = allCitations[1] || allCitations[0];
      score = 88;
      matchedKeywords = ['LOTO', 'Lockout', 'Torque', 'SW-1'];
    }

    return {
      query,
      topCitation,
      allCitations,
      matchedKeywords,
      relevanceScore: score
    };
  }
}

export class InventoryService {
  private parts: InventoryItem[] = [...INVENTORY_PARTS];

  public getInventory(): InventoryItem[] {
    return [...this.parts];
  }

  public checkPart(partNumber: string): InventoryItem | undefined {
    return this.parts.find(p => p.partNumber.toLowerCase() === partNumber.toLowerCase());
  }

  public reservePart(partNumber: string): boolean {
    const item = this.parts.find(p => p.partNumber === partNumber);
    if (item && item.inStock > 0) {
      item.reserved += 1;
      item.inStock -= 1;
      return true;
    }
    return false;
  }
}

export class TicketService {
  private tickets: MaintenanceTicket[] = [...INITIAL_TICKETS];

  public getTickets(): MaintenanceTicket[] {
    return [...this.tickets];
  }

  public createTicket(draft: Partial<MaintenanceTicket>): MaintenanceTicket {
    const newTicket: MaintenanceTicket = {
      id: `TCK-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      title: draft.title || 'Corrective Maintenance Work Order',
      equipmentId: draft.equipmentId || 'eq-vx420',
      equipmentModel: draft.equipmentModel || 'VX-420',
      priority: draft.priority || 'High',
      errorCode: draft.errorCode || 'E17',
      reportedBy: draft.reportedBy || 'VoxLens AI Agent (Technician: Alex Rivera)',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      status: 'IN_PROGRESS',
      suspectedRootCause: draft.suspectedRootCause || 'Thermal exceedance in axial cooling channel.',
      diagnosticStepsTaken: draft.diagnosticStepsTaken || ['Optical CV OCR verified E17', 'Stator temp read 88.4°C'],
      recommendedActions: draft.recommendedActions || ['Inspect shroud', 'Swap Part #VX-CF42 if drag persists'],
      estimatedDowntimeHours: draft.estimatedDowntimeHours || 1.5,
      partsRequired: draft.partsRequired || [{ partNumber: 'VX-CF42', name: 'Axial Cooling Fan', quantity: 1, estimatedCost: 245.00 }],
      supervisorApproved: true,
      supervisorName: 'Alex Rivera (Technician Authorization)'
    };

    this.tickets.unshift(newTicket);
    return newTicket;
  }
}

export const visionService = new VisionService();
export const knowledgeService = new KnowledgeService();
export const inventoryService = new InventoryService();
export const ticketService = new TicketService();

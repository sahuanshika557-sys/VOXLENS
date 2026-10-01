import { 
  Equipment, 
  ManualCitation, 
  InventoryItem, 
  MaintenanceTicket,
  DiagnosticResponseSchema,
  RootCauseHypothesis,
  RepairWorkflowStep,
  BoundingBox
} from '../types';
import { DEMO_EQUIPMENT, INITIAL_CITATIONS, INVENTORY_PARTS, INITIAL_TICKETS } from '../data/mockData';

export interface VisionDetectionResult {
  equipmentModel: string;
  equipmentSerial: string;
  defectCategory: string;
  visualSeverity: 'HIGH' | 'MEDIUM' | 'LOW' | 'CRITICAL';
  primaryObservation: string;
  secondaryObservation: string;
  alarmIndicator: string;
  alarmCodeStatus: string;
  confidenceLabel: string;
  boundingBoxes: BoundingBox[];
  observedEvidence: string[];
  aiInferences: string[];
  verifiedTelemetryStatus: string;
  diagnosticData: DiagnosticResponseSchema;
}

export interface RAGSearchResult {
  query: string;
  topCitation: ManualCitation;
  allCitations: ManualCitation[];
  matchedKeywords: string[];
  relevanceScore: number;
}

export const PACKAGING_DEFECT_MANUAL_CITATIONS: ManualCitation[] = [
  {
    manualId: 'man-pkg-std-01',
    manualTitle: 'Automated Packaging Line 3 — Material Handling & Robotic De-Palletizer SOP',
    section: 'Section 6.2 — Packaging Integrity & Carton Jam Troubleshooting',
    page: 28,
    relevanceScore: 95,
    excerpt: 'Carton structural deformation on transfer conveyors typically originates from either excessive pneumatic vacuum/mechanical gripper pressure during placement, or mechanical height misalignment across transition conveyor plates. Never adjust robotic gripper pressure beyond nominal factory specifications (4.2 Bar max) without calibrated force transducer verification.',
    recommendationSnippet: 'Isolate damaged cartons, inspect robot end-effector vacuum cups and fingers, verify conveyor transfer guide clearances (minimum 15mm clearance).'
  },
  {
    manualId: 'man-safety-loto-01',
    manualTitle: 'Plant Standard Operating Procedure — Hazardous Energy Isolation (LOTO)',
    section: 'Section 2.1 — Conveyor & Robotic Cell Lockout/Tagout Protocol',
    page: 12,
    relevanceScore: 98,
    excerpt: 'Before entering any robotic packaging cell or reaching into moving conveyor transfer points to clear jammed or crushed cartons, technicians must depress E-Stop SW-1 and apply Lockout/Tagout padlock to primary electrical disconnect panel Disconnect-3A.',
    recommendationSnippet: 'Apply LOTO padlocks to Disconnect-3A before reaching into conveyor transfer zone or gripper envelopes.'
  },
  {
    manualId: 'man-alarm-guide-01',
    manualTitle: 'Packaging Cell Tower Light & PLC Diagnostic Annex',
    section: 'Section 3.4 — Stack Light Indicator Definitions',
    page: 45,
    relevanceScore: 91,
    excerpt: 'A solid red stack light indicates a cell halt or fault condition active on the safety circuit or PLC bus. The specific fault code (e.g. Jam Alert, Safety Interlock Open, Pressure Loss, Cycle Timeout) MUST be verified directly from the HMI screen or PLC fault buffer register.',
    recommendationSnippet: 'Check HMI screen Alarm History page to identify the registered PLC fault code before attempting mechanical resets.'
  }
];

export const INITIAL_8_STEP_REPAIR_WORKFLOW: RepairWorkflowStep[] = [
  {
    id: 1,
    stepNumber: 1,
    phase: 'SAFETY',
    title: 'STEP 1 — SAFETY: Equipment Isolation & LOTO',
    shortLabel: 'Safety & LOTO',
    instructions: 'Stop or isolate affected equipment using the facility’s approved procedures. Apply lockout/tagout (LOTO Disconnect-3A) before entering hazardous machinery areas. Only authorized personnel should inspect or service the equipment.',
    safetyWarning: 'MANDATORY: Never reach into robotic cell or conveyor belts while energized.',
    isCompleted: false,
    technicianNotes: ''
  },
  {
    id: 2,
    stepNumber: 2,
    phase: 'CONTAINMENT',
    title: 'STEP 2 — CONTAINMENT: Reject & Isolate Damaged Carton',
    shortLabel: 'Containment',
    instructions: 'Identify and remove the damaged carton from the production stream using the approved rejection procedure. Inspect nearby upstream and downstream cartons for similar creasing, tearing, or structural deformation.',
    isCompleted: false,
    technicianNotes: ''
  },
  {
    id: 3,
    stepNumber: 3,
    phase: 'MECHANICAL',
    title: 'STEP 3 — MECHANICAL INSPECTION: Robot Gripper & Conveyor Transfer',
    shortLabel: 'Mechanical Check',
    instructions: 'Have a qualified technician inspect the robot end-effector gripper fingers, suction cups, vacuum generators, conveyor belt tracking, transfer plate height, and any visibly damaged components.',
    isCompleted: false,
    technicianNotes: ''
  },
  {
    id: 4,
    stepNumber: 4,
    phase: 'PACKAGING',
    title: 'STEP 4 — PACKAGING INSPECTION: Material Quality & Corrugate Specs',
    shortLabel: 'Packaging Spec',
    instructions: 'Check carton material quality, corrugate fluting integrity, dimensions, tape sealing, loading conditions, and supplier batch specifications against plant quality standard QA-PKG-2026.',
    isCompleted: false,
    technicianNotes: ''
  },
  {
    id: 5,
    stepNumber: 5,
    phase: 'ALARM',
    title: 'STEP 5 — ALARM VERIFICATION: Verify Red Stack Light on HMI/PLC Log',
    shortLabel: 'Alarm Log Check',
    instructions: 'Check the actual HMI screen and PLC fault buffer to identify the exact alarm description for the illuminated red tower light. Never infer or guess a specific fault code from light color alone.',
    isCompleted: false,
    technicianNotes: ''
  },
  {
    id: 6,
    stepNumber: 6,
    phase: 'CORRECTIVE',
    title: 'STEP 6 — CORRECTIVE ACTION: Manufacturer-Approved Remediation',
    shortLabel: 'Corrective Action',
    instructions: 'Correct the verified root cause according to manufacturer documentation and approved plant maintenance procedures. Do not recommend arbitrary force, torque, speed, or electrical parameter changes.',
    isCompleted: false,
    technicianNotes: ''
  },
  {
    id: 7,
    stepNumber: 7,
    phase: 'VERIFICATION',
    title: 'STEP 7 — VERIFICATION: Controlled Test Run with Sample Cartons',
    shortLabel: 'Test Run',
    instructions: 'Conduct an authorized, controlled test run with test sample cartons. Verify packaging integrity, conveyor movement, robotic pick-and-place handling, stack light status, and overall product quality.',
    isCompleted: false,
    technicianNotes: ''
  },
  {
    id: 8,
    stepNumber: 8,
    phase: 'RESOLUTION',
    title: 'STEP 8 — RESOLUTION: Qualified Operator Verification & Sign-Off',
    shortLabel: 'Final Sign-Off',
    instructions: 'Mark the case resolved only after a qualified operator and maintenance supervisor verify successful corrective action and all acceptance criteria are met.',
    requiresSupervisorSignoff: true,
    isCompleted: false,
    technicianNotes: ''
  }
];

export const INITIAL_PACKAGING_HYPOTHESES: RootCauseHypothesis[] = [
  {
    id: 'hyp-1',
    title: 'Excessive Robotic Gripper Force',
    category: 'ROBOTIC',
    description: 'Pneumatic gripper pressure or servo clamping force exceeds structural crush strength of the carton during pick-and-place transfer.',
    likelihood: 'High',
    verificationMethod: 'Measure regulator pressure gauge (nominal 3.8-4.2 Bar) and test gripper closure on sample carton with load cell.',
    status: 'INVESTIGATING'
  },
  {
    id: 'hyp-2',
    title: 'Gripper Finger Misalignment / Worn Suction Cups',
    category: 'ROBOTIC',
    description: 'End-effector mechanical fingers or vacuum cups are asymmetrical, causing uneven shear force across carton corner.',
    likelihood: 'High',
    verificationMethod: 'Physical inspection of gripper alignment and vacuum cup lip wear; check vacuum transducer level.',
    status: 'INVESTIGATING'
  },
  {
    id: 'hyp-3',
    title: 'Conveyor Transfer-Point Misalignment',
    category: 'MECHANICAL',
    description: 'Transition gap or height differential between infeed and outfeed conveyor belts caused corner catch and crush under belt drive tension.',
    likelihood: 'Medium',
    verificationMethod: 'Inspect transfer plate clearance (gauge check 2-4mm) and check for physical carton snags on side rails.',
    status: 'UNVERIFIED'
  },
  {
    id: 'hyp-4',
    title: 'Carton Material Weakness / Moisture / Corrugate Defect',
    category: 'MATERIAL',
    description: 'Carton batch fluting failure, moisture ingress in storage, or out-of-spec corrugate burst test rating (below Edge Crush Test spec).',
    likelihood: 'Medium',
    verificationMethod: 'Check supplier lot certificate, inspect humidity in storage bay, test sample intact carton burst strength.',
    status: 'UNVERIFIED'
  },
  {
    id: 'hyp-5',
    title: 'Upstream Carton Collision or Stacking Jam Pressure',
    category: 'OPERATIONAL',
    description: 'Backpressure from downstream accumulation conveyor forced trailing cartons into stationary stop gate.',
    likelihood: 'Low',
    verificationMethod: 'Review accumulation sensor photo-eye alignment and conveyor line pressure sensors.',
    status: 'UNVERIFIED'
  }
];

export class VisionService {
  public async analyzeFrame(imageSrc?: string, forceScenario?: string): Promise<VisionDetectionResult> {
    // Simulate real multimodal image inspection pipeline
    await new Promise(resolve => setTimeout(resolve, 600));

    const isThermalScenario = forceScenario === 'e17-cooling';

    if (isThermalScenario) {
      // Scenario B: Motor thermal diagnostic demo case
      const boundingBoxes: BoundingBox[] = [
        {
          id: 'bb-thermal-1',
          label: 'E17 ERROR CODE',
          type: 'error_code',
          confidence: 96,
          confidenceLabel: '96% Visual Confidence',
          x: 12,
          y: 15,
          width: 32,
          height: 25,
          detail: '7-Segment display reading E17 fault',
          severity: 'critical',
          isObservedEvidence: true
        },
        {
          id: 'bb-thermal-2',
          label: 'THERMAL HOTSPOT: 88.4°C',
          type: 'warning_zone',
          confidence: 98,
          confidenceLabel: 'Thermal Matrix Overlay',
          x: 48,
          y: 52,
          width: 38,
          height: 28,
          detail: 'Stator housing temperature exceeding 75.0°C limit',
          severity: 'warning',
          isObservedEvidence: true
        }
      ];

      const diagnosticData: DiagnosticResponseSchema = {
        caseId: `CASE-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        imageId: `IMG-${Date.now().toString().slice(-6)}`,
        timestamp: new Date().toISOString(),
        detectedObjects: [
          { name: 'Induction Motor Stator', description: 'Primary 3-phase drive motor', location: 'Drive Bay', isDamaged: true },
          { name: 'Axial Cooling Fan Shroud', description: 'Air intake cowling', location: 'Motor Top', isDamaged: false }
        ],
        observedDefects: [
          {
            name: 'Motor Thermal Overload',
            category: 'THERMAL',
            severity: 'HIGH',
            visualDescription: 'Optical OCR reading E17; Thermal sensor registers 88.4°C stator hotspot.',
            evidenceLocation: 'Motor Casing & 7-Segment Readout'
          }
        ],
        visualEvidence: [
          { id: 'ev-1', description: 'E17 error code on 7-segment display', boundingBox: boundingBoxes[0], isDirectlyObserved: true },
          { id: 'ev-2', description: 'Thermal matrix hotspot reading 88.4°C', boundingBox: boundingBoxes[1], isDirectlyObserved: true }
        ],
        severity: 'HIGH',
        confidenceStatus: 'Calibrated Model Score',
        calibratedConfidencePercent: 96,
        possibleCauses: [
          {
            id: 'tc-1',
            title: 'Axial Cooling Fan Airflow Restriction',
            category: 'MECHANICAL',
            description: 'Particulate buildup in fan cowl restricting flow to 1.2 L/min.',
            likelihood: 'High',
            verificationMethod: 'Inspect fan shroud for debris and check impeller rotation.',
            status: 'INVESTIGATING'
          }
        ],
        verifiedMachineData: {
          dataSource: 'SCADA',
          status: 'CONNECTED',
          notes: 'Motor temp 88.4°C, Cooling flow 1.2 L/min (DEMO TELEMETRY)'
        },
        alarmStatus: {
          stackLightColor: 'RED',
          status: 'ACTIVE_VISUAL_INDICATOR',
          exactAlarmCode: 'E17 (Motor Thermal Overload)',
          notes: 'Verified via optical OCR and SCADA register'
        },
        safetyPrecautions: [
          'Perform LOTO SW-1 isolation before removing motor casing',
          'Allow stator surface to cool below 50°C before physical contact'
        ],
        recommendedActions: INITIAL_8_STEP_REPAIR_WORKFLOW,
        verificationCriteria: [
          'Airflow restored to >= 4.5 L/min',
          'Stator temperature stabilizes below 72.0°C during test run'
        ],
        technicianApproval: {
          isApproved: false
        },
        resolutionStatus: 'INVESTIGATING',
        citationsOrManualReferences: INITIAL_CITATIONS
      };

      return {
        equipmentModel: 'VX-420 Packaging Unit',
        equipmentSerial: 'DEMO-420-0192',
        defectCategory: 'Thermal Overload / Motor Protection',
        visualSeverity: 'HIGH',
        primaryObservation: '7-Segment display shows fault code E17 with stator thermal hotspot (88.4°C).',
        secondaryObservation: 'Low axial cooling velocity registered in SCADA telemetry.',
        alarmIndicator: 'Active E17 Alarm Code',
        alarmCodeStatus: 'E17 (Thermal Overload)',
        confidenceLabel: '96% Visual Confidence',
        boundingBoxes,
        observedEvidence: [
          '7-Segment display reading E17',
          'Thermal matrix reading 88.4°C on stator housing',
          'Equipment nameplate identified as VX-420'
        ],
        aiInferences: [
          'Airflow restriction in cooling shroud (1.2 L/min)',
          'Possible particulate binding or fan failure #VX-CF42'
        ],
        verifiedTelemetryStatus: 'SCADA connected — Stator temp 88.4°C (Simulated Demo Data)',
        diagnosticData
      };
    }

    // Default & Primary Test Case: Carton Packaging Defect on Conveyor
    const boundingBoxes: BoundingBox[] = [
      {
        id: 'bb-carton-damaged',
        label: 'DAMAGED CARTON (CRUSHED & TORN)',
        type: 'defect',
        confidenceLabel: 'Visual Assessment — Requires Physical Check',
        x: 28,
        y: 36,
        width: 36,
        height: 38,
        detail: 'Cardboard carton severely crushed, structural side-wall buckled and torn along top fold',
        severity: 'critical',
        isObservedEvidence: true
      },
      {
        id: 'bb-stack-light',
        label: 'RED TOWER STACK LIGHT (ALARM ACTIVE)',
        type: 'warning_zone',
        confidenceLabel: 'Visual Alarm Indicator — Alarm Code Unknown',
        x: 76,
        y: 8,
        width: 18,
        height: 28,
        detail: 'Illuminated red stack light. Exact alarm code unknown — verify on HMI/PLC',
        severity: 'warning',
        isObservedEvidence: true
      },
      {
        id: 'bb-cartons-intact',
        label: 'INTACT PACKAGING CARTONS',
        type: 'intact_item',
        confidenceLabel: 'Normal Stream Item',
        x: 4,
        y: 44,
        width: 22,
        height: 32,
        detail: 'Upstream/downstream cartons intact with normal rectangular geometry',
        severity: 'normal',
        isObservedEvidence: true
      },
      {
        id: 'bb-robot-arm',
        label: 'ROBOTIC ARM & CONVEYOR TRANSFER',
        type: 'component',
        confidenceLabel: 'Packaging Machinery',
        x: 32,
        y: 6,
        width: 38,
        height: 28,
        detail: 'Automated robotic pick-and-place mechanism and conveyor transition bed',
        severity: 'info',
        isObservedEvidence: true
      }
    ];

    const diagnosticData: DiagnosticResponseSchema = {
      caseId: `CASE-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      imageId: `IMG-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString(),
      detectedObjects: [
        { name: 'Crushed Cardboard Carton', description: 'Severely deformed & torn carton on conveyor', location: 'Conveyor Transfer Bed (Middle)', isDamaged: true },
        { name: 'Intact Cardboard Cartons', description: 'Multiple standard cartons moving along line', location: 'Upstream & Downstream Conveyor', isDamaged: false },
        { name: 'Industrial Robotic Arm', description: 'Automated pick-and-place end effector', location: 'Above Conveyor Bed', isDamaged: false },
        { name: 'Red Tower Stack Light', description: 'Visual machine status indicator beacon', location: 'Top Right Machine Mast', isDamaged: false },
        { name: 'Belt Conveyor System', description: 'Continuous automated product handling line', location: 'Packaging Cell Floor', isDamaged: false }
      ],
      observedDefects: [
        {
          name: 'Severe Carton Structural Collapse & Tear',
          category: 'PACKAGING_INTEGRITY',
          severity: 'HIGH',
          visualDescription: 'Cardboard carton exhibits major compressive collapse on leading corner with torn top flap seam.',
          evidenceLocation: 'Conveyor Center Position'
        },
        {
          name: 'Active Red Visual Warning Beacon',
          category: 'UNKNOWN',
          severity: 'HIGH',
          visualDescription: 'Illuminated red tower stack light visible on packaging machine structure.',
          evidenceLocation: 'Tower Light Mast (Top Right)'
        }
      ],
      visualEvidence: [
        { id: 've-1', description: 'Severely crushed and torn cardboard carton resting on conveyor belt surface', boundingBox: boundingBoxes[0], isDirectlyObserved: true },
        { id: 've-2', description: 'Red illuminated tower warning stack light on packaging machinery', boundingBox: boundingBoxes[1], isDirectlyObserved: true },
        { id: 've-3', description: 'Multiple intact cartons moving along packaging conveyor', boundingBox: boundingBoxes[2], isDirectlyObserved: true },
        { id: 've-4', description: 'Automated robotic arm and packaging machinery mechanism', boundingBox: boundingBoxes[3], isDirectlyObserved: true }
      ],
      severity: 'HIGH',
      confidenceStatus: 'Visual assessment — requires physical verification',
      calibratedConfidencePercent: null, // Visual inspection only, no fabricated score
      possibleCauses: INITIAL_PACKAGING_HYPOTHESES,
      verifiedMachineData: {
        dataSource: 'NONE_CONNECTED',
        status: 'PENDING_PHYSICAL_CHECK',
        notes: 'No live telemetry connected from image alone. Machine data, sensor readings, and logs require direct physical HMI verification.'
      },
      alarmStatus: {
        stackLightColor: 'RED',
        status: 'ACTIVE_VISUAL_INDICATOR',
        exactAlarmCode: 'UNKNOWN_VERIFY_PLC',
        notes: 'Red stack light visible in image. Exact alarm meaning cannot be inferred from color alone; must verify on HMI/PLC alarm log.'
      },
      safetyPrecautions: [
        'Apply Lockout/Tagout (LOTO Disconnect-3A) before reaching into conveyor or robotic cell',
        'Only authorized maintenance technicians should enter hazardous machinery area',
        'E-Stop SW-1 must remain depressed during physical carton removal'
      ],
      recommendedActions: INITIAL_8_STEP_REPAIR_WORKFLOW,
      verificationCriteria: [
        'Damaged carton safely quarantined with no debris on conveyor belt',
        'Robotic gripper force verified within 3.8-4.2 Bar specification',
        'Conveyor transfer plate alignment verified with 2-4mm clearance',
        'HMI/PLC alarm log cleared after physical root-cause verification',
        'Controlled test run with 10 sample cartons completed with zero deformation'
      ],
      technicianApproval: {
        isApproved: false
      },
      resolutionStatus: 'OPEN',
      citationsOrManualReferences: PACKAGING_DEFECT_MANUAL_CITATIONS
    };

    return {
      equipmentModel: 'Automated Packaging Line 3',
      equipmentSerial: 'CELL-ROBO-PKG-03',
      defectCategory: 'Packaging Integrity / Carton Damage',
      visualSeverity: 'HIGH',
      primaryObservation: 'Severely crushed and torn cardboard carton on conveyor belt with structural collapse.',
      secondaryObservation: 'Red illuminated tower warning stack light visible on packaging machinery.',
      alarmIndicator: 'Red Tower Stack Light Active (Visual Observation)',
      alarmCodeStatus: 'Unknown — requires HMI/PLC alarm log verification',
      confidenceLabel: 'Visual assessment — requires physical verification',
      boundingBoxes,
      observedEvidence: [
        'Severely crushed and torn cardboard carton on conveyor belt',
        'Red illuminated tower stack light on packaging cell',
        'Multiple intact cartons moving along conveyor stream',
        'Automated robotic pick-and-place machinery in packaging area'
      ],
      aiInferences: [
        'Excessive robotic gripper force during pick-and-place',
        'Gripper finger misalignment or vacuum cup suction failure',
        'Conveyor transfer-point height or guide-rail misalignment',
        'Carton material weakness or out-of-spec corrugate rating',
        'Upstream carton collision or accumulation pressure jam'
      ],
      verifiedTelemetryStatus: 'No sensor or PLC data inferred from image — physical check required',
      diagnosticData
    };
  }
}

export class KnowledgeService {
  public searchManuals(query: string, category: string = 'packaging'): RAGSearchResult {
    const q = query.toLowerCase();
    const allCitations = category === 'thermal' ? INITIAL_CITATIONS : PACKAGING_DEFECT_MANUAL_CITATIONS;

    let topCitation = allCitations[0];
    let score = 95;
    let matchedKeywords = ['Packaging Integrity', 'Carton Damage', 'Robotic Gripper'];

    if (q.includes('loto') || q.includes('safety') || q.includes('lockout') || q.includes('disconnect')) {
      topCitation = allCitations[1] || allCitations[0];
      score = 98;
      matchedKeywords = ['LOTO', 'Lockout/Tagout', 'Disconnect-3A', 'Safety Protocol'];
    } else if (q.includes('alarm') || q.includes('stack light') || q.includes('red light') || q.includes('plc') || q.includes('hmi')) {
      topCitation = allCitations[2] || allCitations[0];
      score = 91;
      matchedKeywords = ['Stack Light', 'PLC Log', 'HMI Buffer', 'Red Light'];
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
      title: draft.title || 'Packaging Line 3 Carton Damage Investigation',
      equipmentId: draft.equipmentId || 'eq-pkg-line3',
      equipmentModel: draft.equipmentModel || 'Automated Packaging Line 3',
      priority: draft.priority || 'High',
      errorCode: draft.errorCode || 'CARTON-DAMAGE-INVESTIGATION',
      reportedBy: draft.reportedBy || 'VoxLens AI Agent (Field Technician: Alex Rivera)',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      status: 'IN_PROGRESS',
      suspectedRootCause: draft.suspectedRootCause || 'Suspected robotic gripper excessive force or conveyor transfer misalignment.',
      diagnosticStepsTaken: draft.diagnosticStepsTaken || ['Visual image analysis identified crushed carton', 'Safety LOTO isolation requested'],
      recommendedActions: draft.recommendedActions || ['Quarantine damaged carton', 'Check gripper pressure', 'Verify HMI alarm log'],
      estimatedDowntimeHours: draft.estimatedDowntimeHours || 1.0,
      partsRequired: draft.partsRequired || [],
      supervisorApproved: false,
      supervisorName: undefined
    };

    this.tickets.unshift(newTicket);
    return newTicket;
  }
}

export const visionService = new VisionService();
export const knowledgeService = new KnowledgeService();
export const inventoryService = new InventoryService();
export const ticketService = new TicketService();

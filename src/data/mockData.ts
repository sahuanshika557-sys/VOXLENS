import { 
  Equipment, 
  InventoryItem, 
  MaintenanceTicket, 
  SafetyGateRequest, 
  SupervisorMachineStatus,
  ManualCitation
} from '../types';

export const DEMO_EQUIPMENT: Equipment[] = [
  {
    id: 'eq-vx420',
    name: 'VX-420 High-Speed Packaging Unit',
    model: 'VX-420',
    serialNumber: 'DEMO-420-0192',
    category: 'Packaging & Automated Sorting',
    location: 'Assembly Plant 2 — Sector 4',
    line: 'Line 3 (High-Throughput)',
    status: 'Attention Required',
    activeAlert: 'E17 — Motor Thermal Overload Threshold',
    activeErrorCode: 'E17',
    lastServiceDate: '12 Aug 2026',
    nextScheduledService: '12 Nov 2026',
    operatingHours: 4218,
    healthScore: 74,
    imageThumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    telemetry: {
      motorTempC: 88.4, // Over normal threshold of 72°C
      bearingVibrationMmS: 4.8, // Normal < 3.2
      coolingFlowLMin: 1.2, // Low flow (Normal > 4.5 L/min)
      operatingRpm: 2840,
      busVoltageV: 480.2,
      currentDrawA: 18.6,
      ambientTempC: 26.5,
      pressureKPa: 340
    },
    history: [
      {
        id: 'rec-101',
        date: '12 Aug 2026',
        technician: 'Marcus Vance',
        type: 'Preventative',
        summary: 'Replaced primary drive belt and calibrated optical encoders.',
        partsReplaced: ['VX-BT-441 Belt', 'ENC-OPT-02'],
        durationMinutes: 45,
        status: 'Resolved'
      },
      {
        id: 'rec-102',
        date: '28 Jun 2026',
        technician: 'Elena Rostova',
        type: 'Corrective',
        summary: 'Cleaned intake fan shroud due to particulate accumulation.',
        partsReplaced: [],
        durationMinutes: 30,
        status: 'Resolved'
      },
      {
        id: 'rec-103',
        date: '14 Apr 2026',
        technician: 'Alex Rivera',
        type: 'Inspection',
        summary: 'Quarterly thermal imaging inspection. Minor bearing heat noted.',
        partsReplaced: ['LUB-SYN-77 High-Temp Grease'],
        durationMinutes: 60,
        status: 'Resolved'
      }
    ],
    specifications: {
      'Rated Power': '7.5 kW AC Induction',
      'Operating Voltage': '480V 3-Phase 60Hz',
      'Cooling Method': 'Forced Axial Air Fan + Liquid Glycol Channel',
      'Max Safe Operating Temp': '75.0 °C',
      'Emergency Cutoff Temp': '92.0 °C',
      'Flow Rate Minimum': '3.8 L/min',
      'Firmware Version': 'v4.18.2-rt'
    }
  },
  {
    id: 'eq-cr800',
    name: 'CR-800 Hydraulic Stamping Press',
    model: 'CR-800',
    serialNumber: 'DEMO-800-4011',
    category: 'Metal Forming & Stamping',
    location: 'Heavy Fabrication Bay A',
    line: 'Line 1 (Press Line)',
    status: 'Operational',
    activeAlert: null,
    activeErrorCode: null,
    lastServiceDate: '01 Sep 2026',
    nextScheduledService: '01 Dec 2026',
    operatingHours: 6720,
    healthScore: 96,
    imageThumbnail: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    telemetry: {
      motorTempC: 54.2,
      bearingVibrationMmS: 1.8,
      coolingFlowLMin: 8.4,
      operatingRpm: 1450,
      busVoltageV: 480.0,
      currentDrawA: 32.1,
      ambientTempC: 24.0,
      pressureKPa: 2200
    },
    history: [
      {
        id: 'rec-201',
        date: '01 Sep 2026',
        technician: 'David K.',
        type: 'Preventative',
        summary: 'Hydraulic oil filter replacement & seal ring test.',
        partsReplaced: ['FLT-HYD-800'],
        durationMinutes: 90,
        status: 'Resolved'
      }
    ],
    specifications: {
      'Max Tonnage': '800 Metric Tons',
      'Hydraulic Reservoir': '450 Liters ISO VG 46',
      'Operating Pressure': '250 Bar'
    }
  },
  {
    id: 'eq-tr9000',
    name: 'TR-9000 Turbo Gas Compressor',
    model: 'TR-9000',
    serialNumber: 'DEMO-900-7721',
    category: 'Gas Compression & Cryogenics',
    location: 'Cryogenics Facility Yard',
    line: 'Line 5 (Primary Feed)',
    status: 'Warning',
    activeAlert: 'P08 — Intercooler Differential Pressure Spike',
    activeErrorCode: 'P08',
    lastServiceDate: '15 Jul 2026',
    nextScheduledService: '15 Oct 2026',
    operatingHours: 8150,
    healthScore: 68,
    imageThumbnail: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
    telemetry: {
      motorTempC: 76.5,
      bearingVibrationMmS: 3.9,
      coolingFlowLMin: 4.1,
      operatingRpm: 9200,
      busVoltageV: 4160.0,
      currentDrawA: 64.0,
      ambientTempC: 29.2,
      pressureKPa: 1280
    },
    history: [],
    specifications: {
      'Stage Configuration': '2-Stage Centrifugal',
      'Compression Ratio': '4.2:1',
      'Turbine Speed': '12,000 RPM Max'
    }
  }
];

export const INVENTORY_PARTS: InventoryItem[] = [
  {
    partNumber: 'VX-CF42',
    name: 'High-Output Axial Cooling Fan (24V DC Brushless)',
    category: 'Cooling Subsystems',
    inStock: 3,
    reserved: 1,
    unitCost: 245.00,
    leadTimeDays: 0, // Available immediately in Bay 4 Stockroom
    warehouseLocation: 'Bay 4 — Bin C-14',
    compatibleModels: ['VX-420', 'VX-440', 'VX-460'],
    status: 'IN_STOCK'
  },
  {
    partNumber: 'VX-TH90',
    name: 'Precision PT100 RTD Thermal Sensor Assembly',
    category: 'Sensors & Instrumentation',
    inStock: 8,
    reserved: 0,
    unitCost: 85.00,
    leadTimeDays: 0,
    warehouseLocation: 'Bay 2 — Cabinet S-08',
    compatibleModels: ['VX-420', 'CR-800', 'TR-9000'],
    status: 'IN_STOCK'
  },
  {
    partNumber: 'VX-MB12',
    name: 'Heavy-Duty Ceramic Hybrid Drive Bearing Set',
    category: 'Mechanical Drive',
    inStock: 1,
    reserved: 0,
    unitCost: 410.00,
    leadTimeDays: 2,
    warehouseLocation: 'Central Parts Vault — Shelf M-01',
    compatibleModels: ['VX-420'],
    status: 'LOW_STOCK'
  },
  {
    partNumber: 'VX-VFD-09',
    name: 'IGBT Power Inverter Module (7.5kW 480V)',
    category: 'Power Electronics',
    inStock: 0,
    reserved: 0,
    unitCost: 1250.00,
    leadTimeDays: 5,
    warehouseLocation: 'Regional Distribution Center (Dallas)',
    compatibleModels: ['VX-420', 'EL-102'],
    status: 'BACKORDER'
  }
];

export const INITIAL_CITATIONS: ManualCitation[] = [
  {
    manualId: 'man-vx420-rev4',
    manualTitle: 'VX-420 Packaging Unit — Technical Service Manual (Rev 4.2B)',
    section: 'Section 4.3 — Motor & Cooling Diagnostics (E10-E29 Fault Codes)',
    page: 42,
    relevanceScore: 96,
    excerpt: 'FAULT CODE E17 (Motor Thermal Overload / Impended Cooling Flow): Triggers when RTD sensor T1 detects casing temperature > 75.0°C for >= 180 consecutive seconds or when cooling airflow falls beneath 3.8 L/min differential.',
    recommendationSnippet: '1. Verify 3-phase harness connections at Terminal Block TB-2. 2. Inspect axial fan shroud for particulate clogging or impeller stall. 3. Measure RTD sensor resistance (nominal 100Ω at 0°C, ~133Ω at 88°C). If fan impeller resistance is felt, replace Fan Assembly (Part #VX-CF42).'
  },
  {
    manualId: 'man-vx420-rev4',
    manualTitle: 'VX-420 Packaging Unit — Technical Service Manual (Rev 4.2B)',
    section: 'Section 7.1 — Torque Specifications & Electrical Isolation',
    page: 68,
    relevanceScore: 84,
    excerpt: 'Before probing TB-2 motor terminal block or removing cooling cowl, engage Lockout/Tagout (LOTO) switch SW-1 on primary distribution feeder. Verify zero voltage using Cat IV 600V certified multimeter.',
    recommendationSnippet: 'Always verify LOTO state prior to physical contact with stator casing.'
  }
];

export const INITIAL_TICKETS: MaintenanceTicket[] = [
  {
    id: 'TCK-2026-881',
    title: 'Line 3 VX-420 Motor Thermal Exceedance & Diagnostic Audit',
    equipmentId: 'eq-vx420',
    equipmentModel: 'VX-420',
    priority: 'High',
    errorCode: 'E17',
    reportedBy: 'VoxLens AI Agent (Technician: Alex Rivera)',
    createdAt: '2026-09-26 10:14:00',
    status: 'OPEN',
    suspectedRootCause: 'Axial cooling fan flow restriction / high thermal buildup in stator casing.',
    diagnosticStepsTaken: [
      'Visual OCR verification of Error Code E17 (96% CV confidence)',
      'Telemetry audit: Motor Temp 88.4°C vs normal 72°C',
      'Cooling flow rate detected at 1.2 L/min (Nominal >= 4.5 L/min)'
    ],
    recommendedActions: [
      'Perform intake cowl clearing and airflow channel inspection',
      'Measure resistance on PT100 RTD sensor leads',
      'If fan motor bearing seized, swap assembly with Part #VX-CF42 from Bay 4 Stockroom'
    ],
    estimatedDowntimeHours: 1.5,
    partsRequired: [
      {
        partNumber: 'VX-CF42',
        name: 'High-Output Axial Cooling Fan',
        quantity: 1,
        estimatedCost: 245.00
      }
    ],
    supervisorApproved: false
  },
  {
    id: 'TCK-2026-879',
    title: 'TR-9000 Intercooler Pressure Differential Calibration',
    equipmentId: 'eq-tr9000',
    equipmentModel: 'TR-9000',
    priority: 'Medium',
    errorCode: 'P08',
    reportedBy: 'Supervisor Auto-Trigger',
    createdAt: '2026-09-25 16:30:00',
    status: 'WAITING_PARTS',
    suspectedRootCause: 'Fouled second-stage intercooler core plate.',
    diagnosticStepsTaken: ['DP transmitter signal verified across 4-20mA loop'],
    recommendedActions: ['Perform chemical flush during scheduled downtime window'],
    estimatedDowntimeHours: 4.0,
    partsRequired: [],
    supervisorApproved: true,
    supervisorName: 'David K. (Shift Supervisor)'
  }
];

export const SUPERVISOR_MACHINES: SupervisorMachineStatus[] = [
  {
    id: 'eq-vx420',
    machineName: 'Machine A (Packaging Unit)',
    model: 'VX-420',
    status: 'Approval Required',
    confidence: 94,
    activeTechnician: 'Alex Rivera (Technician)',
    sessionDuration: '14m 20s',
    currentStep: 'Part Request & Ticket Sign-off',
    alertsCount: 1,
    pendingApprovals: 1
  },
  {
    id: 'eq-cr800',
    machineName: 'Machine B (Hydraulic Press)',
    model: 'CR-800',
    status: 'Repair Completed',
    confidence: 98,
    activeTechnician: 'Elena Rostova',
    sessionDuration: '38m 10s',
    currentStep: 'Post-service telemetry validation',
    alertsCount: 0,
    pendingApprovals: 0
  },
  {
    id: 'eq-tr9000',
    machineName: 'Machine C (Turbo Gas Compressor)',
    model: 'TR-9000',
    status: 'AI Assisting',
    confidence: 91,
    activeTechnician: 'Marcus Vance',
    sessionDuration: '22m 45s',
    currentStep: 'Vibration frequency spectral isolation',
    alertsCount: 1,
    pendingApprovals: 0
  }
];

export const INITIAL_SAFETY_GATE: SafetyGateRequest = {
  id: 'SAFE-GATE-904',
  actionType: 'ORDER_PART',
  title: 'Replacement Part Dispatch & Maintenance Ticket Authorization',
  description: 'Authorization to requisition Part #VX-CF42 (Axial Cooling Fan, $245.00) from Bay 4 Stockroom and log Formal CMMS Ticket #TCK-2026-881 for Line 3 Bay B.',
  equipmentModel: 'VX-420 Packaging Unit',
  equipmentSerial: 'DEMO-420-0192',
  financialImpactUsd: 245.00,
  operationalRisk: 'Medium',
  aiConfidence: 94,
  justification: 'Physical motor telemetry confirms 88.4°C stator temperature and constrained 1.2 L/min airflow. Service Manual Section 4.3 mandates immediate replacement if airflow fails to recover after cowl inspection.',
  evidenceSource: 'VX-420 Service Manual Rev 4.2B, Section 4.3 (Page 42)',
  partRequestDraft: {
    partNumber: 'VX-CF42',
    name: 'High-Output Axial Cooling Fan (24V DC)',
    qty: 1,
    cost: 245.00
  },
  status: 'PENDING_APPROVAL',
  requestedAt: '2026-09-26 10:15:22'
};

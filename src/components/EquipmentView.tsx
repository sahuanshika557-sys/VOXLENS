import React, { useState } from 'react';
import { 
  Thermometer, 
  Wind, 
  Activity, 
  Zap, 
  X, 
  ChevronRight, 
  Cpu, 
  ShieldAlert, 
  RotateCcw,
  Sliders,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Equipment } from '../types';
import { DEMO_EQUIPMENT } from '../data/mockData';
import { soundEngine } from '../utils/soundEngine';

interface EquipmentViewProps {
  currentEquipment: Equipment;
  onSelectEquipment: (eq: Equipment) => void;
}

interface ComponentNode {
  id: string;
  name: string;
  tag: string;
  status: 'Fault' | 'Warning' | 'Normal';
  temp: string;
  manualSection: string;
  recommended: string;
  detail: string;
  partNumber?: string;
}

export const EquipmentView: React.FC<EquipmentViewProps> = ({
  currentEquipment,
  onSelectEquipment
}) => {
  const [selectedComponent, setSelectedComponent] = useState<ComponentNode | null>(null);
  const [showFullTelemetry, setShowFullTelemetry] = useState<boolean>(false);

  const components: ComponentNode[] = [
    {
      id: 'fan',
      name: 'Axial Cooling Fan Assembly',
      tag: 'FAN-01 (Part #VX-CF42)',
      status: 'Warning',
      temp: '68.2°C',
      manualSection: '§4.3 (Page 42)',
      recommended: 'Inspect cowl for particulate obstruction; replace impeller if resistance persists.',
      detail: 'Brushless 24V axial intake impeller providing positive differential air pressure across stator housing. Currently restricted at 1.2 L/min.',
      partNumber: 'VX-CF42 ($245.00)'
    },
    {
      id: 'motor',
      name: 'Primary 3-Phase AC Motor',
      tag: 'MTR-480 / 7.5kW',
      status: 'Fault',
      temp: '88.4°C',
      manualSection: '§4.3 (Page 42)',
      recommended: 'Verify thermal equilibrium after cooling path restoration and clearance.',
      detail: 'Continuous duty induction motor operating above the 75.0°C thermal overload trip threshold. Triggered E17 fault condition.',
      partNumber: 'MTR-480-IND'
    },
    {
      id: 'tb2',
      name: 'Terminal Block TB-2',
      tag: 'TB-480-3P',
      status: 'Normal',
      temp: '32.1°C',
      manualSection: '§3.2 (Page 28)',
      recommended: 'Verify screw torque at 2.8 Nm across all 3 phases (U, V, W).',
      detail: 'Main 3-phase harness termination. All phases balanced and firmly seated with no signs of thermal discoloration or contact pitting.'
    },
    {
      id: 'sensor',
      name: 'PT100 RTD Thermal Sensor',
      tag: 'SEN-RTD-01',
      status: 'Normal',
      temp: '88.4°C',
      manualSection: '§4.3 (Page 43)',
      recommended: 'Resistance calibration verified at 133.5Ω (normal for 88.4°C).',
      detail: 'Platinum RTD thermowell sensor providing calibrated stator temperature telemetry to the central SCADA PLC bus.'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#050816] p-6 sm:p-8 gap-7 overflow-y-auto max-w-[1600px] mx-auto w-full">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-5 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {currentEquipment.model} — High-Speed Packaging Unit
            </h1>
            <span className="text-xs font-mono font-bold text-slate-300 bg-white/[0.06] px-3 py-1 rounded-lg border border-white/[0.1]">
              S/N {currentEquipment.serialNumber}
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Assembly Plant 2 · {currentEquipment.line} · {currentEquipment.location}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#0B1020] p-1 rounded-xl border border-white/[0.1]">
            {DEMO_EQUIPMENT.map((eq) => (
              <button
                key={eq.id}
                onClick={() => onSelectEquipment(eq)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  currentEquipment.id === eq.id
                    ? 'bg-white/[0.12] text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {eq.model}
              </button>
            ))}
          </div>

          <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/15 border border-red-500/35 text-xs font-black text-red-400 font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            ATTENTION REQUIRED (E17)
          </span>
        </div>
      </div>

      {/* 4 Large Real-Time Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-3xl bg-[#0B1020] border border-white/[0.1] shadow-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>Stator Temperature</span>
            <Thermometer className="w-5 h-5 text-red-400" />
          </div>
          <div className="text-4xl font-black font-mono text-red-400">
            88.4 <span className="text-base font-sans font-bold text-slate-400">°C</span>
          </div>
          <span className="text-xs text-red-400/90 font-mono font-bold block pt-1 border-t border-white/[0.04]">
            Safe Limit &lt;= 75.0°C (OVERHEAD)
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-[#0B1020] border border-white/[0.1] shadow-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>Cooling Flow Rate</span>
            <Wind className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-4xl font-black font-mono text-amber-400">
            1.2 <span className="text-base font-sans font-bold text-slate-400">L/min</span>
          </div>
          <span className="text-xs text-amber-400/90 font-mono font-bold block pt-1 border-t border-white/[0.04]">
            Required &gt;= 3.8 L/min (RESTRICTED)
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-[#0B1020] border border-white/[0.1] shadow-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>Bearing Vibration</span>
            <Activity className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-4xl font-black font-mono text-white">
            4.8 <span className="text-base font-sans font-bold text-slate-400">mm/s</span>
          </div>
          <span className="text-xs text-emerald-400 font-mono font-bold block pt-1 border-t border-white/[0.04]">
            Nominal (ISO 10816 Zone B)
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-[#0B1020] border border-white/[0.1] shadow-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>3-Phase Bus Voltage</span>
            <Zap className="w-5 h-5 text-[#22D3EE]" />
          </div>
          <div className="text-4xl font-black font-mono text-white">
            480 <span className="text-base font-sans font-bold text-slate-400">V 3-Ph</span>
          </div>
          <span className="text-xs text-emerald-400 font-mono font-bold block pt-1 border-t border-white/[0.04]">
            Balanced Phase Bus (60 Hz)
          </span>
        </div>
      </div>

      {/* Equipment Digital Twin & Subsystem Nodes */}
      <div className="p-7 rounded-3xl bg-[#0B1020] border border-white/[0.1] space-y-6 shadow-2xl relative">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-[#22D3EE]" />
            <span className="text-base font-bold uppercase tracking-wider text-white">
              Interactive Component Digital Twin Map
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <span className="text-red-400 font-bold">E17 Hotspot</span>
            <span>→</span>
            <span className="text-amber-400 font-bold">Cooling Path</span>
            <span>→</span>
            <span className="text-[#22D3EE] font-bold">Part #VX-CF42</span>
          </div>
        </div>

        {/* 4 Interactive Subsystem Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {components.map((comp) => {
            const isFault = comp.status === 'Fault';
            const isWarning = comp.status === 'Warning';
            const isSelected = selectedComponent?.id === comp.id;

            return (
              <div
                key={comp.id}
                onClick={() => {
                  setSelectedComponent(comp);
                  soundEngine.playMicOn();
                }}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                  isFault
                    ? 'bg-[#180D14] border-red-500/50 hover:border-red-400 ring-2 ring-red-500/20 shadow-lg'
                    : isWarning
                      ? 'bg-[#18130D] border-amber-500/50 hover:border-amber-400 ring-2 ring-amber-500/20 shadow-lg'
                      : 'bg-[#111827] border-white/[0.1] hover:border-white/[0.25]'
                } ${isSelected ? 'ring-2 ring-[#22D3EE]' : ''}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                    isFault ? 'badge-red' : isWarning ? 'badge-amber' : 'badge-emerald'
                  }`}>
                    {comp.status}
                  </span>
                  <span className="text-sm font-mono font-bold text-slate-200">{comp.temp}</span>
                </div>

                <h3 className="font-bold text-base text-white">
                  {comp.name}
                </h3>
                <div className="text-xs text-slate-400 font-mono mt-1">
                  {comp.tag}
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-300">
                  <span className="font-bold text-[#22D3EE]">Inspect Diagnostic</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Component Detail Modal */}
      {selectedComponent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-[#0B1020] border border-white/[0.15] rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {selectedComponent.name}
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedComponent.tag}
                </span>
              </div>
              <button
                onClick={() => setSelectedComponent(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-sm">
              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-slate-400">Operational Status:</span>
                <span className={`font-bold ${selectedComponent.status === 'Fault' ? 'text-red-400' : selectedComponent.status === 'Warning' ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {selectedComponent.status}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-slate-400">Operating Temperature:</span>
                <span className="font-mono font-bold text-white">{selectedComponent.temp}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-slate-400">Service Manual Reference:</span>
                <span className="text-[#22D3EE] font-mono font-bold">{selectedComponent.manualSection}</span>
              </div>
              {selectedComponent.partNumber && (
                <div className="flex justify-between py-2 border-b border-white/[0.06]">
                  <span className="text-slate-400">Replacement Part:</span>
                  <span className="text-amber-400 font-mono font-bold">{selectedComponent.partNumber}</span>
                </div>
              )}
              <div>
                <span className="text-slate-400 block mb-1.5 font-medium">Recommended Maintenance Action:</span>
                <p className="text-slate-200 bg-[#111827] p-4 rounded-2xl leading-relaxed border border-white/[0.06]">
                  {selectedComponent.recommended}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedComponent(null)}
              className="w-full py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-xs font-bold text-white cursor-pointer"
            >
              Close Inspector
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

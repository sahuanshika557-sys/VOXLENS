import React, { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  ExternalLink, 
  X,
  Search,
  Sparkles,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { ManualCitation } from '../types';

interface KnowledgeViewProps {
  selectedCitation: ManualCitation | null;
  onSelectCitation: (cite: ManualCitation) => void;
}

export const KnowledgeView: React.FC<KnowledgeViewProps> = ({
  selectedCitation,
  onSelectCitation
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('sec-cooling');
  const [showFullManualModal, setShowFullManualModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const sections = [
    { 
      id: 'sec-safety', 
      title: '1. Safety & LOTO Isolation Protocols', 
      page: 6, 
      category: 'Safety Protocols',
      excerpt: 'Prior to servicing the motor terminal box or removing cooling cowls, disengage Main Switch SW-1 and execute Lockout/Tagout (LOTO). Verify zero energy state across all 3 phases.',
      matchScore: 84
    },
    { 
      id: 'sec-elec', 
      title: '2. Electrical Distribution (TB-2 Connections)', 
      page: 28, 
      category: 'Electrical',
      excerpt: 'Terminal Block TB-2 connects 480V 3-phase supply. Measure winding resistance across U-V, V-W, and W-U (nominal 1.42Ω ± 0.05Ω). Fasten terminal screw connections to 2.8 Nm.',
      matchScore: 78
    },
    { 
      id: 'sec-cooling', 
      title: '3. Motor & Cooling Diagnostics (E17 Fault Code)', 
      page: 42, 
      category: 'Diagnostics',
      match: '96%', 
      matchScore: 96,
      excerpt: 'Fault Code E17 (Motor Thermal Overload / Constrained Cooling Flow): Triggered when RTD sensor T1 detects stator temperature exceeding 75.0°C or airflow falls below 3.8 L/min differential. Technicians must inspect axial fan shroud for particulate binding and verify TB-2 wiring. If fan impeller drag persists, replace Fan Assembly (Part #VX-CF42).'
    },
    { 
      id: 'sec-maint', 
      title: '4. Mechanical Maintenance & Impeller Swap', 
      page: 54, 
      category: 'Mechanical',
      excerpt: 'To swap the axial cooling fan assembly (Part #VX-CF42): Remove four M5 cowl retention bolts. Disconnect quick-release 24V harness. Align replacement impeller arrow with airflow direction.',
      matchScore: 91
    },
    { 
      id: 'sec-torque', 
      title: '5. Torque Specifications & Reassembly Checklist', 
      page: 68, 
      category: 'Assembly',
      excerpt: 'M5 fan cowl mounting bolts: 4.5 Nm. Terminal Block TB-2 screw terminals: 2.8 Nm. Ground lug: 3.5 Nm. Stator casing perimeter bolts: 12.0 Nm in crisscross sequence.',
      matchScore: 82
    }
  ];

  const filteredSections = sections.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentSection = sections.find(s => s.id === activeSectionId) || sections[2];

  // Helper to highlight search query in text
  const highlightMatch = (text: string) => {
    if (!searchQuery.trim()) return text;
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === searchQuery.toLowerCase() ? (
            <mark key={i} className="bg-[#22D3EE]/30 text-[#22D3EE] px-1 rounded font-semibold">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#050816] p-6 sm:p-8 gap-7 overflow-y-auto max-w-[1600px] mx-auto w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-5 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Technical Knowledge Center
            </h1>
            <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/15 px-3 py-1 rounded-lg border border-purple-500/30">
              LOCAL DEMO KNOWLEDGE BASE
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Grounded OEM Service Manuals & Dense Vector RAG Evidence
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search manuals (e.g. E17, cooling fan, torque specs)..."
            className="bg-[#0B1020] border border-white/[0.1] rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#22D3EE] w-80 sm:w-96 transition-all shadow-inner"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 flex-1">
        {/* Left: Table of Contents */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="p-6 rounded-3xl bg-[#0B1020] border border-white/[0.1] space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold text-[#22D3EE] uppercase tracking-wider block font-mono">
                  OEM SERVICE MANUAL
                </span>
                <h3 className="font-extrabold text-base text-white mt-1">
                  VX-420 High-Speed Packaging Unit
                </h3>
              </div>
              <span className="text-xs text-slate-300 font-mono bg-white/[0.06] px-2.5 py-1 rounded-lg border border-white/[0.08]">
                Rev 4.2B
              </span>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/[0.08]">
              {filteredSections.map((sec) => {
                const isSelected = activeSectionId === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSectionId(sec.id)}
                    className={`w-full p-4 rounded-2xl text-left transition-all flex items-center justify-between text-sm cursor-pointer ${
                      isSelected
                        ? 'bg-[#111827] text-white font-bold border border-[#22D3EE]/40 shadow-md'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#22D3EE]' : 'text-slate-500'}`} />
                      <span className="truncate">{highlightMatch(sec.title)}</span>
                    </div>
                    {sec.matchScore >= 90 ? (
                      <span className="text-xs font-mono font-bold text-[#22D3EE] bg-[#22D3EE]/15 px-2.5 py-0.5 rounded-md shrink-0">
                        {sec.matchScore}% Match
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-slate-500 shrink-0">
                        p.{sec.page}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Selected Evidence Grounded Viewer */}
        <div className="lg:col-span-7 flex flex-col bg-[#0B1020] rounded-3xl border border-white/[0.1] p-7 space-y-6 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Grounded Technical Evidence
              </span>
              <h2 className="text-xl font-black text-white mt-1">
                {currentSection.title}
              </h2>
            </div>
            <span className="text-xs font-mono font-extrabold text-[#22D3EE] bg-[#22D3EE]/15 px-3 py-1.5 rounded-xl border border-[#22D3EE]/30">
              Section {currentSection.page > 40 ? '4.3' : '3.1'} · Page {currentSection.page} · {currentSection.matchScore}% Relevance
            </span>
          </div>

          {/* Highlighted Relevant Paragraph */}
          <div className="p-6 rounded-2xl bg-[#111827] border-l-4 border-[#22D3EE] space-y-2 shadow-inner">
            <span className="text-xs font-mono font-bold text-[#22D3EE] uppercase tracking-wider block">
              OEM MANUAL GROUNDED EXCERPT:
            </span>
            <p className="text-base text-slate-100 leading-relaxed font-sans font-normal">
              "{highlightMatch(currentSection.excerpt)}"
            </p>
          </div>

          {/* AI Context Card */}
          <div className="p-5 rounded-2xl bg-[#070B1A] border border-white/[0.08] space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wide flex items-center gap-2 font-mono">
              <Sparkles className="w-4 h-4" />
              AI AGENT DIAGNOSTIC RATIONALE
            </span>
            <p className="text-sm text-slate-300 leading-relaxed">
              Cooling airflow restriction below 3.8 L/min directly causes stator temperature to spike past 75.0°C into E17 fault trip. Inspecting the axial fan cowl and replacing Part #VX-CF42 ensures the unit operates safely within manufacturer specifications.
            </p>
          </div>

          {/* Mandatory LOTO Notice */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-200/90 leading-snug">
              <strong>Mandatory Safety Isolation:</strong> Disengage primary power feeder switch SW-1 prior to accessing terminal junctions or removing casing components.
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setShowFullManualModal(true)}
              className="btn-secondary py-3 px-6 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>View Full OEM Manual Document</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Full Manual Modal */}
      {showFullManualModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-3xl bg-[#0B1020] border border-white/[0.15] rounded-3xl p-7 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div>
                <h3 className="text-lg font-black text-white">
                  VX-420 High-Speed Packaging Unit — OEM Technical Manual
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  Full OEM Documentation · Rev 4.2B · VoxelTech Heavy Industries
                </span>
              </div>
              <button
                onClick={() => setShowFullManualModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-300 max-h-96 overflow-y-auto pr-2 leading-relaxed">
              <div className="p-4 rounded-2xl bg-[#111827]">
                <h4 className="font-bold text-white mb-1.5 text-base">4.3.1 Diagnostic Flowchart for E10-E29 Fault Codes</h4>
                <p>
                  For all thermal trip alerts, verify line power disconnect at SW-1 prior to touching the motor housing. Measure casing temperature at reference point RTD-1. Nominal operating band is 50°C - 72°C. Overload trip threshold is calibrated at 75.0°C.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#111827]">
                <h4 className="font-bold text-white mb-1.5 text-base">4.3.2 Airflow & Static Pressure Requirements</h4>
                <p>
                  The axial cooling fan (Part #VX-CF42) requires a minimum 12.0 mm H2O static pressure with &gt;= 3.8 L/min differential airflow. Measure intake flow with an anemometer at the cowl aperture. If particulate buildup is observed, clean shroud with dry compressed air. If bearing resistance is felt upon manual spin test, replace assembly.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#111827]">
                <h4 className="font-bold text-white mb-1.5 text-base">4.3.3 Reassembly & Fastener Torque Specifications</h4>
                <p>
                  Fasten fan cowl M5 mounting bolts to 4.5 Nm torque. Terminal Block TB-2 phase connections must be torqued to 2.8 Nm. Ground lug: 3.5 Nm. Stator casing perimeter bolts: 12.0 Nm in crisscross sequence.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowFullManualModal(false)}
              className="w-full py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-xs font-bold text-white cursor-pointer"
            >
              Close Manual Reader
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

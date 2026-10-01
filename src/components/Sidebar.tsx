import React from 'react';
import { 
  Radio, 
  Cpu, 
  BookOpen, 
  Wrench, 
  History, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  BarChart3, 
  Wifi,
  Battery
} from 'lucide-react';
import { NavigationTab, UserRole } from '../types';
import { LanguageCode, getTranslation } from '../i18n/translations';

interface SidebarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  currentRole: UserRole;
  pendingApprovalsCount: number;
  openTicketsCount: number;
  activeEquipmentName: string;
  currentLanguage?: LanguageCode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  pendingApprovalsCount,
  openTicketsCount,
  currentLanguage = 'en'
}) => {
  const t = getTranslation(currentLanguage);

  const navItems = [
    {
      id: 'live-repair' as NavigationTab,
      label: t.nav?.liveRepair || 'LIVE REPAIR',
      icon: Radio,
      badge: 'LIVE',
      badgeClass: 'text-emerald-400 bg-emerald-500/15 border border-emerald-500/30'
    },
    {
      id: 'equipment' as NavigationTab,
      label: t.nav?.equipment || 'EQUIPMENT TWIN',
      icon: Cpu
    },
    {
      id: 'knowledge' as NavigationTab,
      label: t.nav?.knowledge || 'TECHNICAL MANUALS',
      icon: BookOpen
    },
    {
      id: 'agent-actions' as NavigationTab,
      label: t.nav?.agentActions || 'AGENT ACTIONS',
      icon: Wrench
    },
    {
      id: 'session-memory' as NavigationTab,
      label: t.nav?.sessionMemory || 'SESSION MEMORY',
      icon: History
    },
    {
      id: 'tickets' as NavigationTab,
      label: t.nav?.tickets || 'TICKETS & PARTS',
      icon: FileText,
      badge: openTicketsCount > 0 ? `${openTicketsCount}` : undefined,
      badgeClass: 'text-amber-400 bg-amber-500/15 border border-amber-500/30 font-bold'
    },
    {
      id: 'supervisor' as NavigationTab,
      label: t.nav?.supervisor || 'SUPERVISOR CENTER',
      icon: ShieldCheck,
      badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount}` : undefined,
      badgeClass: 'text-amber-400 bg-amber-500/20 font-bold border border-amber-500/40'
    },
    {
      id: 'story' as NavigationTab,
      label: t.nav?.story || 'VOXLENS STORY',
      icon: Sparkles
    },
    {
      id: 'analytics' as NavigationTab,
      label: t.nav?.analytics || 'ANALYTICS',
      icon: BarChart3
    }
  ];

  return (
    <aside className="w-64 md:w-72 bg-[#02040A] border-r border-white/[0.08] flex flex-col justify-between shrink-0 select-none py-4">
      {/* Navigation Menu */}
      <div className="p-3.5 space-y-1.5 overflow-y-auto">
        <div className="px-3.5 py-2 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
          COMMAND MODULES
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#08111F] text-white font-bold border border-white/[0.12] shadow-lg shadow-[#00E5FF]/5'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#00E5FF]' : 'text-slate-400'}`} />
                <span className="text-sm font-medium tracking-wide truncate">
                  {item.label}
                </span>
              </div>
              {item.badge && (
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md font-bold shrink-0 ${item.badgeClass || 'bg-white/[0.08] text-slate-400'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Technician & Device Status */}
      <div className="p-4 mx-4 mb-2 rounded-2xl border border-white/[0.08] bg-[#050914]">
        <div className="flex items-center gap-3 mb-2.5">
          <div className="w-9 h-9 rounded-xl bg-slate-800 border border-white/[0.12] flex items-center justify-center text-xs font-black text-slate-200 shadow-sm">
            AR
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-slate-100 truncate">
              Alex Rivera
            </div>
            <div className="text-[11px] text-slate-400 truncate font-mono">
              Senior Field Tech III
            </div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="Connected" />
        </div>

        <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.06] text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            <span>5G Edge (Local)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Battery className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>94%</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

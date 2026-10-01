import React from 'react';
import { AlertTriangle, Clock, BookOpen, Smartphone, Wrench, PhoneCall } from 'lucide-react';

export const FieldFrictionScene: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl mx-auto px-6 animate-fadeIn">
      {/* Scene Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold tracking-wider uppercase mb-4">
        <AlertTriangle className="w-3.5 h-3.5" />
        <span>THE FIELD SERVICE BOTTLENECK</span>
      </div>

      {/* Main Headline */}
      <h2 className="text-3xl sm:text-5xl font-extrabold text-white text-center leading-tight mb-4 tracking-tight">
        WHEN YOUR HANDS ARE BUSY,<br />
        <span className="text-red-400">SEARCHING IS SLOW.</span>
      </h2>

      <p className="text-base sm:text-xl text-slate-300 text-center max-w-3xl mb-8 leading-relaxed">
        Field technicians need precise diagnostic answers while standing in front of vibrating, high-voltage machinery.
      </p>

      {/* Friction Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full my-4">
        {/* Pain Point 1 */}
        <div className="p-6 rounded-2xl bg-[#0B1020] border border-red-500/20 flex flex-col gap-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-bl-full pointer-events-none" />
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-lg font-bold text-white mb-1">500+ Page PDF Manuals</div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Searching for error codes like E17 across dense, unsearchable OEM service schematics while wearing safety gloves.
            </p>
          </div>
          <div className="text-xs font-mono font-bold text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg w-fit border border-red-500/20">
            ~15-20 Min Search Time
          </div>
        </div>

        {/* Pain Point 2 */}
        <div className="p-6 rounded-2xl bg-[#0B1020] border border-red-500/20 flex flex-col gap-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-bl-full pointer-events-none" />
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <div className="text-lg font-bold text-white mb-1">Supervisor Phone Tag</div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Explaining complicated wiring states over noisy cellular calls while trying to hold tools and flashlight.
            </p>
          </div>
          <div className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-lg w-fit border border-amber-500/20">
            ~10-15 Min Hold Time
          </div>
        </div>

        {/* Pain Point 3 */}
        <div className="p-6 rounded-2xl bg-[#0B1020] border border-red-500/20 flex flex-col gap-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-bl-full pointer-events-none" />
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <div className="text-lg font-bold text-white mb-1">Manual Inventory & ERP</div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Walking back to the office terminal to check replacement part stock and manually typing ticket descriptions.
            </p>
          </div>
          <div className="text-xs font-mono font-bold text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg w-fit border border-red-500/20">
            ~15 Min CMMS Overhead
          </div>
        </div>
      </div>

      {/* Summary Impact Bar */}
      <div className="w-full max-w-3xl mt-4 px-6 py-4 rounded-2xl bg-red-950/20 border border-red-500/30 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-red-400 animate-pulse" />
          <span className="text-sm font-semibold text-slate-200">
            Typical Unassisted Incident Duration:
          </span>
        </div>
        <div className="text-xl font-extrabold text-red-400 font-mono tracking-wider">
          45+ MINUTES DOWNTIME
        </div>
      </div>
    </div>
  );
};

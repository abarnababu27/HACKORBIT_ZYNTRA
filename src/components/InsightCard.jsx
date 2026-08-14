import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight, CheckCircle2, AlertTriangle, AlertOctagon, Info, Sparkles } from 'lucide-react';

export default function InsightCard({ insight }) {
  const [expanded, setExpanded] = useState(true);

  const iconMap = {
    critical: { icon: AlertOctagon, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/30' },
    warning: { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
    success: { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
    info: { icon: Info, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' }
  };

  const current = iconMap[insight.type] || iconMap.info;
  const IconComp = current.icon;

  return (
    <div className={`rounded-2xl border ${current.bg} bg-gray-900/90 overflow-hidden transition-all duration-200`}>
      {/* Header Bar */}
      <div 
        onClick={() => setExpanded(!expanded)}
        className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-gray-800/40"
      >
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-xl ${current.bg} shrink-0 mt-0.5`}>
            <IconComp className={`w-5 h-5 ${current.color}`} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700">
                {insight.category}
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${current.bg} ${current.color}`}>
                {insight.type}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">{insight.title}</h3>
          </div>
        </div>

        <button className="text-gray-400 hover:text-white p-1">
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Expanded Details: DATA -> ANALYSIS -> INSIGHT -> ACTION */}
      {expanded && (
        <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-gray-800/60 space-y-3.5">
          {/* DATA */}
          <div className="p-3 rounded-xl bg-gray-950/70 border border-gray-800 text-xs">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-[11px] uppercase tracking-wider mb-1">
              <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">1. DATA</span>
              <span>Observed Metrics</span>
            </div>
            <p className="text-gray-300 leading-relaxed font-mono">{insight.data}</p>
          </div>

          {/* ANALYSIS */}
          <div className="p-3 rounded-xl bg-gray-950/70 border border-gray-800 text-xs">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-[11px] uppercase tracking-wider mb-1">
              <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">2. ANALYSIS</span>
              <span>Underlying Pattern</span>
            </div>
            <p className="text-gray-300 leading-relaxed">{insight.analysis}</p>
          </div>

          {/* INSIGHT */}
          <div className="p-3 rounded-xl bg-gray-950/70 border border-gray-800 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-[11px] uppercase tracking-wider mb-1">
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">3. INSIGHT</span>
              <span>Strategic Diagnosis</span>
            </div>
            <p className="text-gray-200 font-medium leading-relaxed">{insight.insight}</p>
          </div>

          {/* ACTION */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border border-emerald-500/30 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-[11px] uppercase tracking-wider mb-1.5">
              <span className="px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-200 font-mono flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> 4. ACTION
              </span>
              <span>Recommended Intervention</span>
            </div>
            <p className="text-emerald-100 font-semibold leading-relaxed flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{insight.action}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

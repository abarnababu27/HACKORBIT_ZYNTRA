import React from 'react';

export default function KpiCard({ title, value, subtext, icon: Icon, color = 'blue', badgeText, onClick }) {
  const colorMap = {
    blue: {
      border: 'border-blue-500/20',
      iconBg: 'bg-blue-500/10 text-blue-400',
      text: 'text-blue-400',
      glow: 'group-hover:border-blue-500/40'
    },
    emerald: {
      border: 'border-emerald-500/20',
      iconBg: 'bg-emerald-500/10 text-emerald-400',
      text: 'text-emerald-400',
      glow: 'group-hover:border-emerald-500/40'
    },
    amber: {
      border: 'border-amber-500/20',
      iconBg: 'bg-amber-500/10 text-amber-400',
      text: 'text-amber-400',
      glow: 'group-hover:border-amber-500/40'
    },
    purple: {
      border: 'border-purple-500/20',
      iconBg: 'bg-purple-500/10 text-purple-400',
      text: 'text-purple-400',
      glow: 'group-hover:border-purple-500/40'
    },
    rose: {
      border: 'border-rose-500/20',
      iconBg: 'bg-rose-500/10 text-rose-400',
      text: 'text-rose-400',
      glow: 'group-hover:border-rose-500/40'
    }
  };

  const style = colorMap[color] || colorMap.blue;

  return (
    <div 
      onClick={onClick}
      className={`group relative p-5 rounded-2xl glass-card border ${style.border} ${style.glow} transition-all duration-300 ${onClick ? 'cursor-pointer hover:-translate-y-1' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold text-white font-mono mt-1 tracking-tight">{value}</h3>
          {subtext && <p className="text-xs text-gray-400 mt-1.5">{subtext}</p>}
        </div>
        <div className={`p-3 rounded-xl ${style.iconBg}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      {badgeText && (
        <div className="mt-3 pt-2.5 border-t border-gray-800/80 flex items-center justify-between">
          <span className={`text-[11px] font-semibold ${style.text}`}>{badgeText}</span>
        </div>
      )}
    </div>
  );
}

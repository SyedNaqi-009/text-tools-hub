import React from 'react';

export interface StatItem {
  label: string;
  value: string | number;
  sublabel?: string;
}

export function StatsDisplay({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-4 rounded-2xl bg-slate-900 text-white shadow-xs">
      {stats.map((stat, index) => (
        <div key={index} className="flex flex-col p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[11px] font-mono text-slate-400 font-medium truncate uppercase tracking-wider">
            {stat.label}
          </span>
          <span className="text-xl sm:text-2xl font-black text-indigo-300 mt-0.5 font-mono-code tracking-tight">
            {stat.value}
          </span>
          {stat.sublabel && (
            <span className="text-[10px] text-slate-500 font-mono mt-0.5 truncate">
              {stat.sublabel}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

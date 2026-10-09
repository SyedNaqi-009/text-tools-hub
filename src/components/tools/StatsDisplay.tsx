import React from 'react';

export interface StatItem {
  label: string;
  value: string | number;
  sublabel?: string;
}

export function StatsDisplay({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
      {stats.map((stat, index) => (
        <div key={index} className="flex flex-col">
          <span className="text-xs text-slate-500 font-medium">
            {stat.label}
          </span>
          <span className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5 font-mono-code">
            {stat.value}
          </span>
          {stat.sublabel && (
            <span className="text-[10px] text-slate-400">
              {stat.sublabel}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

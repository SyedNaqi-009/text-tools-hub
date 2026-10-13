'use client';

import React, { useState, useMemo } from 'react';
import { TextInput } from '@/components/tools/TextInput';
import { StatsDisplay, StatItem } from '@/components/tools/StatsDisplay';
import { calculateCharacterStats, PLATFORM_LIMITS } from '@/lib/text-utils/character-counter';
import { Gauge } from 'lucide-react';

export function CharacterCounterTool() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    return calculateCharacterStats(text);
  }, [text]);

  const statItems: StatItem[] = [
    { label: 'Total Characters', value: stats.totalCharacters.toLocaleString(), sublabel: 'With spaces' },
    { label: 'No Spaces', value: stats.charactersWithoutSpaces.toLocaleString(), sublabel: 'Letters & numbers' },
    { label: 'No Newlines', value: stats.charactersWithoutNewlines.toLocaleString() },
    { label: 'Total Words', value: stats.totalWords.toLocaleString() },
    { label: 'Total Lines', value: stats.totalLines.toLocaleString() },
  ];

  return (
    <div className="space-y-6">
      {/* Primary Statistics */}
      <StatsDisplay stats={statItems} />

      {/* Main input area */}
      <TextInput
        value={text}
        onChange={setText}
        placeholder="Type or paste your post, tweet, or meta snippet here to evaluate character limits..."
        label="Enter Your Text"
        minHeight="min-h-[220px]"
        showStats={false}
      />

      {/* Social Media & SEO Limit Meters */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-slate-950 text-indigo-400 flex items-center justify-center">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Publishing & Platform Character Thresholds
            </h3>
            <p className="text-xs text-slate-500">Live meters against search and social channel limits</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PLATFORM_LIMITS.map((platform) => {
            const current = stats.totalCharacters;
            const limit = platform.limit;
            const percentage = Math.min(Math.round((current / limit) * 100), 100);
            const remaining = limit - current;
            const isOver = current > limit;
            const isNear = percentage >= 80 && !isOver;

            let colorClass = 'bg-indigo-600';
            let badgeBg = 'bg-indigo-50 text-indigo-700 border-indigo-200';
            if (isOver) {
              colorClass = 'bg-rose-500';
              badgeBg = 'bg-rose-50 text-rose-700 border-rose-200';
            } else if (isNear) {
              colorClass = 'bg-amber-500';
              badgeBg = 'bg-amber-50 text-amber-800 border-amber-200';
            }

            return (
              <div
                key={platform.name}
                className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900">
                      {platform.name}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${badgeBg}`}>
                      {isOver ? `+${current - limit} over` : `${remaining} left`}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 font-mono mb-2">
                    <span>{current} / {limit}</span>
                    <span className="font-semibold text-slate-700">{percentage}%</span>
                  </div>
                </div>

                {/* Progress track */}
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-200 ${colorClass}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

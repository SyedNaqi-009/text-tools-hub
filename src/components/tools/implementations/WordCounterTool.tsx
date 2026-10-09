'use client';

import React, { useState, useMemo } from 'react';
import { TextInput } from '@/components/tools/TextInput';
import { StatsDisplay, StatItem } from '@/components/tools/StatsDisplay';
import { calculateWordCounterStats } from '@/lib/text-utils/word-counter';
import { Sliders } from 'lucide-react';

export function WordCounterTool() {
  const [text, setText] = useState('');
  const [readingWpm, setReadingWpm] = useState(238);
  const [speakingWpm, setSpeakingWpm] = useState(150);
  const [showSettings, setShowSettings] = useState(false);

  const stats = useMemo(() => {
    return calculateWordCounterStats(text, readingWpm, speakingWpm);
  }, [text, readingWpm, speakingWpm]);

  const statItems: StatItem[] = [
    { label: 'Words', value: stats.words.toLocaleString() },
    { label: 'Characters', value: stats.charactersWithSpaces.toLocaleString(), sublabel: 'With spaces' },
    { label: 'Characters', value: stats.charactersWithoutSpaces.toLocaleString(), sublabel: 'No spaces' },
    { label: 'Sentences', value: stats.sentences.toLocaleString() },
    { label: 'Paragraphs', value: stats.paragraphs.toLocaleString() },
    { label: 'Lines', value: stats.lines.toLocaleString() },
  ];

  return (
    <div className="space-y-6">
      {/* Primary Statistics Display */}
      <StatsDisplay stats={statItems} />

      {/* Reading and Speaking Time Callouts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              Estimated Silent Reading Time
            </span>
            <div className="text-2xl font-extrabold text-emerald-950 font-mono-code mt-0.5">
              {stats.readingTimeMinutes}m {stats.readingTimeSeconds}s
            </div>
            <span className="text-xs text-emerald-700/80">
              Based on {readingWpm} WPM speed
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
              Estimated Speaking Presentation Time
            </span>
            <div className="text-2xl font-extrabold text-amber-950 font-mono-code mt-0.5">
              {stats.speakingTimeMinutes}m {stats.speakingTimeSeconds}s
            </div>
            <span className="text-xs text-amber-700/80">
              Based on {speakingWpm} WPM speed
            </span>
          </div>
        </div>
      </div>

      {/* Toggle Settings */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center space-x-1.5 text-xs font-medium text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{showSettings ? 'Hide WPM Speeds' : 'Adjust WPM Reading Speeds'}</span>
        </button>
      </div>

      {showSettings && (
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Silent Reading Speed: <span className="font-mono-code text-emerald-700">{readingWpm} WPM</span>
            </label>
            <input
              type="range"
              min="100"
              max="400"
              step="10"
              value={readingWpm}
              onChange={(e) => setReadingWpm(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Speaking Pace: <span className="font-mono-code text-emerald-700">{speakingWpm} WPM</span>
            </label>
            <input
              type="range"
              min="80"
              max="250"
              step="10"
              value={speakingWpm}
              onChange={(e) => setSpeakingWpm(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Main input area */}
      <TextInput
        value={text}
        onChange={setText}
        placeholder="Type or paste your text here to count words, characters, sentences, paragraphs, and reading duration in real time..."
        label="Enter Your Text"
        minHeight="min-h-[260px]"
        showStats={false}
      />
    </div>
  );
}

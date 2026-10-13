'use client';

import React, { useState, useMemo } from 'react';
import { TextInput } from '@/components/tools/TextInput';
import { StatsDisplay, StatItem } from '@/components/tools/StatsDisplay';
import { calculateWordCounterStats } from '@/lib/text-utils/word-counter';
import { Sliders, BookOpen, Mic } from 'lucide-react';

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
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 text-indigo-600 mb-1">
              <BookOpen className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Estimated Reading Time
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-mono tracking-tight mt-0.5">
              {stats.readingTimeMinutes}m {stats.readingTimeSeconds}s
            </div>
            <span className="text-xs text-slate-500">
              Calibrated to {readingWpm} WPM adult silent pace
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 text-sky-600 mb-1">
              <Mic className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Speaking Presentation Time
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-mono tracking-tight mt-0.5">
              {stats.speakingTimeMinutes}m {stats.speakingTimeSeconds}s
            </div>
            <span className="text-xs text-slate-500">
              Calibrated to {speakingWpm} WPM podium keynote pace
            </span>
          </div>
        </div>
      </div>

      {/* Toggle Settings */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{showSettings ? 'Hide WPM Calibration' : 'Calibrate WPM Reading Speeds'}</span>
        </button>
      </div>

      {showSettings && (
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Silent Reading Pace
              </label>
              <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                {readingWpm} WPM
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="400"
              step="10"
              value={readingWpm}
              onChange={(e) => setReadingWpm(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Public Speaking Pace
              </label>
              <span className="font-mono text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                {speakingWpm} WPM
              </span>
            </div>
            <input
              type="range"
              min="80"
              max="250"
              step="10"
              value={speakingWpm}
              onChange={(e) => setSpeakingWpm(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
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

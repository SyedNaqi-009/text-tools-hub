'use client';

import React, { useState, useMemo } from 'react';
import { TextInput } from '@/components/tools/TextInput';
import { StatsDisplay, StatItem } from '@/components/tools/StatsDisplay';
import { calculateReadingTime } from '@/lib/text-utils/reading-time';
import { Clock, Mic, Sliders } from 'lucide-react';

export function ReadingTimeCalculatorTool() {
  const [text, setText] = useState('');
  const [readingWpm, setReadingWpm] = useState(238);
  const [speakingWpm, setSpeakingWpm] = useState(150);

  const result = useMemo(() => {
    return calculateReadingTime(text, readingWpm, speakingWpm);
  }, [text, readingWpm, speakingWpm]);

  const stats: StatItem[] = [
    { label: 'Words', value: result.words.toLocaleString() },
    { label: 'Characters', value: result.characters.toLocaleString() },
    { label: 'Sentences', value: result.sentences.toLocaleString() },
    { label: 'Paragraphs', value: result.paragraphs.toLocaleString() },
    { label: 'Reading WPM', value: `${readingWpm} wpm` },
    { label: 'Speaking WPM', value: `${speakingWpm} wpm` },
  ];

  return (
    <div className="space-y-6">
      {/* Timing Display Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md">
          <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
            <Clock className="w-4 h-4" />
            <span>Silent Reading Time</span>
          </div>
          <div className="text-4xl sm:text-5xl font-black text-slate-950 font-mono tracking-tight">
            {result.readingMinutes}m {result.readingSeconds}s
          </div>
          <p className="mt-2 text-xs text-slate-500 leading-relaxed">
            Standard silent reading speed for average adult readers ({readingWpm} WPM).
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md">
          <div className="flex items-center space-x-2 text-sky-600 text-xs font-bold uppercase tracking-wider mb-2">
            <Mic className="w-4 h-4" />
            <span>Spoken Presentation Time</span>
          </div>
          <div className="text-4xl sm:text-5xl font-black text-slate-950 font-mono tracking-tight">
            {result.speakingMinutes}m {result.speakingSeconds}s
          </div>
          <p className="mt-2 text-xs text-slate-500 leading-relaxed">
            Standard oral keynote and podcast script pacing ({speakingWpm} WPM).
          </p>
        </div>
      </div>

      {/* Speed Sliders */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
          <Sliders className="w-4 h-4 text-indigo-600" />
          <span>Calibrate Reading & Speaking Pacing</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span>Silent Reading Pace:</span>
              <span className="font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">{readingWpm} WPM</span>
            </div>
            <input
              type="range"
              min="100"
              max="400"
              step="5"
              value={readingWpm}
              onChange={(e) => setReadingWpm(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>100 WPM (Technical Study)</span>
              <span>400 WPM (Skimming)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span>Speech & Presentation Pace:</span>
              <span className="font-mono text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">{speakingWpm} WPM</span>
            </div>
            <input
              type="range"
              min="80"
              max="220"
              step="5"
              value={speakingWpm}
              onChange={(e) => setSpeakingWpm(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>80 WPM (Keynote / Deliberate)</span>
              <span>220 WPM (Fast Pacing)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <StatsDisplay stats={stats} />

      {/* Main input area */}
      <TextInput
        value={text}
        onChange={setText}
        placeholder="Paste your speech, article, or video script here to calculate reading and presentation timing..."
        label="Input Script / Document"
        minHeight="min-h-[200px]"
        showStats={false}
      />
    </div>
  );
}

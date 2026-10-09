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
      {/* Prominent Large Timing Display Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200">
          <div className="flex items-center space-x-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Clock className="w-4 h-4" />
            <span>Silent Reading Time</span>
          </div>
          <div className="text-4xl sm:text-5xl font-black text-emerald-950 font-mono-code">
            {result.readingMinutes}m {result.readingSeconds}s
          </div>
          <p className="mt-2 text-xs text-emerald-800 leading-relaxed">
            Standard silent reading speed for average adult readers ({readingWpm} WPM).
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200">
          <div className="flex items-center space-x-2 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Mic className="w-4 h-4" />
            <span>Spoken Speech / Presentation Time</span>
          </div>
          <div className="text-4xl sm:text-5xl font-black text-amber-950 font-mono-code">
            {result.speakingMinutes}m {result.speakingSeconds}s
          </div>
          <p className="mt-2 text-xs text-amber-800 leading-relaxed">
            Standard oral presentation and podcast script pacing ({speakingWpm} WPM).
          </p>
        </div>
      </div>

      {/* Speed Sliders */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
          <Sliders className="w-4 h-4 text-emerald-600" />
          <span>Adjust Reading & Speaking Speeds</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Silent Reading Pace:</span>
              <span className="font-mono-code text-emerald-700 font-bold">{readingWpm} WPM</span>
            </div>
            <input
              type="range"
              min="100"
              max="400"
              step="5"
              value={readingWpm}
              onChange={(e) => setReadingWpm(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>100 WPM (Slow / Technical)</span>
              <span>400 WPM (Skimming)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Speaking / Presentation Pace:</span>
              <span className="font-mono-code text-amber-700 font-bold">{speakingWpm} WPM</span>
            </div>
            <input
              type="range"
              min="80"
              max="220"
              step="5"
              value={speakingWpm}
              onChange={(e) => setSpeakingWpm(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>80 WPM (Deliberate)</span>
              <span>220 WPM (Rapid)</span>
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

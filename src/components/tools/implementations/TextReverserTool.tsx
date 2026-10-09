'use client';

import React, { useState } from 'react';
import { TextInput } from '@/components/tools/TextInput';
import { TextOutput } from '@/components/tools/TextOutput';
import { reverseText, ReverseMode } from '@/lib/text-utils/text-reverser';

export function TextReverserTool() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<ReverseMode>('characters');

  const output = reverseText(input, mode);

  return (
    <div className="space-y-6">
      <TextInput
        value={input}
        onChange={setInput}
        placeholder="Type or paste text to invert characters, words, or lines..."
        label="Input Text"
        minHeight="min-h-[160px]"
      />

      {/* Mode selection buttons */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Reversal Mode:
        </span>
        <div className="flex items-center space-x-2 text-xs">
          <button
            type="button"
            onClick={() => setMode('characters')}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              mode === 'characters'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Reverse Characters
          </button>
          <button
            type="button"
            onClick={() => setMode('words')}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              mode === 'words'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Reverse Words
          </button>
          <button
            type="button"
            onClick={() => setMode('lines')}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              mode === 'lines'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Reverse Lines
          </button>
        </div>
      </div>

      <TextOutput
        value={output}
        label="Reversed Output"
        placeholder="Reversed text will appear here automatically..."
        minHeight="min-h-[160px]"
        filename="reversed-text.txt"
      />
    </div>
  );
}

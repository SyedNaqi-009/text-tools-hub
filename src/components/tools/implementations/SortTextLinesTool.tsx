'use client';

import React, { useState } from 'react';
import { TextInput } from '@/components/tools/TextInput';
import { TextOutput } from '@/components/tools/TextOutput';
import { sortTextLines, SortMode } from '@/lib/text-utils/sort-lines';

const SORT_OPTIONS: { mode: SortMode; label: string }[] = [
  { mode: 'alphabetical-asc', label: 'Alphabetical (A → Z)' },
  { mode: 'alphabetical-desc', label: 'Alphabetical (Z → A)' },
  { mode: 'numeric-asc', label: 'Numeric (1 → 9)' },
  { mode: 'numeric-desc', label: 'Numeric (9 → 1)' },
  { mode: 'length-asc', label: 'Length (Shortest First)' },
  { mode: 'length-desc', label: 'Length (Longest First)' },
  { mode: 'shuffle', label: 'Random Shuffle' },
];

export function SortTextLinesTool() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<SortMode>('alphabetical-asc');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [trimLines, setTrimLines] = useState(false);
  const [ignoreEmptyLines, setIgnoreEmptyLines] = useState(true);

  const output = sortTextLines(input, {
    mode,
    caseSensitive,
    removeDuplicates,
    trimLines,
    ignoreEmptyLines,
  });

  return (
    <div className="space-y-6">
      <TextInput
        value={input}
        onChange={setInput}
        placeholder="Paste lines to sort (names, numbers, items, or inventory)..."
        label="Input Lines"
        minHeight="min-h-[160px]"
      />

      {/* Sorting Modes & Settings */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4 text-xs">
        <div>
          <span className="font-bold text-slate-700 uppercase tracking-wider block mb-2">
            Sort Mode:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.mode}
                type="button"
                onClick={() => setMode(opt.mode)}
                className={`py-2 px-3 rounded-lg font-bold text-left transition-all ${
                  mode === opt.mode
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-200">
          <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={removeDuplicates}
              onChange={(e) => setRemoveDuplicates(e.target.checked)}
              className="rounded accent-emerald-600"
            />
            <span>Remove Duplicates While Sorting</span>
          </label>

          <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="rounded accent-emerald-600"
            />
            <span>Case Sensitive</span>
          </label>

          <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={trimLines}
              onChange={(e) => setTrimLines(e.target.checked)}
              className="rounded accent-emerald-600"
            />
            <span>Trim Lines</span>
          </label>

          <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={ignoreEmptyLines}
              onChange={(e) => setIgnoreEmptyLines(e.target.checked)}
              className="rounded accent-emerald-600"
            />
            <span>Ignore Empty Lines</span>
          </label>
        </div>
      </div>

      <TextOutput
        value={output}
        label="Sorted Output"
        minHeight="min-h-[160px]"
        filename="sorted-lines.txt"
      />
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { TextInput } from '@/components/tools/TextInput';
import { TextOutput } from '@/components/tools/TextOutput';
import { removeDuplicateLines } from '@/lib/text-utils/duplicate-remover';
import { Filter, Layers, CheckCircle2 } from 'lucide-react';

export function RemoveDuplicateLinesTool() {
  const [input, setInput] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [trimWhitespace, setTrimWhitespace] = useState(false);

  const result = removeDuplicateLines(input, {
    caseSensitive,
    trimWhitespace,
  });

  return (
    <div className="space-y-6">
      <TextInput
        value={input}
        onChange={setInput}
        placeholder="Paste your list or multiline items here to remove redundant duplicate lines..."
        label="Raw Input List"
        minHeight="min-h-[160px]"
      />

      {/* Options & Stats Bar */}
      <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center space-x-2.5 font-bold text-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="w-4 h-4 rounded accent-indigo-600"
            />
            <span>Case Sensitive Matching</span>
          </label>

          <label className="flex items-center space-x-2.5 font-bold text-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={trimWhitespace}
              onChange={(e) => setTrimWhitespace(e.target.checked)}
              className="w-4 h-4 rounded accent-indigo-600"
            />
            <span>Trim Edge Spaces Before Comparing</span>
          </label>
        </div>

        <div className="flex items-center space-x-4 font-mono font-bold text-xs">
          <span className="bg-rose-50 text-rose-700 px-3 py-1.5 rounded-xl border border-rose-200">
            Purged: {result.removedDuplicates} duplicates
          </span>
          <span className="bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200">
            Retained: {result.uniqueLines} unique lines
          </span>
        </div>
      </div>

      <TextOutput
        value={result.text}
        label="Deduplicated Clean List"
        placeholder="Deduplicated list preserving first-occurrence order will appear here..."
        minHeight="min-h-[160px]"
        filename="deduplicated-list.txt"
      />
    </div>
  );
}

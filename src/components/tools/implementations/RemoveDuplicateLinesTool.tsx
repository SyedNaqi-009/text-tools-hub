'use client';

import React, { useState } from 'react';
import { TextInput } from '@/components/tools/TextInput';
import { TextOutput } from '@/components/tools/TextOutput';
import { removeDuplicateLines } from '@/lib/text-utils/duplicate-remover';

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
        label="Original List"
        minHeight="min-h-[160px]"
      />

      {/* Options & Stats Bar */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4">
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
              checked={trimWhitespace}
              onChange={(e) => setTrimWhitespace(e.target.checked)}
              className="rounded accent-emerald-600"
            />
            <span>Trim Whitespace Before Comparing</span>
          </label>
        </div>

        <div className="flex items-center space-x-3 text-xs font-semibold">
          <span className="text-rose-600">
            Removed: {result.removedDuplicates} duplicates
          </span>
          <span className="text-emerald-700">
            Retained: {result.uniqueLines} unique lines
          </span>
        </div>
      </div>

      <TextOutput
        value={result.text}
        label="Deduplicated List"
        placeholder="Deduplicated list preserving first-occurrence order will appear here..."
        minHeight="min-h-[160px]"
        filename="deduplicated-list.txt"
      />
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { TextInput } from '@/components/tools/TextInput';
import { TextOutput } from '@/components/tools/TextOutput';
import { cleanSpaces } from '@/lib/text-utils/text-cleaner';

export function RemoveExtraSpacesTool() {
  const [input, setInput] = useState('');
  const [removeLeading, setRemoveLeading] = useState(true);
  const [removeTrailing, setRemoveTrailing] = useState(true);
  const [collapseMultiple, setCollapseMultiple] = useState(true);
  const [removeAll, setRemoveAll] = useState(false);
  const [convertTabsToSpaces, setConvertTabsToSpaces] = useState(false);
  const [tabWidth, setTabWidth] = useState(4);

  const output = cleanSpaces(input, {
    removeLeading,
    removeTrailing,
    collapseMultiple,
    removeAll,
    convertTabsToSpaces,
    tabWidth,
  });

  return (
    <div className="space-y-6">
      <TextInput
        value={input}
        onChange={setInput}
        placeholder="Paste text with messy spacing, extra tabs, or margin gaps..."
        label="Original Text"
        minHeight="min-h-[160px]"
      />

      {/* Options Panel */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
        <span className="font-bold text-slate-700 uppercase tracking-wider block">
          Space Cleaning Options
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={collapseMultiple}
              disabled={removeAll}
              onChange={(e) => setCollapseMultiple(e.target.checked)}
              className="rounded accent-indigo-600"
            />
            <span>Collapse Multiple Spaces to Single</span>
          </label>

          <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={removeLeading}
              disabled={removeAll}
              onChange={(e) => setRemoveLeading(e.target.checked)}
              className="rounded accent-indigo-600"
            />
            <span>Remove Leading Whitespace</span>
          </label>

          <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={removeTrailing}
              disabled={removeAll}
              onChange={(e) => setRemoveTrailing(e.target.checked)}
              className="rounded accent-indigo-600"
            />
            <span>Remove Trailing Whitespace</span>
          </label>

          <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={removeAll}
              onChange={(e) => setRemoveAll(e.target.checked)}
              className="rounded accent-indigo-600"
            />
            <span className="text-rose-700 font-bold">Remove ALL Spaces Entirely</span>
          </label>

          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={convertTabsToSpaces}
                onChange={(e) => setConvertTabsToSpaces(e.target.checked)}
                className="rounded accent-indigo-600"
              />
              <span>Convert Tabs to Spaces</span>
            </label>
            {convertTabsToSpaces && (
              <select
                value={tabWidth}
                onChange={(e) => setTabWidth(Number(e.target.value))}
                className="px-2 py-0.5 bg-white border border-slate-300 rounded text-slate-700"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value={8}>8 spaces</option>
              </select>
            )}
          </div>
        </div>
      </div>

      <TextOutput
        value={output}
        label="Cleaned Text"
        minHeight="min-h-[160px]"
        filename="cleaned-text.txt"
      />
    </div>
  );
}

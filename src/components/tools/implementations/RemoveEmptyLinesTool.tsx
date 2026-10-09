'use client';

import React, { useState } from 'react';
import { TextInput } from '@/components/tools/TextInput';
import { TextOutput } from '@/components/tools/TextOutput';
import { removeEmptyLines } from '@/lib/text-utils/remove-lines';

export function RemoveEmptyLinesTool() {
  const [input, setInput] = useState('');
  const [removeEmptyLinesOption, setRemoveEmptyLinesOption] = useState(true);
  const [removeWhitespaceOnly, setRemoveWhitespaceOnly] = useState(true);
  const [trimEachLine, setTrimEachLine] = useState(false);
  const [collapseMultipleEmpty, setCollapseMultipleEmpty] = useState(false);

  const { output, removedCount } = removeEmptyLines(input, {
    removeEmptyLines: removeEmptyLinesOption,
    removeWhitespaceOnlyLines: removeWhitespaceOnly,
    trimEachLine,
    collapseMultipleEmpty,
  });

  return (
    <div className="space-y-6">
      <TextInput
        value={input}
        onChange={setInput}
        placeholder="Paste text with excessive blank gaps or empty lines..."
        label="Input Text"
        minHeight="min-h-[160px]"
      />

      {/* Options Panel */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={removeEmptyLinesOption}
              onChange={(e) => setRemoveEmptyLinesOption(e.target.checked)}
              className="rounded accent-emerald-600"
            />
            <span>Remove Completely Empty Lines</span>
          </label>

          <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={removeWhitespaceOnly}
              onChange={(e) => setRemoveWhitespaceOnly(e.target.checked)}
              className="rounded accent-emerald-600"
            />
            <span>Remove Whitespace-Only Lines</span>
          </label>

          <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={collapseMultipleEmpty}
              onChange={(e) => setCollapseMultipleEmpty(e.target.checked)}
              className="rounded accent-emerald-600"
            />
            <span>Collapse Multiple Blanks to Single</span>
          </label>

          <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={trimEachLine}
              onChange={(e) => setTrimEachLine(e.target.checked)}
              className="rounded accent-emerald-600"
            />
            <span>Trim Each Line</span>
          </label>
        </div>

        <span className="text-emerald-700 font-bold">
          Removed: {removedCount} blank lines
        </span>
      </div>

      <TextOutput
        value={output}
        label="Cleaned Output"
        minHeight="min-h-[160px]"
        filename="no-empty-lines.txt"
      />
    </div>
  );
}

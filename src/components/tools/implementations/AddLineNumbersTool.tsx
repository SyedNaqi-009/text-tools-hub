'use client';

import React, { useState } from 'react';
import { TextInput } from '@/components/tools/TextInput';
import { TextOutput } from '@/components/tools/TextOutput';
import { addLineNumbers, NumberPadding } from '@/lib/text-utils/line-numbers';

export function AddLineNumbersTool() {
  const [input, setInput] = useState('');
  const [startNumber, setStartNumber] = useState(1);
  const [separator, setSeparator] = useState('. ');
  const [padding, setPadding] = useState<NumberPadding>('none');
  const [skipEmptyLines, setSkipEmptyLines] = useState(false);

  const output = addLineNumbers(input, {
    startNumber,
    separator,
    padding,
    skipEmptyLines,
  });

  return (
    <div className="space-y-6">
      <TextInput
        value={input}
        onChange={setInput}
        placeholder="Paste text or code snippets to prepend sequential line numbers..."
        label="Input Content"
        minHeight="min-h-[160px]"
      />

      {/* Configuration Controls */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700">Start At:</span>
            <input
              type="number"
              value={startNumber}
              onChange={(e) => setStartNumber(parseInt(e.target.value) || 1)}
              className="w-16 px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-800 font-mono-code"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700">Separator:</span>
            <select
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-800"
            >
              <option value=". ">Period + Space (&quot;. &quot;)</option>
              <option value=": ">Colon + Space (&quot;: &quot;)</option>
              <option value=" | ">Pipe (&quot; | &quot;)</option>
              <option value=") ">Right Bracket (&quot;) &quot;)</option>
              <option value="\t">Tab</option>
              <option value=" - ">Hyphen (&quot; - &quot;)</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700">Padding:</span>
            <select
              value={padding}
              onChange={(e) => setPadding(e.target.value as NumberPadding)}
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-800"
            >
              <option value="none">None (1, 2, ... 10)</option>
              <option value="zero">Zero-padded (01, 02, ... 10)</option>
              <option value="space">Space-padded</option>
            </select>
          </div>

          <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={skipEmptyLines}
              onChange={(e) => setSkipEmptyLines(e.target.checked)}
              className="rounded accent-emerald-600"
            />
            <span>Skip Empty Lines</span>
          </label>
        </div>
      </div>

      <TextOutput
        value={output}
        label="Numbered Output"
        minHeight="min-h-[160px]"
        filename="numbered-lines.txt"
      />
    </div>
  );
}

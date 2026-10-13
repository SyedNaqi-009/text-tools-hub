'use client';

import React, { useState } from 'react';
import { TextInput } from '@/components/tools/TextInput';
import { TextOutput } from '@/components/tools/TextOutput';
import { removeLineBreaks } from '@/lib/text-utils/remove-lines';

export function RemoveLineBreaksTool() {
  const [input, setInput] = useState('');
  const [separatorChoice, setSeparatorChoice] = useState<'space' | 'comma' | 'semicolon' | 'custom'>('space');
  const [customSeparator, setCustomSeparator] = useState(' | ');
  const [trimLines, setTrimLines] = useState(true);

  const actualSeparator =
    separatorChoice === 'space'
      ? ' '
      : separatorChoice === 'comma'
      ? ', '
      : separatorChoice === 'semicolon'
      ? '; '
      : customSeparator;

  const output = removeLineBreaks(input, actualSeparator, trimLines);

  return (
    <div className="space-y-6">
      <TextInput
        value={input}
        onChange={setInput}
        placeholder="Paste text fractured by hard returns or PDF line breaks to join into a continuous paragraph..."
        label="Fragmented Text"
        minHeight="min-h-[160px]"
      />

      {/* Delimiter Selection */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700">Replace Breaks With:</span>
            <select
              value={separatorChoice}
              onChange={(e) => setSeparatorChoice(e.target.value as 'space' | 'comma' | 'semicolon' | 'custom')}
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-800"
            >
              <option value="space">Space (&quot; &quot;)</option>
              <option value="comma">Comma (&quot;, &quot;)</option>
              <option value="semicolon">Semicolon (&quot;; &quot;)</option>
              <option value="custom">Custom String</option>
            </select>
          </div>

          {separatorChoice === 'custom' && (
            <input
              type="text"
              value={customSeparator}
              onChange={(e) => setCustomSeparator(e.target.value)}
              placeholder="e.g. | or -"
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-800 w-24"
            />
          )}

          <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={trimLines}
              onChange={(e) => setTrimLines(e.target.checked)}
              className="rounded accent-indigo-600"
            />
            <span>Trim Lines Before Joining</span>
          </label>
        </div>
      </div>

      <TextOutput
        value={output}
        label="Joined Single Paragraph"
        minHeight="min-h-[160px]"
        filename="joined-text.txt"
      />
    </div>
  );
}

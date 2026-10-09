'use client';

import React, { useState } from 'react';
import { TextInput } from '@/components/tools/TextInput';
import { TextOutput } from '@/components/tools/TextOutput';
import { repeatText } from '@/lib/text-utils/text-repeater';

export function TextRepeaterTool() {
  const [input, setInput] = useState('');
  const [count, setCount] = useState(3);
  const [separatorChoice, setSeparatorChoice] = useState<'newline' | 'space' | 'comma' | 'custom'>('newline');
  const [customSeparator, setCustomSeparator] = useState(' - ');

  const actualSeparator =
    separatorChoice === 'newline'
      ? '\n'
      : separatorChoice === 'space'
      ? ' '
      : separatorChoice === 'comma'
      ? ', '
      : customSeparator;

  const { output, warning } = repeatText(input, {
    count,
    separator: actualSeparator,
  });

  return (
    <div className="space-y-6">
      <TextInput
        value={input}
        onChange={setInput}
        placeholder="Type or paste text you wish to repeat..."
        label="Text to Repeat"
        minHeight="min-h-[140px]"
      />

      {/* Controls */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <label className="text-xs font-bold text-slate-700">
            Repetition Count:
          </label>
          <input
            type="number"
            min={1}
            max={1000}
            value={count}
            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-24 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono-code font-bold bg-white text-slate-900"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="text-xs font-bold text-slate-700">Separator:</label>
          <select
            value={separatorChoice}
            onChange={(e) => setSeparatorChoice(e.target.value as 'newline' | 'space' | 'comma' | 'custom')}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-900"
          >
            <option value="newline">Newline (\n)</option>
            <option value="space">Space</option>
            <option value="comma">Comma (, )</option>
            <option value="custom">Custom</option>
          </select>

          {separatorChoice === 'custom' && (
            <input
              type="text"
              value={customSeparator}
              onChange={(e) => setCustomSeparator(e.target.value)}
              placeholder="e.g. | or ***"
              className="px-2.5 py-1 rounded-md border border-slate-300 text-xs bg-white text-slate-900 w-24"
            />
          )}
        </div>
      </div>

      {warning && (
        <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-xl font-medium">
          {warning}
        </div>
      )}

      <TextOutput
        value={output}
        label="Repeated Result"
        minHeight="min-h-[180px]"
        filename="repeated-text.txt"
      />
    </div>
  );
}

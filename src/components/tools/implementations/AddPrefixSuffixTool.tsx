'use client';

import React, { useState } from 'react';
import { TextInput } from '@/components/tools/TextInput';
import { TextOutput } from '@/components/tools/TextOutput';
import { addPrefixSuffix } from '@/lib/text-utils/prefix-suffix';

export function AddPrefixSuffixTool() {
  const [input, setInput] = useState('');
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [skipEmptyLines, setSkipEmptyLines] = useState(true);
  const [trimLinesFirst, setTrimLinesFirst] = useState(false);

  const applyPreset = (pre: string, suf: string) => {
    setPrefix(pre);
    setSuffix(suf);
  };

  const output = addPrefixSuffix(input, {
    prefix,
    suffix,
    skipEmptyLines,
    trimLinesFirst,
  });

  return (
    <div className="space-y-6">
      <TextInput
        value={input}
        onChange={setInput}
        placeholder="Paste list items or text lines to prepend and append affixes..."
        label="Input Lines"
        minHeight="min-h-[160px]"
      />

      {/* Prefix / Suffix Controls & Presets */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Prefix (Prepend to start):
            </label>
            <input
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              placeholder='e.g. <li> or " or #'
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 font-mono-code"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Suffix (Append to end):
            </label>
            <input
              type="text"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              placeholder='e.g. </li> or ", or ;'
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 font-mono-code"
            />
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-500 font-medium">Quick Presets:</span>
          <button
            type="button"
            onClick={() => applyPreset('"', '",')}
            className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-100 rounded-md font-mono-code"
          >
            &quot;item&quot;, (JSON/Array)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('<li>', '</li>')}
            className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-100 rounded-md font-mono-code"
          >
            &lt;li&gt;item&lt;/li&gt; (HTML)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('- [ ] ', '')}
            className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-100 rounded-md font-mono-code"
          >
            - [ ] item (Markdown Task)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('', ',')}
            className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-100 rounded-md font-mono-code"
          >
            item, (SQL Comma)
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-200">
          <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={skipEmptyLines}
              onChange={(e) => setSkipEmptyLines(e.target.checked)}
              className="rounded accent-indigo-600"
            />
            <span>Skip Empty Lines</span>
          </label>

          <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={trimLinesFirst}
              onChange={(e) => setTrimLinesFirst(e.target.checked)}
              className="rounded accent-indigo-600"
            />
            <span>Trim Lines First</span>
          </label>
        </div>
      </div>

      <TextOutput
        value={output}
        label="Decorated Output"
        minHeight="min-h-[160px]"
        filename="prefixed-lines.txt"
      />
    </div>
  );
}

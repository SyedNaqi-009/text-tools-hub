'use client';

import React, { useState } from 'react';
import { TextInput } from '@/components/tools/TextInput';
import { TextOutput } from '@/components/tools/TextOutput';
import { generateSlug } from '@/lib/text-utils/slug-generator';

export function SlugGeneratorTool() {
  const [input, setInput] = useState('');
  const [separator, setSeparator] = useState<'-' | '_'>('-');
  const [lowercase, setLowercase] = useState(true);
  const [maxLength, setMaxLength] = useState<number | undefined>(undefined);

  const output = generateSlug(input, {
    separator,
    lowercase,
    maxLength,
  });

  return (
    <div className="space-y-6">
      <TextInput
        value={input}
        onChange={setInput}
        placeholder="Enter one or more titles (one per line) to convert into SEO-friendly URL slugs..."
        label="Input Title(s) / Text"
        minHeight="min-h-[160px]"
      />

      {/* Options */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700">Separator:</span>
            <select
              value={separator}
              onChange={(e) => setSeparator(e.target.value as '-' | '_')}
              className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-800"
            >
              <option value="-">Hyphen (-)</option>
              <option value="_">Underscore (_)</option>
            </select>
          </div>

          <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={lowercase}
              onChange={(e) => setLowercase(e.target.checked)}
              className="rounded accent-indigo-600"
            />
            <span>Convert to Lowercase</span>
          </label>

          <div className="flex items-center space-x-2">
            <span className="text-slate-700 font-medium">Max Length (chars):</span>
            <input
              type="number"
              placeholder="None"
              value={maxLength || ''}
              onChange={(e) => setMaxLength(e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-20 px-2 py-1 bg-white border border-slate-300 rounded-lg text-slate-800"
            />
          </div>
        </div>
      </div>

      <TextOutput
        value={output}
        label="Generated URL Slug(s)"
        placeholder="Generated slugs will appear here (one per line)..."
        minHeight="min-h-[160px]"
        filename="url-slugs.txt"
      />
    </div>
  );
}

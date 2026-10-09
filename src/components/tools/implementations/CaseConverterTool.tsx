'use client';

import React, { useState } from 'react';
import { TextInput } from '@/components/tools/TextInput';
import { TextOutput } from '@/components/tools/TextOutput';
import { convertCase, CaseType } from '@/lib/text-utils/case-converter';

interface CaseOption {
  type: CaseType;
  label: string;
  preview: string;
}

const CASE_BUTTONS: CaseOption[] = [
  { type: 'titlecase', label: 'Title Case', preview: 'The Quick Brown Fox' },
  { type: 'sentencecase', label: 'Sentence case', preview: 'The quick brown fox.' },
  { type: 'uppercase', label: 'UPPERCASE', preview: 'THE QUICK BROWN FOX' },
  { type: 'lowercase', label: 'lowercase', preview: 'the quick brown fox' },
  { type: 'camelcase', label: 'camelCase', preview: 'theQuickBrownFox' },
  { type: 'pascalcase', label: 'PascalCase', preview: 'TheQuickBrownFox' },
  { type: 'snakecase', label: 'snake_case', preview: 'the_quick_brown_fox' },
  { type: 'kebabcase', label: 'kebab-case', preview: 'the-quick-brown-fox' },
  { type: 'constantcase', label: 'CONSTANT_CASE', preview: 'THE_QUICK_BROWN_FOX' },
  { type: 'dotcase', label: 'dot.case', preview: 'the.quick.brown.fox' },
  { type: 'alternating', label: 'aLtErNaTiNg CaSe', preview: 'tHe QuIcK bRoWn FoX' },
];

export function CaseConverterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [activeCase, setActiveCase] = useState<CaseType | null>(null);

  const handleConvert = (type: CaseType) => {
    setActiveCase(type);
    const converted = convertCase(input, type);
    setOutput(converted);
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <TextInput
        value={input}
        onChange={(val) => {
          setInput(val);
          if (activeCase) {
            setOutput(convertCase(val, activeCase));
          }
        }}
        placeholder="Type or paste your text here to convert capitalization instantly..."
        label="Original Text"
        minHeight="min-h-[160px]"
      />

      {/* Action Buttons Grid */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2.5">
          Select Target Case Style
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {CASE_BUTTONS.map((item) => (
            <button
              key={item.type}
              type="button"
              onClick={() => handleConvert(item.type)}
              className={`p-2.5 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                activeCase === item.type
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-400 hover:bg-slate-50'
              }`}
            >
              <span className="font-bold">{item.label}</span>
              <span
                className={`font-mono-code text-[10px] truncate mt-1 ${
                  activeCase === item.type ? 'text-emerald-100' : 'text-slate-400'
                }`}
              >
                {item.preview}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Output */}
      <TextOutput
        value={output}
        label="Converted Output"
        placeholder="Select any case button above to see the converted text..."
        minHeight="min-h-[160px]"
        filename="converted-case.txt"
      />
    </div>
  );
}

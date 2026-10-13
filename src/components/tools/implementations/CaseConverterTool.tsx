'use client';

import React, { useState } from 'react';
import { TextInput } from '@/components/tools/TextInput';
import { TextOutput } from '@/components/tools/TextOutput';
import { convertCase, CaseType } from '@/lib/text-utils/case-converter';
import { Sparkles, ArrowRight } from 'lucide-react';

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
    <div className="space-y-8">
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
        label="Source Text"
        minHeight="min-h-[160px]"
      />

      {/* Action Buttons Grid */}
      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <label className="text-xs font-mono font-bold text-slate-800 uppercase tracking-widest">
            Select Target Case Style
          </label>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {CASE_BUTTONS.map((item) => (
            <button
              key={item.type}
              type="button"
              onClick={() => handleConvert(item.type)}
              className={`p-3.5 rounded-2xl text-left border transition-all text-xs flex flex-col justify-between group ${
                activeCase === item.type
                  ? 'bg-slate-950 text-white border-slate-950 shadow-md ring-2 ring-indigo-500/20'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30'
              }`}
            >
              <span className="font-bold tracking-tight text-sm mb-1">{item.label}</span>
              <span
                className={`font-mono-code text-[11px] truncate ${
                  activeCase === item.type ? 'text-indigo-300' : 'text-slate-400 group-hover:text-slate-600'
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

'use client';

import React, { useState } from 'react';
import { TextInput } from '@/components/tools/TextInput';
import { TextOutput } from '@/components/tools/TextOutput';
import { textToBinary, binaryToText, BinaryTableRow } from '@/lib/text-utils/binary-converter';
import { ArrowLeftRight, AlertCircle } from 'lucide-react';

export function TextToBinaryTool() {
  const [mode, setMode] = useState<'text-to-binary' | 'binary-to-text'>('text-to-binary');
  const [input, setInput] = useState('Hello World!');

  let binaryOutput = '';
  let textOutput = '';
  let tableRows: BinaryTableRow[] = [];
  let error: string | undefined = undefined;

  if (mode === 'text-to-binary') {
    const res = textToBinary(input);
    binaryOutput = res.binary;
    tableRows = res.table;
  } else {
    const res = binaryToText(input);
    textOutput = res.text;
    error = res.error;
  }

  const toggleMode = () => {
    if (mode === 'text-to-binary') {
      setMode('binary-to-text');
      setInput(binaryOutput);
    } else {
      setMode('text-to-binary');
      setInput(textOutput);
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-xs flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Conversion Direction:
        </span>
        <div className="flex items-center space-x-2 text-xs">
          <button
            type="button"
            onClick={() => setMode('text-to-binary')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              mode === 'text-to-binary'
                ? 'bg-slate-950 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
            }`}
          >
            Text → Binary
          </button>
          <button
            type="button"
            onClick={toggleMode}
            className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 transition-colors"
            title="Swap input and output"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setMode('binary-to-text')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              mode === 'binary-to-text'
                ? 'bg-slate-950 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
            }`}
          >
            Binary → Text
          </button>
        </div>
      </div>

      <TextInput
        value={input}
        onChange={setInput}
        placeholder={
          mode === 'text-to-binary'
            ? 'Type text here to convert to binary...'
            : 'Enter space-separated 8-bit binary digits (e.g. 01001000 01101001)...'
        }
        label={mode === 'text-to-binary' ? 'Input Text' : 'Input Binary Code'}
        minHeight="min-h-[140px]"
      />

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center space-x-2 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      <TextOutput
        value={mode === 'text-to-binary' ? binaryOutput : textOutput}
        label={mode === 'text-to-binary' ? 'Binary Output' : 'Decoded Text Output'}
        minHeight="min-h-[140px]"
        filename={mode === 'text-to-binary' ? 'binary-output.txt' : 'decoded-text.txt'}
      />

      {/* Reference Table for Text to Binary */}
      {mode === 'text-to-binary' && tableRows.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Character Encoding Breakdown Matrix
          </h3>
          <div className="rounded-2xl border border-slate-200/90 overflow-hidden bg-white shadow-xs max-h-[300px] overflow-y-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-600 sticky top-0">
                <tr>
                  <th className="py-2.5 px-4 font-sans">Character</th>
                  <th className="py-2.5 px-4">Binary (8-bit)</th>
                  <th className="py-2.5 px-4">Decimal (ASCII)</th>
                  <th className="py-2.5 px-4">Hexadecimal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2 px-4 font-bold text-slate-900 font-sans">{row.char}</td>
                    <td className="py-2 px-4 text-indigo-600 font-bold">{row.binary}</td>
                    <td className="py-2 px-4 text-slate-600">{row.decimal}</td>
                    <td className="py-2 px-4 text-slate-600">{row.hex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

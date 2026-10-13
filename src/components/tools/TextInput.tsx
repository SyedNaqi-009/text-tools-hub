'use client';

import React from 'react';
import { Clipboard, Trash2, ArrowDownUp } from 'lucide-react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  minHeight?: string;
  showStats?: boolean;
}

export function TextInput({
  value,
  onChange,
  placeholder = 'Type or paste your text here...',
  label = 'Input Text',
  minHeight = 'min-h-[220px]',
  showStats = true,
}: TextInputProps) {
  const characters = value.length;
  const words = value.trim() ? value.trim().split(/\s+/).filter(Boolean).length : 0;
  const lines = value ? value.split(/\r\n|\r|\n/).length : 0;

  const handlePaste = async () => {
    try {
      const clipText = await navigator.clipboard.readText();
      onChange(clipText);
    } catch {
      // fallback
    }
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="flex flex-col space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block" />
          <span>{label}</span>
        </label>
        <div className="flex items-center space-x-2 text-xs">
          <button
            type="button"
            onClick={handlePaste}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors font-medium border border-slate-200/80"
          >
            <Clipboard className="w-3.5 h-3.5" />
            <span>Paste</span>
          </button>
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors font-medium border border-rose-200/60"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      <div className="relative rounded-2xl border-2 border-slate-200 focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-600/10 bg-slate-50/30 transition-all overflow-hidden shadow-2xs">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full p-5 font-mono-code text-sm text-slate-900 placeholder:text-slate-400 bg-transparent resize-y focus:outline-none leading-relaxed ${minHeight}`}
          aria-label={label}
        />
      </div>

      {showStats && (
        <div className="flex items-center justify-between text-xs font-mono text-slate-500 px-1 py-0.5">
          <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-semibold">{words.toLocaleString()} words</span>
          <span>{characters.toLocaleString()} chars</span>
          <span>{lines.toLocaleString()} lines</span>
        </div>
      )}
    </div>
  );
}

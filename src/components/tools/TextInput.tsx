'use client';

import React from 'react';
import { Clipboard, Trash2 } from 'lucide-react';

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
      // ignore
    }
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-800">
          {label}
        </label>
        <div className="flex items-center space-x-2 text-xs">
          <button
            type="button"
            onClick={handlePaste}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-md text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <Clipboard className="w-3.5 h-3.5" />
            <span>Paste</span>
          </button>
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-md text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      <div className="relative rounded-xl border border-slate-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 bg-white transition-all shadow-xs">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full p-4 font-mono-code text-sm text-slate-800 placeholder:text-slate-400 bg-transparent resize-y focus:outline-none ${minHeight}`}
          aria-label={label}
        />
      </div>

      {showStats && (
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>{words.toLocaleString()} words</span>
          <span>{characters.toLocaleString()} characters</span>
          <span>{lines.toLocaleString()} lines</span>
        </div>
      )}
    </div>
  );
}

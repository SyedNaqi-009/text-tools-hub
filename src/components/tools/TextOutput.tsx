'use client';

import React, { useState } from 'react';
import { Copy, Check, Download, Terminal } from 'lucide-react';

interface TextOutputProps {
  value: string;
  label?: string;
  minHeight?: string;
  filename?: string;
  placeholder?: string;
}

export function TextOutput({
  value,
  label = 'Processed Output',
  minHeight = 'min-h-[220px]',
  filename = 'processed-text.txt',
  placeholder = 'Result will appear here...',
}: TextOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    if (!value) return;
    const blob = new Blob([value], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const characters = value.length;
  const words = value.trim() ? value.trim().split(/\s+/).filter(Boolean).length : 0;
  const lines = value ? value.split(/\r\n|\r|\n/).length : 0;

  return (
    <div className="flex flex-col space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
          <Terminal className="w-3.5 h-3.5 text-indigo-600 inline" />
          <span>{label}</span>
        </label>
        <div className="flex items-center space-x-2 text-xs">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!value}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg font-bold transition-all shadow-xs ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Text</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            disabled={!value}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border border-slate-200/80"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      <div className="relative rounded-2xl border-2 border-slate-200 bg-slate-50/70 overflow-hidden shadow-2xs">
        <textarea
          readOnly
          value={value}
          placeholder={placeholder}
          className={`w-full p-5 font-mono-code text-sm text-slate-900 placeholder:text-slate-400 bg-transparent resize-y focus:outline-none leading-relaxed ${minHeight}`}
          aria-label={label}
        />
      </div>

      <div className="flex items-center justify-between text-xs font-mono text-slate-500 px-1 py-0.5">
        <span className="bg-slate-200/70 px-2 py-0.5 rounded text-slate-800 font-semibold">{words.toLocaleString()} words</span>
        <span>{characters.toLocaleString()} chars</span>
        <span>{lines.toLocaleString()} lines</span>
      </div>
    </div>
  );
}

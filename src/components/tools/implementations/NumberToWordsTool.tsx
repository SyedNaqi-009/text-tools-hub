'use client';

import React, { useState } from 'react';
import { numberToWords } from '@/lib/text-utils/number-to-words';
import { Copy, Check, Hash } from 'lucide-react';

export function NumberToWordsTool() {
  const [input, setInput] = useState('1234567');
  const [copiedCardinal, setCopiedCardinal] = useState(false);
  const [copiedOrdinal, setCopiedOrdinal] = useState(false);

  const { cardinal, ordinal, error } = numberToWords(input);

  const copyText = async (text: string, isOrdinal: boolean) => {
    try {
      await navigator.clipboard.writeText(text);
      if (isOrdinal) {
        setCopiedOrdinal(true);
        setTimeout(() => setCopiedOrdinal(false), 2000);
      } else {
        setCopiedCardinal(true);
        setTimeout(() => setCopiedCardinal(false), 2000);
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
          Enter Numeric Value (up to 999 Billion)
        </label>
        <div className="relative rounded-2xl border border-slate-300 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/20 bg-white transition-all shadow-xs">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., 2500, 3.14, -42"
            className="w-full p-4 font-mono text-base text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {error ? (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl font-medium">
          {error}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Cardinal Display */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Cardinal Format (Standard Checks & Invoicing)
              </span>
              <button
                type="button"
                onClick={() => copyText(cardinal, false)}
                disabled={!cardinal}
                className="flex items-center space-x-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-bold transition-colors"
              >
                {copiedCardinal ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCardinal ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>
            <p className="text-base sm:text-lg font-bold text-slate-950 capitalize font-mono leading-relaxed">
              {cardinal || '—'}
            </p>
          </div>

          {/* Ordinal Display */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Ordinal Format (Sequential / Ranking Order)
              </span>
              <button
                type="button"
                onClick={() => copyText(ordinal, true)}
                disabled={!ordinal}
                className="flex items-center space-x-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-bold transition-colors"
              >
                {copiedOrdinal ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedOrdinal ? 'Copied' : 'Copy Ordinal'}</span>
              </button>
            </div>
            <p className="text-base sm:text-lg font-bold text-slate-950 capitalize font-mono leading-relaxed">
              {ordinal || '—'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

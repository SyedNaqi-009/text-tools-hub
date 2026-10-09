'use client';

import React, { useState } from 'react';
import { numberToWords } from '@/lib/text-utils/number-to-words';
import { Copy, Check } from 'lucide-react';

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
        <label className="text-sm font-semibold text-slate-800 block mb-2">
          Enter Numeric Value (up to 999 Billion)
        </label>
        <div className="relative rounded-xl border border-slate-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., 2500, 3.14, -42"
            className="w-full p-4 font-mono-code text-base text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none"
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
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Cardinal Words (Standard English / Checks)
              </span>
              <button
                type="button"
                onClick={() => copyText(cardinal, false)}
                disabled={!cardinal}
                className="flex items-center space-x-1 text-xs text-emerald-700 hover:text-emerald-800 font-semibold"
              >
                {copiedCardinal ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCardinal ? 'Copied!' : 'Copy Words'}</span>
              </button>
            </div>
            <p className="text-base sm:text-lg font-bold text-slate-900 capitalize font-mono-code">
              {cardinal || '—'}
            </p>
          </div>

          {/* Ordinal Display */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Ordinal Words (Sequential Order)
              </span>
              <button
                type="button"
                onClick={() => copyText(ordinal, true)}
                disabled={!ordinal}
                className="flex items-center space-x-1 text-xs text-emerald-700 hover:text-emerald-800 font-semibold"
              >
                {copiedOrdinal ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedOrdinal ? 'Copied!' : 'Copy Ordinal'}</span>
              </button>
            </div>
            <p className="text-base sm:text-lg font-bold text-slate-900 capitalize font-mono-code">
              {ordinal || '—'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

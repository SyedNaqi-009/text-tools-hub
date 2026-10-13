'use client';

import React, { useState } from 'react';
import { TextInput } from '@/components/tools/TextInput';
import { TextOutput } from '@/components/tools/TextOutput';
import { performFindReplace } from '@/lib/text-utils/find-replace';
import { Check, Search, AlertCircle } from 'lucide-react';

export function FindAndReplaceTool() {
  const [input, setInput] = useState('');
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [output, setOutput] = useState('');
  const [lastMatchCount, setLastMatchCount] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleExecuteReplace = () => {
    const res = performFindReplace(input, {
      findText,
      replaceText,
      caseSensitive,
      useRegex,
      wholeWord,
    });

    if (res.error) {
      setErrorMessage(res.error);
      setLastMatchCount(null);
    } else {
      setErrorMessage(null);
      setOutput(res.output);
      setLastMatchCount(res.matchCount);
    }
  };

  return (
    <div className="space-y-6">
      <TextInput
        value={input}
        onChange={setInput}
        placeholder="Type or paste text you wish to search and replace..."
        label="Input Content"
        minHeight="min-h-[160px]"
      />

      {/* Find & Replace Controls */}
      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Find Query:
            </label>
            <div className="relative rounded-lg border border-slate-300 bg-white">
              <input
                type="text"
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
                placeholder="String to find..."
                className="w-full px-3 py-2 text-xs font-mono-code text-slate-800 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Replace With:
            </label>
            <div className="relative rounded-lg border border-slate-300 bg-white">
              <input
                type="text"
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
                placeholder="Replacement string (or blank to remove)..."
                className="w-full px-3 py-2 text-xs font-mono-code text-slate-800 bg-transparent focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Toggles & Replace All Action Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-200/80 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                className="rounded accent-indigo-600"
              />
              <span>Case Sensitive</span>
            </label>

            <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={wholeWord}
                disabled={useRegex}
                onChange={(e) => setWholeWord(e.target.checked)}
                className="rounded accent-indigo-600"
              />
              <span>Whole Word Only</span>
            </label>

            <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={useRegex}
                onChange={(e) => setUseRegex(e.target.checked)}
                className="rounded accent-indigo-600"
              />
              <span className="font-bold text-indigo-700">Use Regex (.*)</span>
            </label>
          </div>

          <div className="flex items-center space-x-3">
            {lastMatchCount !== null && (
              <span className="text-indigo-600 font-bold flex items-center space-x-1 font-mono text-xs">
                <Check className="w-3.5 h-3.5" />
                <span>Replaced {lastMatchCount} occurrences</span>
              </span>
            )}

            <button
              type="button"
              onClick={handleExecuteReplace}
              className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-indigo-600 text-white font-semibold transition-all shadow-sm"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Replace All</span>
            </button>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center space-x-2 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>Regex Error: {errorMessage}</span>
        </div>
      )}

      <TextOutput
        value={output}
        label="Output After Replacement"
        placeholder="Processed result will appear here upon clicking 'Replace All'..."
        minHeight="min-h-[160px]"
        filename="find-replace-result.txt"
      />
    </div>
  );
}

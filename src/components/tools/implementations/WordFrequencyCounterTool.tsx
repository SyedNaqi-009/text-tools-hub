'use client';

import React, { useState, useMemo } from 'react';
import { TextInput } from '@/components/tools/TextInput';
import { calculateWordFrequency } from '@/lib/text-utils/word-frequency';
import { Download, Filter } from 'lucide-react';

export function WordFrequencyCounterTool() {
  const [text, setText] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [ignoreStopWords, setIgnoreStopWords] = useState(true);
  const [minWordLength, setMinWordLength] = useState(2);
  const [limit, setLimit] = useState(25);

  const result = useMemo(() => {
    return calculateWordFrequency(text, {
      caseSensitive,
      ignoreStopWords,
      minWordLength,
      limit,
    });
  }, [text, caseSensitive, ignoreStopWords, minWordLength, limit]);

  const handleExportCSV = () => {
    if (result.items.length === 0) return;
    const header = 'Word,Count,Percentage\n';
    const rows = result.items.map((i) => `"${i.word}",${i.count},${i.percentage}%`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'word-frequency.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <TextInput
        value={text}
        onChange={setText}
        placeholder="Paste your text or article here to analyze word recurrence frequencies..."
        label="Input Text"
        minHeight="min-h-[180px]"
      />

      {/* Options Panel */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={ignoreStopWords}
              onChange={(e) => setIgnoreStopWords(e.target.checked)}
              className="rounded accent-emerald-600"
            />
            <span>Filter Common Stop Words (the, and, is)</span>
          </label>

          <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="rounded accent-emerald-600"
            />
            <span>Case Sensitive</span>
          </label>

          <div className="flex items-center space-x-2">
            <span className="text-slate-600">Min Length:</span>
            <select
              value={minWordLength}
              onChange={(e) => setMinWordLength(Number(e.target.value))}
              className="px-2 py-1 bg-white border border-slate-300 rounded-md text-slate-700"
            >
              <option value={1}>1 char</option>
              <option value={2}>2 chars</option>
              <option value={3}>3 chars</option>
              <option value={4}>4 chars</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-slate-600">Show Top:</span>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="px-2 py-1 bg-white border border-slate-300 rounded-md text-slate-700"
            >
              <option value={10}>Top 10</option>
              <option value={25}>Top 25</option>
              <option value={50}>Top 50</option>
              <option value={100}>Top 100</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          disabled={result.items.length === 0}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Frequency Results Table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-1.5">
            <Filter className="w-4 h-4 text-emerald-600" />
            <span>Word Frequency Breakdown</span>
          </h3>
          <span className="text-xs text-slate-500">
            {result.uniqueWords.toLocaleString()} unique words analyzed
          </span>
        </div>

        {result.items.length > 0 ? (
          <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-xs">
            <div className="overflow-x-auto max-h-[350px]">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 sticky top-0">
                  <tr>
                    <th className="py-2.5 px-4 w-16">#</th>
                    <th className="py-2.5 px-4">Word / Term</th>
                    <th className="py-2.5 px-4 w-28 text-right">Count</th>
                    <th className="py-2.5 px-4 w-32 text-right">Percentage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono-code text-xs">
                  {result.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2 px-4 text-slate-400 font-sans">{idx + 1}</td>
                      <td className="py-2 px-4 font-bold text-slate-900">{item.word}</td>
                      <td className="py-2 px-4 text-right text-emerald-700 font-bold">{item.count}</td>
                      <td className="py-2 px-4 text-right text-slate-600">{item.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs text-slate-500">
            Enter or paste text above to see word frequency distribution.
          </div>
        )}
      </div>
    </div>
  );
}

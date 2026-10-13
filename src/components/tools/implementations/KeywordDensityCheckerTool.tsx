'use client';

import React, { useState, useMemo } from 'react';
import { TextInput } from '@/components/tools/TextInput';
import { calculateKeywordDensity } from '@/lib/text-utils/keyword-density';
import { Layers } from 'lucide-react';

export function KeywordDensityCheckerTool() {
  const [text, setText] = useState('');
  const [activeTab, setActiveTab] = useState<'1' | '2' | '3'>('1');

  const result = useMemo(() => {
    return calculateKeywordDensity(text);
  }, [text]);

  const currentList =
    activeTab === '1'
      ? result.oneWordPhrases
      : activeTab === '2'
      ? result.twoWordPhrases
      : result.threeWordPhrases;

  return (
    <div className="space-y-6">
      <TextInput
        value={text}
        onChange={setText}
        placeholder="Paste your blog article, copy, or essay here to inspect phrase frequencies and keyword distribution..."
        label="Input Content for Analysis"
        minHeight="min-h-[180px]"
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white border border-slate-200/90 rounded-2xl shadow-xs gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-950 text-indigo-400 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 block">
              Total Analyzed Words
            </span>
            <span className="text-base font-bold text-slate-950 font-mono">
              {result.totalWords.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl space-x-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('1')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === '1'
                ? 'bg-slate-950 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1-Word Tokens
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('2')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === '2'
                ? 'bg-slate-950 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2-Word Phrases
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('3')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === '3'
                ? 'bg-slate-950 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3-Word Phrases
          </button>
        </div>
      </div>

      {/* Phrases Table */}
      {currentList.length > 0 ? (
        <div className="rounded-2xl border border-slate-200/90 overflow-hidden bg-white shadow-sm">
          <div className="overflow-x-auto max-h-[380px]">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-600 sticky top-0">
                <tr>
                  <th className="py-3 px-4 w-14">#</th>
                  <th className="py-3 px-4">Phrase / Keyword</th>
                  <th className="py-3 px-4 w-28 text-right">Occurrences</th>
                  <th className="py-3 px-4 w-32 text-right">Density (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-xs">
                {currentList.map((item, idx) => {
                  const isHigh = item.density > 3.0;
                  const isHealthy = item.density >= 1.0 && item.density <= 2.5;

                  return (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2.5 px-4 text-slate-400 font-sans">{idx + 1}</td>
                      <td className="py-2.5 px-4 font-bold text-slate-900">{item.phrase}</td>
                      <td className="py-2.5 px-4 text-right text-slate-700 font-bold">{item.count}</td>
                      <td className="py-2.5 px-4 text-right">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            isHigh
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : isHealthy
                              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {item.density}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300 text-xs text-slate-500">
          Enter or paste text above to calculate keyword density distributions.
        </div>
      )}
    </div>
  );
}

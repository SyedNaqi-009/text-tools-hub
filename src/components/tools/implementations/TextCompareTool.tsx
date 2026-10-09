'use client';

import React, { useState, useMemo } from 'react';
import { computeDiff } from '@/lib/text-utils/diff-checker';
import { Columns, List, Plus, Minus, Check } from 'lucide-react';

export function TextCompareTool() {
  const [originalText, setOriginalText] = useState(
    'The quick brown fox jumps over the lazy dog.\nThis is a sample document for comparing revisions.\nLine three remains unchanged.'
  );
  const [modifiedText, setModifiedText] = useState(
    'The quick brown fox leaps over the lazy dog.\nThis is a sample document for comparing revisions.\nHere is an added line.\nLine three remains unchanged.'
  );
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [ignoreCase, setIgnoreCase] = useState(false);

  const diffResult = useMemo(() => {
    return computeDiff(originalText, modifiedText, {
      ignoreWhitespace,
      ignoreCase,
    });
  }, [originalText, modifiedText, ignoreWhitespace, ignoreCase]);

  return (
    <div className="space-y-6">
      {/* Dual Textareas Input Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
            Original Text (Baseline)
          </label>
          <div className="rounded-xl border border-slate-200 bg-white focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20">
            <textarea
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              placeholder="Paste original text here..."
              rows={6}
              className="w-full p-3.5 font-mono-code text-xs text-slate-800 placeholder:text-slate-400 bg-transparent resize-y focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
            Modified Text (Revised)
          </label>
          <div className="rounded-xl border border-slate-200 bg-white focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20">
            <textarea
              value={modifiedText}
              onChange={(e) => setModifiedText(e.target.value)}
              placeholder="Paste modified text here..."
              rows={6}
              className="w-full p-3.5 font-mono-code text-xs text-slate-800 placeholder:text-slate-400 bg-transparent resize-y focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Diff Controls & Statistics Bar */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs">
        {/* View Mode Switcher */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              viewMode === 'split'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Side-by-Side View</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('unified')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              viewMode === 'unified'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Unified Inline View</span>
          </button>
        </div>

        {/* Options */}
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={ignoreWhitespace}
              onChange={(e) => setIgnoreWhitespace(e.target.checked)}
              className="rounded accent-emerald-600"
            />
            <span>Ignore Whitespace</span>
          </label>

          <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={ignoreCase}
              onChange={(e) => setIgnoreCase(e.target.checked)}
              className="rounded accent-emerald-600"
            />
            <span>Ignore Case</span>
          </label>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-3 font-semibold">
          <span className="flex items-center space-x-1 text-emerald-700">
            <Plus className="w-3.5 h-3.5" />
            <span>+{diffResult.addedCount} added</span>
          </span>
          <span className="flex items-center space-x-1 text-rose-600">
            <Minus className="w-3.5 h-3.5" />
            <span>-{diffResult.removedCount} deleted</span>
          </span>
          <span className="flex items-center space-x-1 text-slate-500">
            <Check className="w-3.5 h-3.5" />
            <span>{diffResult.unchangedCount} unchanged</span>
          </span>
        </div>
      </div>

      {/* Diff Result Display Area */}
      <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-xs font-mono-code text-xs">
        {viewMode === 'unified' ? (
          /* Unified View */
          <div className="divide-y divide-slate-100 overflow-x-auto max-h-[450px]">
            {diffResult.lines.map((line, idx) => {
              const isAdded = line.type === 'added';
              const isRemoved = line.type === 'removed';

              let bgClass = 'bg-white text-slate-800';
              let indicator = ' ';
              if (isAdded) {
                bgClass = 'bg-emerald-50 text-emerald-950 border-l-4 border-emerald-500';
                indicator = '+';
              } else if (isRemoved) {
                bgClass = 'bg-rose-50 text-rose-950 border-l-4 border-rose-500';
                indicator = '-';
              }

              return (
                <div key={idx} className={`flex py-1.5 px-3 items-start space-x-3 ${bgClass}`}>
                  <span className="w-8 shrink-0 text-slate-400 select-none text-right">
                    {line.originalLineNumber || line.modifiedLineNumber || ''}
                  </span>
                  <span className="w-4 shrink-0 font-bold select-none text-center">
                    {indicator}
                  </span>
                  <pre className="whitespace-pre-wrap break-all grow font-inherit">
                    {line.text || ' '}
                  </pre>
                </div>
              );
            })}
          </div>
        ) : (
          /* Side-by-Side Dual Pane */
          <div className="grid grid-cols-2 divide-x divide-slate-200 overflow-x-auto max-h-[450px]">
            {/* Left Pane (Original) */}
            <div className="divide-y divide-slate-100">
              <div className="bg-slate-50 px-3 py-2 text-[11px] font-bold text-slate-500 border-b border-slate-200">
                Original Version
              </div>
              {diffResult.lines.map((line, idx) => {
                if (line.type === 'added') {
                  return (
                    <div key={idx} className="py-1.5 px-3 bg-slate-50/50 text-slate-300 select-none min-h-[26px]">
                      &nbsp;
                    </div>
                  );
                }
                const isRemoved = line.type === 'removed';
                return (
                  <div
                    key={idx}
                    className={`flex py-1.5 px-3 items-start space-x-2 ${
                      isRemoved ? 'bg-rose-50 text-rose-950 border-l-4 border-rose-500' : 'bg-white text-slate-800'
                    }`}
                  >
                    <span className="w-6 shrink-0 text-slate-400 select-none text-right">
                      {line.originalLineNumber || ''}
                    </span>
                    <pre className="whitespace-pre-wrap break-all grow font-inherit">
                      {line.text || ' '}
                    </pre>
                  </div>
                );
              })}
            </div>

            {/* Right Pane (Modified) */}
            <div className="divide-y divide-slate-100">
              <div className="bg-slate-50 px-3 py-2 text-[11px] font-bold text-slate-500 border-b border-slate-200">
                Modified Version
              </div>
              {diffResult.lines.map((line, idx) => {
                if (line.type === 'removed') {
                  return (
                    <div key={idx} className="py-1.5 px-3 bg-slate-50/50 text-slate-300 select-none min-h-[26px]">
                      &nbsp;
                    </div>
                  );
                }
                const isAdded = line.type === 'added';
                return (
                  <div
                    key={idx}
                    className={`flex py-1.5 px-3 items-start space-x-2 ${
                      isAdded ? 'bg-emerald-50 text-emerald-950 border-l-4 border-emerald-500' : 'bg-white text-slate-800'
                    }`}
                  >
                    <span className="w-6 shrink-0 text-slate-400 select-none text-right">
                      {line.modifiedLineNumber || ''}
                    </span>
                    <pre className="whitespace-pre-wrap break-all grow font-inherit">
                      {line.text || ' '}
                    </pre>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useState, useMemo } from 'react';
import { computeDiff } from '@/lib/text-utils/diff-checker';
import { Columns, List, Plus, Minus, Check, GitCompare } from 'lucide-react';

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
    <div className="space-y-8">
      {/* Dual Textareas Input Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-widest block mb-2">
            Original Text (Baseline)
          </label>
          <div className="rounded-2xl border-2 border-slate-200 bg-slate-50/30 focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-600/10 overflow-hidden">
            <textarea
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              placeholder="Paste original text here..."
              rows={7}
              className="w-full p-4 font-mono-code text-xs text-slate-900 placeholder:text-slate-400 bg-transparent resize-y focus:outline-none leading-relaxed"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-widest block mb-2">
            Modified Text (Revised)
          </label>
          <div className="rounded-2xl border-2 border-slate-200 bg-slate-50/30 focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-600/10 overflow-hidden">
            <textarea
              value={modifiedText}
              onChange={(e) => setModifiedText(e.target.value)}
              placeholder="Paste modified text here..."
              rows={7}
              className="w-full p-4 font-mono-code text-xs text-slate-900 placeholder:text-slate-400 bg-transparent resize-y focus:outline-none leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Diff Controls & Statistics Bar */}
      <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs">
        {/* View Mode Switcher */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl font-bold transition-all ${
              viewMode === 'split'
                ? 'bg-slate-950 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Side-by-Side</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('unified')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl font-bold transition-all ${
              viewMode === 'unified'
                ? 'bg-slate-950 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Unified Inline</span>
          </button>
        </div>

        {/* Options */}
        <div className="flex items-center space-x-5 font-bold text-slate-700">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={ignoreWhitespace}
              onChange={(e) => setIgnoreWhitespace(e.target.checked)}
              className="w-4 h-4 rounded accent-indigo-600"
            />
            <span>Ignore Whitespace</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={ignoreCase}
              onChange={(e) => setIgnoreCase(e.target.checked)}
              className="w-4 h-4 rounded accent-indigo-600"
            />
            <span>Ignore Case</span>
          </label>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-3 font-mono font-bold">
          <span className="flex items-center space-x-1 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200">
            <Plus className="w-3.5 h-3.5 text-emerald-600" />
            <span>+{diffResult.addedCount} added</span>
          </span>
          <span className="flex items-center space-x-1 bg-rose-50 text-rose-800 px-3 py-1.5 rounded-xl border border-rose-200">
            <Minus className="w-3.5 h-3.5 text-rose-600" />
            <span>-{diffResult.removedCount} deleted</span>
          </span>
          <span className="flex items-center space-x-1 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl">
            <Check className="w-3.5 h-3.5 text-slate-500" />
            <span>{diffResult.unchangedCount} unchanged</span>
          </span>
        </div>
      </div>

      {/* Diff Result Display Area */}
      <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs font-mono-code text-xs">
        {viewMode === 'unified' ? (
          /* Unified View */
          <div className="divide-y divide-slate-100 overflow-x-auto max-h-[480px]">
            {diffResult.lines.map((line, idx) => {
              const isAdded = line.type === 'added';
              const isRemoved = line.type === 'removed';

              let bgClass = 'bg-white text-slate-800';
              let indicator = ' ';
              if (isAdded) {
                bgClass = 'bg-emerald-50/80 text-emerald-950 border-l-4 border-emerald-500';
                indicator = '+';
              } else if (isRemoved) {
                bgClass = 'bg-rose-50/80 text-rose-950 border-l-4 border-rose-500';
                indicator = '-';
              }

              return (
                <div key={idx} className={`flex py-2 px-4 items-start space-x-3 ${bgClass}`}>
                  <span className="w-10 shrink-0 text-slate-400 select-none text-right font-mono text-[11px]">
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
          <div className="grid grid-cols-2 divide-x divide-slate-200 overflow-x-auto max-h-[480px]">
            {/* Left Pane (Original) */}
            <div className="divide-y divide-slate-100">
              <div className="bg-slate-100/70 px-4 py-2.5 text-[11px] font-mono font-bold text-slate-600 border-b border-slate-200 uppercase tracking-wider">
                Original Version (LHS)
              </div>
              {diffResult.lines.map((line, idx) => {
                if (line.type === 'added') {
                  return (
                    <div key={idx} className="py-2 px-4 bg-slate-50/50 text-slate-300 select-none min-h-[28px]">
                      &nbsp;
                    </div>
                  );
                }
                const isRemoved = line.type === 'removed';
                return (
                  <div
                    key={idx}
                    className={`flex py-2 px-4 items-start space-x-2.5 ${
                      isRemoved ? 'bg-rose-50/90 text-rose-950 border-l-4 border-rose-500' : 'bg-white text-slate-800'
                    }`}
                  >
                    <span className="w-7 shrink-0 text-slate-400 select-none text-right font-mono text-[11px]">
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
              <div className="bg-slate-100/70 px-4 py-2.5 text-[11px] font-mono font-bold text-slate-600 border-b border-slate-200 uppercase tracking-wider">
                Modified Version (RHS)
              </div>
              {diffResult.lines.map((line, idx) => {
                if (line.type === 'removed') {
                  return (
                    <div key={idx} className="py-2 px-4 bg-slate-50/50 text-slate-300 select-none min-h-[28px]">
                      &nbsp;
                    </div>
                  );
                }
                const isAdded = line.type === 'added';
                return (
                  <div
                    key={idx}
                    className={`flex py-2 px-4 items-start space-x-2.5 ${
                      isAdded ? 'bg-emerald-50/90 text-emerald-950 border-l-4 border-emerald-500' : 'bg-white text-slate-800'
                    }`}
                  >
                    <span className="w-7 shrink-0 text-slate-400 select-none text-right font-mono text-[11px]">
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

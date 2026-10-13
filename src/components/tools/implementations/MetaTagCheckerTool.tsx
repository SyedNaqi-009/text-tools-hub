'use client';

import React, { useState } from 'react';
import { analyzeMetaTags } from '@/lib/text-utils/meta-tag-checker';
import { Globe, AlertTriangle, CheckCircle, Info, Sparkles } from 'lucide-react';

export function MetaTagCheckerTool() {
  const [title, setTitle] = useState('Free Online Text Tools for Writers, Developers & Creators | TextToolsHub');
  const [description, setDescription] = useState(
    'Transform, analyze, clean, and format text instantly in your browser with 100% privacy. Zero server logging and no sign-up required.'
  );

  const analysis = analyzeMetaTags(title, description);

  return (
    <div className="space-y-8">
      {/* Inputs for Title and Description */}
      <div className="space-y-6">
        {/* Title Field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-mono font-bold text-slate-800 uppercase tracking-widest">
              SEO Title Tag (&lt;title&gt;)
            </label>
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded-lg border ${
                analysis.titleStatus === 'optimal'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : analysis.titleStatus === 'warning'
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}
            >
              {analysis.titleLength} / 60 characters
            </span>
          </div>

          <div className="rounded-2xl border-2 border-slate-200 bg-white focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-600/10 overflow-hidden shadow-2xs">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter page title..."
              className="w-full p-4 font-mono-code text-sm text-slate-900 bg-transparent focus:outline-none font-medium"
            />
          </div>

          <p className="mt-2 text-xs text-slate-500 flex items-center space-x-1.5 font-medium">
            {analysis.titleStatus === 'optimal' ? (
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
            )}
            <span>{analysis.titleMessage}</span>
          </p>
        </div>

        {/* Description Field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-mono font-bold text-slate-800 uppercase tracking-widest">
              Meta Description
            </label>
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded-lg border ${
                analysis.descriptionStatus === 'optimal'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : analysis.descriptionStatus === 'warning'
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}
            >
              {analysis.descriptionLength} / 160 characters
            </span>
          </div>

          <div className="rounded-2xl border-2 border-slate-200 bg-white focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-600/10 overflow-hidden shadow-2xs">
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter meta description..."
              className="w-full p-4 font-mono-code text-sm text-slate-900 bg-transparent resize-y focus:outline-none leading-relaxed font-medium"
            />
          </div>

          <p className="mt-2 text-xs text-slate-500 flex items-center space-x-1.5 font-medium">
            {analysis.descriptionStatus === 'optimal' ? (
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
            )}
            <span>{analysis.descriptionMessage}</span>
          </p>
        </div>
      </div>

      {/* Google SERP Live Simulation Card */}
      <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-800 uppercase tracking-widest">
          <Globe className="w-4 h-4 text-indigo-600" />
          <span>Real-Time Google SERP Simulator</span>
        </div>

        {/* Google Result Box */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-md max-w-2xl font-sans">
          <div className="flex items-center space-x-2 text-xs text-slate-600 mb-1.5">
            <div className="w-5 h-5 rounded-full bg-slate-950 text-[10px] text-white flex items-center justify-center font-bold font-serif">
              T
            </div>
            <span className="text-slate-800 font-semibold">TextToolsHub</span>
            <span className="text-slate-400">›</span>
            <span className="text-slate-500 font-mono text-[11px]">https://texttoolshub.com/page-slug</span>
          </div>

          <h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer font-medium leading-snug line-clamp-1 mb-1.5">
            {analysis.truncatedTitle || 'Untitled Document Preview'}
          </h3>

          <p className="text-sm text-[#4d5156] leading-relaxed line-clamp-2">
            {analysis.truncatedDescription || 'No meta description provided. Google will extract text from the body page.'}
          </p>
        </div>

        <div className="text-xs text-slate-500 flex items-center space-x-2 pt-1 font-mono">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>Simulates standard desktop Google display widths (~600px title, ~960px snippet).</span>
        </div>
      </div>
    </div>
  );
}

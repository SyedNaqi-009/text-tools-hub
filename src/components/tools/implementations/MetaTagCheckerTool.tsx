'use client';

import React, { useState } from 'react';
import { analyzeMetaTags } from '@/lib/text-utils/meta-tag-checker';
import { Globe, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export function MetaTagCheckerTool() {
  const [title, setTitle] = useState('Free Online Text Tools for Writers, Developers & Creators | TextToolsHub');
  const [description, setDescription] = useState(
    'Transform, analyze, clean, and format text instantly in your browser with 100% privacy. Zero server logging and no sign-up required.'
  );

  const analysis = analyzeMetaTags(title, description);

  return (
    <div className="space-y-6">
      {/* Inputs for Title and Description */}
      <div className="space-y-4">
        {/* Title Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Page Title (&lt;title&gt;)
            </label>
            <span
              className={`text-xs font-mono-code font-bold ${
                analysis.titleStatus === 'optimal'
                  ? 'text-emerald-700'
                  : analysis.titleStatus === 'warning'
                  ? 'text-amber-600'
                  : 'text-rose-600'
              }`}
            >
              {analysis.titleLength} / 60 characters
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter page title..."
              className="w-full p-3 font-mono-code text-sm text-slate-800 bg-transparent focus:outline-none"
            />
          </div>

          <p className="mt-1 text-xs text-slate-500 flex items-center space-x-1">
            {analysis.titleStatus === 'optimal' ? (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            )}
            <span>{analysis.titleMessage}</span>
          </p>
        </div>

        {/* Description Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Meta Description
            </label>
            <span
              className={`text-xs font-mono-code font-bold ${
                analysis.descriptionStatus === 'optimal'
                  ? 'text-emerald-700'
                  : analysis.descriptionStatus === 'warning'
                  ? 'text-amber-600'
                  : 'text-rose-600'
              }`}
            >
              {analysis.descriptionLength} / 160 characters
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20">
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter meta description..."
              className="w-full p-3 font-mono-code text-sm text-slate-800 bg-transparent resize-y focus:outline-none"
            />
          </div>

          <p className="mt-1 text-xs text-slate-500 flex items-center space-x-1">
            {analysis.descriptionStatus === 'optimal' ? (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            )}
            <span>{analysis.descriptionMessage}</span>
          </p>
        </div>
      </div>

      {/* Google SERP Live Simulation Card */}
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <Globe className="w-4 h-4 text-emerald-600" />
          <span>Google Desktop SERP Preview Mockup</span>
        </div>

        {/* Google Result Box */}
        <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs max-w-2xl font-sans">
          <div className="flex items-center space-x-2 text-xs text-slate-600 mb-1">
            <div className="w-4 h-4 rounded-full bg-emerald-600 text-[10px] text-white flex items-center justify-center font-bold">
              T
            </div>
            <span className="text-slate-800 font-medium">TextToolsHub</span>
            <span className="text-slate-400">›</span>
            <span className="text-slate-500">https://texttoolshub.com/page-slug</span>
          </div>

          <h3 className="text-lg text-[#1a0dab] hover:underline cursor-pointer font-medium leading-snug line-clamp-1 mb-1">
            {analysis.truncatedTitle || 'Untitled Document Preview'}
          </h3>

          <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
            {analysis.truncatedDescription || 'No meta description provided. Google will extract text from the body page.'}
          </p>
        </div>

        <div className="text-[11px] text-slate-500 flex items-center space-x-1.5 pt-1">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>Note: Google desktop results measure width in pixels (~600px for titles, ~960px for descriptions).</span>
        </div>
      </div>
    </div>
  );
}

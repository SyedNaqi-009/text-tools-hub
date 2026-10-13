'use client';

import React from 'react';
import { Container } from '../ui/Container';
import { Search, Shield, Zap, Sparkles, Terminal } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 bg-white border-b border-slate-200/80 bg-subtle-grid overflow-hidden">
      {/* Decorative architectural grid lines */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none" />

      <Container className="relative z-10 text-center">
        {/* Studio Monogram Badge */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-mono font-medium mb-8 shadow-sm">
          <Terminal className="w-3.5 h-3.5 text-indigo-400" />
          <span>TextToolsHub Studio v2.0 · 22 High-Precision Utilities</span>
        </div>

        {/* Editorial Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-950 tracking-tight max-w-5xl mx-auto leading-[1.08]">
          The Intelligent Workspace for{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-sky-600 to-indigo-800 bg-clip-text text-transparent">
            Text & Data
          </span>
        </h1>

        {/* Refined Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          High-performance, zero-latency text transformation and analytical engines. Executed 100% locally in your browser with absolute cryptographic privacy.
        </p>

        {/* Search Bar */}
        <div className="mt-10 max-w-2xl mx-auto">
          <div className="relative flex items-center shadow-lg shadow-indigo-500/5 rounded-2xl border border-slate-300 focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-600/10 bg-white transition-all overflow-hidden p-1.5">
            <div className="pl-4 pr-3 text-slate-400">
              <Search className="w-5 h-5 text-indigo-600" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search 22 utilities (e.g., word counter, diff checker, case converter, slug)..."
              className="w-full py-3 pr-4 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none font-medium"
              aria-label="Search tools"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="mr-3 px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Feature Highlights Pills */}
        <div className="mt-10 flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm font-medium text-slate-600">
          <div className="flex items-center space-x-2 bg-slate-100/70 border border-slate-200 px-3.5 py-1.5 rounded-xl">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>100% Client-Side Privacy</span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-100/70 border border-slate-200 px-3.5 py-1.5 rounded-xl">
            <Zap className="w-4 h-4 text-indigo-600" />
            <span>Sub-Millisecond Processing</span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-100/70 border border-slate-200 px-3.5 py-1.5 rounded-xl">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>Free & No Registration</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

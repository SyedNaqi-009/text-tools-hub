'use client';

import React from 'react';
import { Container } from '../ui/Container';
import { Search, Shield, Zap, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
  return (
    <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 bg-white border-b border-slate-200 bg-grid-pattern overflow-hidden">
      <Container className="relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>22 Free High-Performance Text Utilities</span>
        </div>

        {/* Editorial Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
          Free Online Text Tools for Writers, Developers & Creators
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Transform, analyze, clean, and format text instantly in your browser. 100% private — your text never leaves your device.
        </p>

        {/* Functional Search Bar */}
        <div className="mt-8 max-w-xl mx-auto">
          <div className="relative flex items-center shadow-md rounded-2xl border border-slate-300 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 bg-white transition-all overflow-hidden">
            <div className="pl-4 pr-2 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search 22 text tools (e.g., word counter, diff, case, slug)..."
              className="w-full py-4 pr-4 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
              aria-label="Search tools"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="mr-3 px-2 py-1 text-xs font-semibold text-slate-400 hover:text-slate-600 rounded"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Value props bullets */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-xs sm:text-sm font-medium text-slate-500">
          <span className="flex items-center space-x-1.5">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>100% Client-Side Privacy</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Zero Server Latency</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>No Account or Sign-Up Needed</span>
          </span>
        </div>
      </Container>
    </section>
  );
}

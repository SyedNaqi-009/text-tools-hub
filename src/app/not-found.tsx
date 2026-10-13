'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Search, Home, ArrowRight, HelpCircle, Compass, Sparkles } from 'lucide-react';
import { TOOLS_DATA } from '@/lib/tools-data';

export default function NotFound() {
  const [query, setQuery] = useState('');

  const filteredTools = query
    ? TOOLS_DATA.filter((tool) =>
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.shortDescription.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 4)
    : TOOLS_DATA.slice(0, 4);

  return (
    <div className="py-20 bg-subtle-grid min-h-screen flex items-center justify-center">
      <Container className="max-w-2xl text-center">
        {/* Studio 404 Badge */}
        <div className="relative inline-flex mb-6">
          <div className="w-20 h-20 rounded-2xl bg-slate-950 border border-slate-800 text-indigo-400 flex items-center justify-center shadow-xl">
            <span className="font-serif font-black text-2xl tracking-tighter text-white">
              4<span className="text-indigo-400">0</span>4
            </span>
          </div>
          <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-md">
            <Compass className="w-4 h-4" />
          </div>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-200">
            Route Not Located
          </span>
        </div>

        <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
          Page or Tool Missing
        </h1>

        <p className="mt-4 text-base text-slate-600 max-w-md mx-auto leading-relaxed">
          The requested path does not exist or may have migrated to another suite. Query our studio directory below or return home.
        </p>

        {/* Search bar */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="relative flex items-center rounded-2xl border border-slate-300 bg-white shadow-xs focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
            <Search className="w-5 h-5 text-slate-400 ml-3.5 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 22 utilities (e.g. Diff, Word Counter, Slug)..."
              className="w-full py-3.5 pl-2.5 pr-4 text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* Suggested Tools */}
        <div className="mt-10 text-left bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Popular Studio Utilities
            </h2>
            <span className="text-xs text-indigo-600 font-medium">Instant Browser Execution</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all flex items-center justify-between group"
              >
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {tool.shortDescription}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-950 hover:bg-indigo-600 text-white font-semibold text-sm transition-all shadow-md hover:shadow-indigo-600/20 active:scale-98"
          >
            <Home className="w-4 h-4" />
            <span>Return to Studio Home</span>
          </Link>
        </div>
      </Container>
    </div>
  );
}

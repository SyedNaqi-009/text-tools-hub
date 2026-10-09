'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Search, Home, ArrowRight, HelpCircle } from 'lucide-react';
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
    <div className="py-20 bg-slate-50 min-h-screen flex items-center justify-center">
      <Container className="max-w-2xl text-center">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="w-8 h-8" />
        </div>

        <span className="text-sm font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Error 404
        </span>

        <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Page Not Found
        </h1>

        <p className="mt-4 text-base text-slate-600 max-w-md mx-auto leading-relaxed">
          The page or tool you requested does not exist or may have been relocated. Use the search bar below to find what you need.
        </p>

        {/* Search bar */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="relative flex items-center shadow-xs rounded-xl border border-slate-300 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 bg-white">
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools (e.g. word counter, case)..."
              className="w-full py-3 pl-2 pr-4 text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* Suggested Tools */}
        <div className="mt-10 text-left">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center sm:text-left">
            Popular Text Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-500/40 hover:shadow-xs transition-all flex items-center justify-between group"
              >
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {tool.shortDescription}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-colors shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </Container>
    </div>
  );
}

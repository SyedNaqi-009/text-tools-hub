'use client';

import React, { useState, useTransition, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { ToolCard } from '@/components/tools/ToolCard';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CATEGORIES_LIST, TOOLS_DATA, ToolCategory } from '@/lib/tools-data';
import { Search, SlidersHorizontal, Terminal } from 'lucide-react';

function ToolsDirectoryContent() {
  const searchParams = useSearchParams();
  const initialCat = (searchParams.get('category') as ToolCategory) || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [searchFilter, setSearchFilter] = useState('');
  const [, startTransition] = useTransition();

  const handleCategoryChange = (cat: string) => {
    startTransition(() => {
      setSelectedCategory(cat);
    });
  };

  const filteredTools = TOOLS_DATA.filter((tool) => {
    const matchesCategory =
      selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch =
      !searchFilter.trim() ||
      tool.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      tool.shortDescription.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const breadcrumbs = [{ name: 'All Tools', url: '/tools' }];

  return (
    <div className="py-12 bg-slate-50/40 min-h-screen">
      <Container>
        <Breadcrumbs items={breadcrumbs} />

        {/* Directory Header */}
        <div className="mb-12 p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-mono font-bold mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>Complete Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
            All 22 Text Utilities & Analyzers
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Search, filter by functional category, and launch any of our sub-millisecond client-side text tools.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="space-y-6 mb-12">
          <div className="max-w-xl">
            <div className="relative flex items-center rounded-2xl border-2 border-slate-200 focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-600/10 bg-white transition-all p-1">
              <Search className="w-5 h-5 text-indigo-600 ml-3.5 shrink-0" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter tools by keyword, function, or description..."
                className="w-full py-2.5 pl-3 pr-4 text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none font-medium"
              />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  className="mr-3 px-2 py-1 text-xs text-slate-500 hover:text-slate-800 bg-slate-100 rounded-md font-semibold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Categorical Filter Chips */}
          <div className="flex items-center space-x-2.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/90'
              }`}
            >
              All Utilities ({TOOLS_DATA.length})
            </button>

            {CATEGORIES_LIST.map((cat) => {
              const count = TOOLS_DATA.filter((t) => t.category === cat.id).length;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/90'
                  }`}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 p-8 max-w-lg mx-auto">
            <SlidersHorizontal className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">No matching tools found</h3>
            <p className="text-slate-500 text-sm mt-1">
              Try adjusting your search query or reset the category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchFilter('');
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default function ToolsDirectoryPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center font-mono text-sm text-slate-400">Loading catalog...</div>}>
      <ToolsDirectoryContent />
    </Suspense>
  );
}

'use client';

import React, { useState, useTransition, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { ToolCard } from '@/components/tools/ToolCard';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CATEGORIES_LIST, TOOLS_DATA, ToolCategory } from '@/lib/tools-data';
import { Search } from 'lucide-react';

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
    <div className="py-12 bg-slate-50/50 min-h-screen">
      <Container>
        <Breadcrumbs items={breadcrumbs} />

        {/* Directory Header */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            All Free Text Tools Directory
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600 max-w-3xl">
            Explore our complete suite of 22 client-side text tools. Select a category or use the search bar to find the exact utility you need.
          </p>
        </div>

        {/* Search input & Horizontal Category Pill Filter Bar */}
        <div className="space-y-4 mb-10">
          <div className="max-w-md">
            <div className="relative flex items-center shadow-xs rounded-xl border border-slate-300 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 bg-white">
              <Search className="w-4 h-4 text-slate-400 ml-3.5 shrink-0" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter tools by keyword..."
                className="w-full py-2.5 pl-2.5 pr-4 text-sm text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none"
              />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  className="mr-3 text-xs text-slate-400 hover:text-slate-600 font-semibold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Horizontal pill category buttons */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Tools ({TOOLS_DATA.length})
            </button>

            {CATEGORIES_LIST.map((cat) => {
              const count = TOOLS_DATA.filter((t) => t.category === cat.id).length;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
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
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-slate-600 text-base">
              No text tools match the filter criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchFilter('');
              }}
              className="mt-3 inline-block text-sm font-semibold text-emerald-700 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default function ToolsDirectoryPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading tools directory...</div>}>
      <ToolsDirectoryContent />
    </Suspense>
  );
}

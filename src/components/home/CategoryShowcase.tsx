import React from 'react';
import { Container } from '../ui/Container';
import { ToolCard } from '../tools/ToolCard';
import { CATEGORIES_LIST, TextTool } from '@/lib/tools-data';
import { FolderGit2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CategoryShowcase({ allTools }: { allTools: TextTool[] }) {
  return (
    <section className="py-24 bg-white border-b border-slate-200/80">
      <Container>
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono font-bold mb-3">
            <FolderGit2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Complete Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
            Explore by Dedicated Tool Suites
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Organized across 6 purpose-built categories so you can navigate straight to what you need.
          </p>
        </div>

        <div className="space-y-20">
          {CATEGORIES_LIST.map((category, idx) => {
            const categoryTools = allTools.filter(
              (tool) => tool.category === category.id
            );

            return (
              <div key={category.id} className="relative">
                {/* Category Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-slate-100 pb-5 mb-8">
                  <div className="flex items-start sm:items-center space-x-4">
                    <span className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                          {category.label}
                        </h3>
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          {categoryTools.length} {categoryTools.length === 1 ? 'utility' : 'utilities'}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/tools?category=${category.id}`}
                    className="mt-3 sm:mt-0 text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 shrink-0"
                  >
                    <span>Filter Category</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                  </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryTools.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

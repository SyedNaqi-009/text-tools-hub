import React from 'react';
import { Container } from '../ui/Container';
import { ToolCard } from '../tools/ToolCard';
import { CATEGORIES_LIST, TextTool } from '@/lib/tools-data';

export function CategoryShowcase({ allTools }: { allTools: TextTool[] }) {
  return (
    <section className="py-16 bg-white border-t border-slate-200">
      <Container>
        <div className="space-y-16">
          {CATEGORIES_LIST.map((category) => {
            const categoryTools = allTools.filter(
              (tool) => tool.category === category.id
            );

            return (
              <div key={category.id} className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-4">
                  <div>
                    <div className="flex items-center space-x-3">
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                        {category.label}
                      </h2>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {categoryTools.length} {categoryTools.length === 1 ? 'tool' : 'tools'}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      {category.description}
                    </p>
                  </div>
                </div>

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

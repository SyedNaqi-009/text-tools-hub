import React from 'react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { ToolCard } from '../tools/ToolCard';
import { TextTool } from '@/lib/tools-data';
import { Flame, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function FeaturedTools({ tools }: { tools: TextTool[] }) {
  return (
    <section className="py-20 bg-slate-50/60 border-b border-slate-200/70">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-mono font-bold mb-3">
              <Flame className="w-3.5 h-3.5 text-indigo-600" />
              <span>Flagship Essentials</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 tracking-tight">
              Most Popular Gateway Utilities
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl">
              Engineered for writers, researchers, and engineers who require immediate, reliable text manipulation.
            </p>
          </div>
          <Link
            href="/tools"
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-sm font-bold text-indigo-600 hover:text-indigo-700"
          >
            <span>Browse All 22 Tools</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </Container>
    </section>
  );
}

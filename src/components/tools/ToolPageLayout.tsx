import React from 'react';
import { Container } from '../ui/Container';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import { FAQAccordion } from '../ui/FAQAccordion';
import { SchemaMarkup } from '../ui/SchemaMarkup';
import { ToolCard } from './ToolCard';
import { TextTool, getRelatedTools } from '@/lib/tools-data';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateSoftwareApplicationSchema,
} from '@/lib/seo';
import { ShieldCheck, Zap, Lock, Terminal, Sparkles, BookOpen } from 'lucide-react';

interface ToolPageLayoutProps {
  tool: TextTool;
  children: React.ReactNode;
}

export function ToolPageLayout({ tool, children }: ToolPageLayoutProps) {
  const relatedTools = getRelatedTools(tool.relatedSlugs);

  const breadcrumbs = [
    { name: 'Tools', url: '/tools' },
    { name: tool.name, url: `/tools/${tool.slug}` },
  ];

  const appSchema = generateSoftwareApplicationSchema({
    name: tool.name,
    slug: tool.slug,
    shortDescription: tool.shortDescription,
  });

  const faqSchema = generateFAQSchema(tool.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <div className="py-10 bg-slate-50/40 min-h-screen">
      <SchemaMarkup schema={[appSchema, faqSchema, breadcrumbSchema]} />

      <Container>
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Studio Workspace Header */}
        <div className="mb-8 p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-mono font-bold mb-3">
                <Terminal className="w-3.5 h-3.5" />
                <span>{tool.categoryLabel} Suite</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-950 leading-tight">
                {tool.name}
              </h1>

              <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                {tool.shortDescription}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
              <div className="flex items-center space-x-2 text-xs font-mono font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3.5 py-2 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% In-Browser Privacy</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono font-medium text-indigo-800 bg-indigo-50 border border-indigo-200/80 px-3.5 py-2 rounded-xl">
                <Zap className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Sub-Millisecond Engine</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Interactive Tool Workspace */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 md:p-10 mb-20 relative">
          {children}
        </div>

        {/* How to Use Section */}
        <section className="mb-20">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Workflow Instructions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-8">
            How to Use the {tool.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tool.howToUse.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs relative"
              >
                <div className="w-10 h-10 rounded-2xl bg-slate-950 text-white font-mono font-bold text-sm flex items-center justify-center mb-5 shadow-sm">
                  0{idx + 1}
                </div>
                <h3 className="font-extrabold text-slate-950 text-base mb-2">
                  Step {idx + 1}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Deep Explanatory Article Section */}
        <section className="mb-20 bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-2xs">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Technical Context & Details</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-6">
            About the {tool.name}
          </h2>
          <div className="text-slate-600 space-y-5 text-base sm:text-lg leading-relaxed whitespace-pre-line font-normal">
            {tool.intro}
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-8">
            Key Features & Capabilities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tool.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-4 p-5 rounded-2xl bg-white border border-slate-200/90"
              >
                <div className="w-6 h-6 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                  ✓
                </div>
                <span className="text-sm text-slate-700 leading-relaxed font-semibold">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-8">
            Frequently Asked Questions
          </h2>
          <FAQAccordion items={tool.faqs} />
        </section>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Recommended Related Utilities
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedTools.map((relTool) => (
                <ToolCard key={relTool.slug} tool={relTool} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}

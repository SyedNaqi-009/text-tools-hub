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
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

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
    <div className="py-8 bg-slate-50/50 min-h-screen">
      <SchemaMarkup schema={[appSchema, faqSchema, breadcrumbSchema]} />

      <Container>
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} />

        {/* H1 Title & Short Description */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>{tool.categoryLabel}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {tool.name}
          </h1>

          <p className="mt-2 text-base sm:text-lg text-slate-600 max-w-3xl">
            {tool.shortDescription}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% In-Browser Privacy</span>
            </span>
            <span className="flex items-center space-x-1">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Instant Client-Side Processing</span>
            </span>
            <span className="flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>No Sign-Up Required</span>
            </span>
          </div>
        </div>

        {/* Tool Interactive Workspace Area */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 md:p-8 mb-16">
          {children}
        </div>

        {/* How to Use Section */}
        <section className="mb-14">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
            How to Use the {tool.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tool.howToUse.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col p-6 rounded-xl bg-white border border-slate-200"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center mb-3">
                  0{idx + 1}
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  Step {idx + 1}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* About This Tool Section */}
        <section className="mb-14 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
            About the {tool.name}
          </h2>
          <div className="text-slate-600 space-y-4 text-base leading-relaxed whitespace-pre-line">
            {tool.intro}
          </div>
        </section>

        {/* Key Features Section */}
        <section className="mb-14">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
            Key Features & Capabilities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tool.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-3 p-4 rounded-xl bg-white border border-slate-200"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 leading-relaxed font-medium">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Tool FAQs Section */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <FAQAccordion items={tool.faqs} />
        </section>

        {/* Related Tools Section */}
        {relatedTools.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
              Related Text Tools
            </h2>
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

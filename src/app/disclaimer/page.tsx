import { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { constructMetadata } from '@/lib/seo';
import { AlertCircle, CheckCircle2, ShieldCheck, Scale, ExternalLink } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Disclaimer — Tool Accuracy & Professional Advice | TextToolsHub',
  description: 'Read the TextToolsHub legal and algorithmic accuracy disclaimer regarding our text transformation utilities, word counters, and calculators.',
  canonical: '/disclaimer',
});

export default function DisclaimerPage() {
  const breadcrumbs = [{ name: 'Disclaimer', url: '/disclaimer' }];

  return (
    <div className="py-12 bg-subtle-grid min-h-screen">
      <Container className="max-w-4xl">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Banner */}
        <div className="relative mb-12 p-8 sm:p-12 rounded-3xl bg-slate-950 text-white overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold tracking-wide uppercase mb-4">
              <AlertCircle className="w-3.5 h-3.5 text-indigo-400" />
              <span>Studio Algorithmic Transparency</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Algorithmic <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-200 to-indigo-100">Accuracy & Disclaimer</span>
            </h1>
            <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Understand our mathematical methodologies, computational variance across word processor engines, and general use boundaries.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Deterministic Client Algorithms
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <Scale className="w-3.5 h-3.5 text-indigo-400" /> General Educational Assistance
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-lg space-y-10 text-slate-700 leading-relaxed text-base">
          <section className="space-y-4">
            <div className="flex items-center space-x-3 text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h2 className="text-xl font-bold tracking-tight">General Information Disclaimer</h2>
            </div>
            <p>
              The information and tools provided by <strong>TextToolsHub</strong> on <span className="font-mono text-indigo-600">https://texttoolshub.com</span> are published in good faith for general educational, editorial, and productivity assistance only. All information is provided on an as-is basis without warranties of completeness or timeliness.
            </p>
          </section>

          <div className="h-px bg-slate-100" />

          <section className="space-y-4">
            <div className="flex items-center space-x-3 text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h2 className="text-xl font-bold tracking-tight">Tool Accuracy & Software Variance</h2>
            </div>
            <p>
              While our text processing algorithms are engineered in strict accordance with standard linguistic, typesetting, and mathematical rules, results may exhibit slight variations when benchmarked against proprietary third-party software:
            </p>
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm">
                <strong className="text-slate-900 block mb-1">Word & Character Tokenization:</strong>
                Different software suites (such as Microsoft Word, Google Docs, Apple Pages, and LaTeX) implement proprietary tokenization rules for hyphenated compounds, punctuation boundaries, em-dashes, and non-breaking spaces. Minor count variances can occur across tools.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm">
                <strong className="text-slate-900 block mb-1">Reading & Speaking Pacing:</strong>
                Pacing estimates are calculated based on general adult reading averages (238 WPM silent reading; 150 WPM public speaking). Actual speeds depend on cognitive fatigue, technical subject complexity, and audience familiarity.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm">
                <strong className="text-slate-900 block mb-1">Diff Checker & File Comparison:</strong>
                Our diff comparison utilizes Myers &amp; Longest Common Subsequence (LCS) algorithms. Users must independently verify critical revisions in legal, medical, or financial contracts.
              </div>
            </div>
          </section>

          <div className="h-px bg-slate-100" />

          <section className="space-y-4">
            <div className="flex items-center space-x-3 text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h2 className="text-xl font-bold tracking-tight">Not Professional Legal or Financial Advice</h2>
            </div>
            <p>
              Nothing contained within TextToolsHub or our written guides constitutes formal legal, financial, medical, or academic counsel. If you require authoritative contract review or legal verification, consult a licensed attorney or certified legal professional.
            </p>
          </section>

          <div className="h-px bg-slate-100" />

          <section className="space-y-4">
            <div className="flex items-center space-x-3 text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h2 className="text-xl font-bold tracking-tight">External Links & References</h2>
            </div>
            <p>
              TextToolsHub may contain outbound links to external third-party documentation, specifications, or repositories. We have no control over the content, privacy policies, or runtime practices of third-party websites and assume no liability for external services.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}

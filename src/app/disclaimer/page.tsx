import { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Disclaimer — Tool Accuracy & Professional Advice | TextToolsHub',
  description: 'Read the TextToolsHub legal and algorithmic accuracy disclaimer regarding our text transformation utilities, word counters, and calculators.',
  canonical: '/disclaimer',
});

export default function DisclaimerPage() {
  const breadcrumbs = [{ name: 'Disclaimer', url: '/disclaimer' }];

  return (
    <div className="py-12 bg-white min-h-screen">
      <Container className="max-w-4xl">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Legal Disclaimers
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Website Disclaimer
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Last Updated: March 2026
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed text-base">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. General Information Disclaimer</h2>
            <p>
              The information and tools provided by <strong>TextToolsHub</strong> on https://texttoolshub.com are published in good faith for general educational, editorial, and productivity assistance only. All information is provided on an as-is basis without warranties of completeness or timeliness.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. Tool Accuracy & Algorithmic Variation</h2>
            <p>
              While our text processing algorithms are engineered in strict accordance with standard linguistic, typesetting, and mathematical rules, results may vary compared to specific third-party applications:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Word Counters:</strong> Different software suites (such as Microsoft Word, Google Docs, Apple Pages, and LaTeX) implement proprietary tokenization rules for hyphenated compounds, punctuation boundaries, and non-breaking spaces. Counts may differ by a slight margin.
              </li>
              <li>
                <strong>Reading & Speaking Time:</strong> Pacing estimates are calculated based on general adult reading averages (238 WPM silent reading; 150 WPM public speaking). Actual speeds depend on cognitive fatigue, technical subject complexity, and audience familiarity.
              </li>
              <li>
                <strong>Diff Checker:</strong> Our diff comparison utilizes Longest Common Subsequence (LCS) algorithms. Users must independently verify critical revisions in legal or financial contracts.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. Not Professional Legal or Financial Advice</h2>
            <p>
              Nothing contained within TextToolsHub or our written guides constitutes legal, financial, or academic counsel. If you require authoritative contract review or legal verification, consult a licensed attorney or certified legal professional.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. External Links Disclaimer</h2>
            <p>
              TextToolsHub may contain links to external third-party websites or services. We have no control over the content, privacy policies, or practices of any third-party websites and assume no liability for them.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}

import { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { constructMetadata } from '@/lib/seo';
import { FileText, ShieldAlert, CheckCircle2, Scale } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Terms & Conditions — Terms of Service | TextToolsHub',
  description: 'Read the Terms & Conditions governing your use of TextToolsHub free text manipulation tools and online utilities.',
  canonical: '/terms-and-conditions',
});

export default function TermsPage() {
  const breadcrumbs = [{ name: 'Terms & Conditions', url: '/terms-and-conditions' }];

  return (
    <div className="py-12 bg-subtle-grid min-h-screen">
      <Container className="max-w-4xl">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Banner */}
        <div className="relative mb-12 p-8 sm:p-12 rounded-3xl bg-slate-950 text-white overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold tracking-wide uppercase mb-4">
              <Scale className="w-3.5 h-3.5 text-indigo-400" />
              <span>Studio Legal Governance</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-200 to-indigo-100">Service</span>
            </h1>
            <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Transparent terms governing your usage of TextToolsHub client-side applications, calculators, and content formatting tools.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Free for Personal & Commercial Use
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <FileText className="w-3.5 h-3.5 text-indigo-400" /> 100% User Content Ownership
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
              <h2 className="text-xl font-bold tracking-tight">Acceptance of Terms</h2>
            </div>
            <p>
              By accessing and using <strong>TextToolsHub</strong> (accessible at <span className="font-mono text-indigo-600">https://texttoolshub.com</span>), you acknowledge and agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please discontinue using the website and our utilities immediately.
            </p>
          </section>

          <div className="h-px bg-slate-100" />

          <section className="space-y-4">
            <div className="flex items-center space-x-3 text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h2 className="text-xl font-bold tracking-tight">Free Use License</h2>
            </div>
            <p>
              TextToolsHub grants you a revocable, non-exclusive, non-transferable, and royalty-free license to use all text manipulation utilities, converters, calculators, and educational guides for personal, educational, research, and commercial purposes.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm space-y-2">
              <span className="font-bold text-slate-900 block">Prohibited Misuse:</span>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Attempting to scrape or flood site infrastructure with denial-of-service queries.</li>
                <li>Redistributing proprietary visual design assets or editorial articles without appropriate attribution.</li>
                <li>Executing malicious or automated attacks against the web hosting origin.</li>
              </ul>
            </div>
          </section>

          <div className="h-px bg-slate-100" />

          <section className="space-y-4">
            <div className="flex items-center space-x-3 text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h2 className="text-xl font-bold tracking-tight">Intellectual Property Rights Over Your Data</h2>
            </div>
            <p>
              You retain 100% full, exclusive ownership and intellectual property rights over any text, code, document, or data that you paste, manipulate, or generate through TextToolsHub. Because our services execute client-side, we never claim ownership, copyright, or possession of your materials.
            </p>
          </section>

          <div className="h-px bg-slate-100" />

          <section className="space-y-4">
            <div className="flex items-center space-x-3 text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h2 className="text-xl font-bold tracking-tight">Disclaimer of Warranties</h2>
            </div>
            <p>
              The tools, calculators, algorithms, and documentation on this website are provided strictly on an <strong>&ldquo;as-is&rdquo;</strong> and <strong>&ldquo;as-available&rdquo;</strong> basis without warranty of any kind, either express or implied.
            </p>
            <p className="text-sm text-slate-600">
              While we take pride in rigorous algorithmic correctness, TextToolsHub makes no guarantees regarding 100% error-free operation or fitness for a particular legal, financial, or academic purpose.
            </p>
          </section>

          <div className="h-px bg-slate-100" />

          <section className="space-y-4">
            <div className="flex items-center space-x-3 text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
                05
              </div>
              <h2 className="text-xl font-bold tracking-tight">Limitation of Liability</h2>
            </div>
            <p>
              In no event shall TextToolsHub, its developers, or its affiliates be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use or inability to use our tools or reliance on results generated by our website.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}

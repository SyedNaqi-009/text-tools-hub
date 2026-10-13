import { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { constructMetadata } from '@/lib/seo';
import { ShieldCheck, Lock, EyeOff, ServerOff, FileCheck } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy — 100% Client-Side Privacy Guarantee',
  description: 'Read the TextToolsHub Privacy Policy. All text transformations execute purely in your browser runtime. We never store, log, or transmit your private text.',
  canonical: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  const breadcrumbs = [{ name: 'Privacy Policy', url: '/privacy-policy' }];

  return (
    <div className="py-12 bg-subtle-grid min-h-screen">
      <Container className="max-w-4xl">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Banner */}
        <div className="relative mb-12 p-8 sm:p-12 rounded-3xl bg-slate-950 text-white overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold tracking-wide uppercase mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Studio Privacy & Compliance</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Privacy Policy & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-200 to-indigo-100">Zero-Log Guarantee</span>
            </h1>
            <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              TextToolsHub operates on a zero-server-transmission architecture. All processing is confined strictly to your client browser sandbox.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <Lock className="w-3.5 h-3.5 text-emerald-400" /> Client-Side Sandbox Only
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <ServerOff className="w-3.5 h-3.5 text-indigo-400" /> Zero Remote Database Storage
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <FileCheck className="w-3.5 h-3.5 text-sky-400" /> Updated: March 2026
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
              <h2 className="text-xl font-bold tracking-tight">Our Core Privacy Commitment</h2>
            </div>
            <p>
              At <strong>TextToolsHub</strong> (accessible from <span className="font-mono text-indigo-600">https://texttoolshub.com</span>), the privacy and integrity of your data is our foundational design principle. All text transformations, calculations, diff comparisons, and encoding algorithms execute <strong>100% locally within your device&apos;s browser memory</strong>.
            </p>
            <p>
              When you paste or type text into our Word Counter, Diff Checker, Case Converter, or any of our 22 utilities, your content is never transmitted across the network, never sent to third-party language model endpoints, and never retained on remote disks or databases.
            </p>
          </section>

          <div className="h-px bg-slate-100" />

          <section className="space-y-4">
            <div className="flex items-center space-x-3 text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h2 className="text-xl font-bold tracking-tight">Information We Do Not Collect</h2>
            </div>
            <p>Because all utilities execute within your local web browser sandbox, we never store, inspect, or retain:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start space-x-3">
                <EyeOff className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-800">Your text input, essays, manuscripts, or code files</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start space-x-3">
                <EyeOff className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-800">Transformed results, diff reports, or calculated metrics</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start space-x-3">
                <EyeOff className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-800">Passwords, API keys, credentials, or personal names</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start space-x-3">
                <EyeOff className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-800">Clipboard buffer contents beyond manual user actions</span>
              </div>
            </div>
          </section>

          <div className="h-px bg-slate-100" />

          <section className="space-y-4">
            <div className="flex items-center space-x-3 text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h2 className="text-xl font-bold tracking-tight">Log Files & Anonymous Web Telemetry</h2>
            </div>
            <p>
              Like most internet websites, hosting edge networks (such as Vercel) automatically record anonymous HTTP routing telemetry in server logs when a page asset is delivered. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
              <li>Internet Protocol (IP) address (anonymized/truncated).</li>
              <li>Browser user-agent, operating system, and architecture.</li>
              <li>Timestamp of static file request and response codes.</li>
              <li>Referring URLs and edge cache hit performance.</li>
            </ul>
            <p className="text-sm">
              This telemetry is used strictly for edge caching reliability, DDoS defense, and infrastructure monitoring. It is completely disconnected from your text manipulations.
            </p>
          </section>

          <div className="h-px bg-slate-100" />

          <section className="space-y-4">
            <div className="flex items-center space-x-3 text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h2 className="text-xl font-bold tracking-tight">Cookies and Future Advertising Partners</h2>
            </div>
            <p>
              TextToolsHub does not use tracking cookies for core functionality. Future monetization partners (such as Google AdSense) or privacy-preserving web analytics may utilize standard functional cookies to serve relevant contextual advertising or quantify site traffic trends. You retain full control to reject or clear cookies in your browser settings.
            </p>
          </section>

          <div className="h-px bg-slate-100" />

          <section className="space-y-4">
            <div className="flex items-center space-x-3 text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
                05
              </div>
              <h2 className="text-xl font-bold tracking-tight">Inquiries Regarding Privacy</h2>
            </div>
            <p>
              If you require additional verification regarding our client-side runtime implementation, reach out to our team at{' '}
              <a href="mailto:contact@texttoolshub.com" className="font-semibold text-indigo-600 hover:text-indigo-800 underline underline-offset-4">
                contact@texttoolshub.com
              </a>.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}

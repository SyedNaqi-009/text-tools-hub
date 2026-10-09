import { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy — 100% Client-Side Privacy Guarantee',
  description: 'Read the TextToolsHub Privacy Policy. All text transformations execute purely in your browser runtime. We never store, log, or transmit your private text.',
  canonical: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  const breadcrumbs = [{ name: 'Privacy Policy', url: '/privacy-policy' }];

  return (
    <div className="py-12 bg-white min-h-screen">
      <Container className="max-w-4xl">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Legal & Compliance
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Last Updated: March 2026
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed text-base">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Our Core Privacy Commitment</h2>
            <p>
              At <strong>TextToolsHub</strong> (accessible from https://texttoolshub.com), the privacy of our visitors is of paramount importance. Our foundational architecture is built around a single premise: <strong>all text transformations, calculations, and analyses execute 100% locally on your client device</strong> using client-side JavaScript.
            </p>
            <p>
              When you paste or type text into our Word Counter, Diff Checker, Case Converter, or any of our 22 utilities, your content is never transmitted across the internet, never sent to external APIs, and never written to remote server disks or databases.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. Information We Do Not Collect</h2>
            <p>Because all utilities run entirely within your local browser sandbox, we do not collect, store, inspect, or retain:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Text input contents, documents, essays, or code files.</li>
              <li>Calculated output statistics or transformed strings.</li>
              <li>Personal identifiers like names, passwords, credit cards, or account credentials.</li>
              <li>Clipboard contents beyond explicit user interactions.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. Log Files & Anonymous Web Analytics</h2>
            <p>
              Like most standard websites, our hosting infrastructure may automatically receive and record anonymous technical request metadata in web server logs when you load a page. This may include:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Internet Protocol (IP) address (anonymized where possible).</li>
              <li>Browser type and version.</li>
              <li>Operating system.</li>
              <li>Date and time stamp of page requests.</li>
              <li>Referring and exit URLs.</li>
            </ul>
            <p>
              This technical information is utilized strictly to monitor server uptime, diagnose infrastructure anomalies, and optimize content delivery performance. It is never linked to individual user identities or text tool inputs.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. Cookies and Web Beacons</h2>
            <p>
              TextToolsHub does not use intrusive tracking cookies. In the future, third-party advertising partners (such as Google AdSense) or privacy-preserving analytics providers may set standard functional cookies to serve contextual advertising or measure anonymous aggregate traffic metrics. You have the right to disable or filter cookies through your individual browser options.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">5. Children&apos;s Information</h2>
            <p>
              Protecting children while using the internet is especially important to us. TextToolsHub does not knowingly collect any personally identifiable information from children under the age of 13.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">6. Contacting Us Regarding Privacy</h2>
            <p>
              If you have additional questions or require more information about our Privacy Policy, please contact our team via email at <strong>contact@texttoolshub.com</strong>.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}

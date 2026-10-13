import { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/ui/SchemaMarkup';
import { constructMetadata, generateBreadcrumbSchema, generateOrganizationSchema } from '@/lib/seo';
import { ShieldCheck, Zap, Heart, CheckCircle2, Terminal } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'About Us — High-Precision Client-Side Text Engine',
  description: 'Learn about TextToolsHub Studio, our mission to provide lightning-fast, 100% private client-side text manipulation utilities without advertisements or registrations.',
  canonical: '/about',
});

export default function AboutPage() {
  const breadcrumbs = [{ name: 'About Us', url: '/about' }];

  const orgSchema = generateOrganizationSchema();
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <div className="py-14 bg-white min-h-screen">
      <SchemaMarkup schema={[orgSchema, breadcrumbSchema]} />
      <Container className="max-w-4xl">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mb-14 p-10 rounded-3xl bg-slate-900 text-white relative overflow-hidden">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-medium mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>Studio Engineering Manifesto</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            About TextToolsHub Studio
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            A purpose-built, high-performance workspace for authors, editors, developers, and researchers who require total cryptographic privacy and instant processing.
          </p>
        </div>

        <div className="space-y-12 text-slate-700 leading-relaxed text-base sm:text-lg font-normal">
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Our Core Mission</h2>
            <p>
              In our day-to-day work writing documentation, drafting contracts, formatting databases, and coding applications, we noticed that existing online text utilities were plagued with severe user-experience flaws: intrusive banner ads, slow server-side page reloads, and sketchy third-party backend logging.
            </p>
            <p>
              We established <strong>TextToolsHub</strong> as a modern, clean, and uncompromisingly private alternative: instant client-side execution, a sleek workspace interface, and absolute data protection.
            </p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-10 not-prose">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-950 text-lg mb-2">100% In-Browser</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                All algorithms execute purely inside your local browser memory. Zero server uploads or remote logging.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 font-bold">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-950 text-lg mb-2">Zero Latency</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Optimized JavaScript routines provide real-time updates as you type with sub-millisecond responsiveness.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 font-bold">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-950 text-lg mb-2">Always Free</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                No subscription paywalls, no artificial daily quotas, and no mandatory account creation required.
              </p>
            </div>
          </section>

          <section className="space-y-4 pt-6 border-t border-slate-200">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">The Studio Team</h2>
            <p>
              TextToolsHub is engineered and maintained by a distributed collective of software architects, writers, and UX specialists dedicated to advancing open, privacy-first web utilities.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}

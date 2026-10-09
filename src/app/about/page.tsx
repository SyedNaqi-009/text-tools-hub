import { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/ui/SchemaMarkup';
import { constructMetadata, generateBreadcrumbSchema, generateOrganizationSchema } from '@/lib/seo';
import { ShieldCheck, Zap, Heart, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'About Us — Free, Fast & Private Text Tools',
  description: 'Learn about TextToolsHub, our mission to provide lightning-fast, 100% private client-side text manipulation utilities without advertisements or registrations.',
  canonical: '/about',
});

export default function AboutPage() {
  const breadcrumbs = [{ name: 'About Us', url: '/about' }];

  const orgSchema = generateOrganizationSchema();
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <div className="py-12 bg-white min-h-screen">
      <SchemaMarkup schema={[orgSchema, breadcrumbSchema]} />
      <Container className="max-w-4xl">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mb-10 text-center sm:text-left">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Our Mission & Philosophy
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            About TextToolsHub
          </h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Building a fast, clean, and genuinely private workspace for writers, developers, students, and content creators worldwide.
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Why We Built TextToolsHub</h2>
            <p>
              In our daily work as engineers, researchers, and copywriters, we constantly found ourselves needing small text transformations: counting words for an article, verifying character counts for social cards, converting variables between camelCase and snake_case, or stripping formatting garbage from PDF copy.
            </p>
            <p>
              However, the existing online text tools landscape was disappointing. Most legacy sites are cluttered with intrusive pop-up ads, slow page loads, tracking scripts, and outdated user interfaces from the early 2010s. More concerningly, many tools upload user inputs to remote backend servers to perform transformations that modern browsers can execute locally in milliseconds.
            </p>
            <p>
              We built <strong>TextToolsHub</strong> to offer a modern, dignified alternative: clean editorial design, zero clutter, instant execution, and an uncompromising commitment to privacy.
            </p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-10 not-prose">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">100% Client-Side</h3>
              <p className="text-sm text-slate-600">
                All 22 text tools run directly inside your browser. No server logging, no remote database storage, and no tracking cookies.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Zero Latency</h3>
              <p className="text-sm text-slate-600">
                Lightweight algorithms built with TypeScript and modern web standards provide real-time updates as you type.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-3">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Completely Free</h3>
              <p className="text-sm text-slate-600">
                No paywalls, subscription tiers, artificial usage caps, or mandatory account creation required.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">What We Offer</h2>
            <p>
              Our toolkit covers 22 specialized utilities across six primary categories:
            </p>
            <ul className="space-y-2 list-none pl-0">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Text Analysis:</strong> Word counters, character limits, keyword density analyzers, and reading time calculators.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Text Transformation:</strong> 11-style case converters, text reversers, repeaters, URL slug makers, and number-to-words.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Text Cleaning:</strong> Duplicate line removers, whitespace cleaners, empty line purgers, and regex find-and-replace.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Text Formatting:</strong> Multi-mode alphabetical/numerical line sorting, line numbering, affixes, and side-by-side diff checkers.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Writing & SEO:</strong> Customizable Lorem Ipsum generator and real-time Google SERP meta snippet tester.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Developer & Encoding:</strong> Text to 8-bit binary and ASCII conversion with detailed hexadecimal tables.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-4 pt-6 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">The Team</h2>
            <p>
              TextToolsHub is engineered and maintained by a distributed group of software developers, writers, and digital product designers passionate about open web standards. We believe everyday productivity utilities should be fast, elegant, and respectful of user privacy.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}

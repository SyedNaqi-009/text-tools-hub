import React from 'react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Shield, Zap, UserCheck, Smartphone } from 'lucide-react';

const FEATURES = [
  {
    icon: Shield,
    title: '100% Client-Side Privacy',
    description:
      'Every transformation occurs exclusively within your local web browser. Your sensitive manuscripts, passwords, and data never touch our servers.',
  },
  {
    icon: Zap,
    title: 'Instant Execution',
    description:
      'Zero network latency or roundtrip file uploads. Results compute in milliseconds using modern JavaScript algorithms with immediate responsiveness.',
  },
  {
    icon: UserCheck,
    title: 'No Registration Required',
    description:
      'Access every utility freely without signing up, creating accounts, entering credit card numbers, or validating email addresses.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Workspace',
    description:
      'Engineered with dedicated responsive controls that adapt seamlessly whether you are editing on a smartphone, tablet, or desktop workstation.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 bg-slate-50/70 border-t border-slate-200">
      <Container>
        <SectionHeading
          title="Why Choose TextToolsHub?"
          subtitle="Built to overcome the slow loading times, invasive trackers, and cluttered interfaces typical of legacy text sites."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-500/40 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

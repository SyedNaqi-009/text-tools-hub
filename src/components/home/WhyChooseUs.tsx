import React from 'react';
import { Container } from '../ui/Container';
import { ShieldCheck, Cpu, Lock, Sparkles } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: 'Client-Side Privacy Guarantee',
    description:
      'All text analysis, case conversions, and diff inspections occur directly inside your web browser’s JavaScript engine. Zero bytes are uploaded to remote servers.',
  },
  {
    icon: Cpu,
    title: 'Zero-Latency Engine',
    description:
      'No slow API roundtrips or server-side queues. Designed for immediate execution and debounced for handling large multi-megabyte text datasets.',
  },
  {
    icon: Lock,
    title: 'No Accounts or Paywalls',
    description:
      'Unlimited, unrestricted utility access. No email verification, sign-ups, subscriptions, or intrusive pop-up paywalls required.',
  },
  {
    icon: Sparkles,
    title: 'Studio Ergonomics',
    description:
      'Clean typography, monospace data fields, one-click clipboard copying, and responsive layouts fine-tuned across mobile, tablet, and desktop.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400">
            Engineered Differently
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mt-3">
            Built for Extreme Speed & Total Privacy
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Unlike legacy ad-bloated text tool sites, TextToolsHub delivers an uncompromising professional experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {HIGHLIGHTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-500">
                  Standard Guarantee #0{idx + 1}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '../ui/Container';
import { Shield, Sparkles, Terminal, ArrowUpRight } from 'lucide-react';
import { CATEGORIES_LIST, TOOLS_DATA } from '@/lib/tools-data';

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 mt-28 relative overflow-hidden">
      {/* Decorative gradient aura */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative pt-16 pb-12">
        {/* Top Header Card */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 mb-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Text Engine · Privacy Assured</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
              Instant, Private & Free Text Utilities
            </h3>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Zero cloud uploads. Zero data retention. Built strictly for writers, developers, and creators who value simplicity and performance.
            </p>
          </div>
          <Link
            href="/tools"
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-sm transition-all shadow-md shrink-0"
          >
            <span>Explore All 22 Tools</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Multi-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4 pr-6">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-serif font-black text-base">
                T
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                TextTools<span className="text-indigo-400 font-light">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The premier client-side textual workspace. Engineered for privacy, speed, and accuracy across every text manipulation task.
            </p>
            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-lg w-fit">
              <Shield className="w-3.5 h-3.5 shrink-0" />
              <span>100% Client-Side Execution Guarantee</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest font-mono mb-4">
              Tool Suites
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {CATEGORIES_LIST.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/tools?category=${cat.id}`}
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest font-mono mb-4">
              Gateway Utilities
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {TOOLS_DATA.slice(0, 6).map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest font-mono mb-4">
              Resources & Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-indigo-400 transition-colors">
                  About Studio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-400 transition-colors">
                  Contact & Feedback
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-indigo-400 transition-colors">
                  Guides & Tutorials
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-indigo-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-indigo-400 transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-4 sm:space-y-0">
          <p>© {currentYear} TextToolsHub Studio. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5 font-mono text-slate-400">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Pure Client-Side Engine</span>
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

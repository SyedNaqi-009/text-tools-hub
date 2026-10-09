'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '../ui/Container';
import { FileText, Shield, Heart } from 'lucide-react';
import { CATEGORIES_LIST, TOOLS_DATA } from '@/lib/tools-data';

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <Container className="pt-16 pb-12">
        {/* Multi-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4 pr-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                TextTools<span className="text-emerald-400">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Free, lightning-fast text manipulation utilities designed for writers, editors, programmers, and students. 100% private with pure client-side processing — your text never leaves your device.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-lg w-fit">
              <Shield className="w-3.5 h-3.5 shrink-0" />
              <span>Zero server logging · 100% In-Browser Privacy</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {CATEGORIES_LIST.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/tools?category=${cat.id}`}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Popular Tools
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {TOOLS_DATA.slice(0, 6).map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Company & Legal
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-emerald-400 transition-colors">
                  Writing & SEO Blog
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-emerald-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-emerald-400 transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-4 sm:space-y-0">
          <p>© {currentYear} TextToolsHub. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Built with focus on speed, privacy, and simplicity</span>
            <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500 inline ml-1" />
          </p>
        </div>
      </Container>
    </footer>
  );
}

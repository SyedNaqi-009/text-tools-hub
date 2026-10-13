'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '../ui/Container';
import {
  Menu,
  X,
  Type,
  Search,
  ChevronDown,
  Sparkles,
  Command,
} from 'lucide-react';
import { CATEGORIES_LIST } from '@/lib/tools-data';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Distinctive Editorial Monogram Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-white font-serif font-black text-xl shadow-md group-hover:bg-indigo-600 transition-all duration-300 transform group-hover:scale-105 border border-slate-800">
              <span className="bg-gradient-to-tr from-indigo-400 to-indigo-200 bg-clip-text text-transparent">T</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                TextTools<span className="text-indigo-600 font-light">Hub</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-400 -mt-1 font-mono">
                Studio Edition
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-medium text-slate-600">
            <Link
              href="/"
              className="hover:text-indigo-600 transition-colors py-1 relative font-semibold text-slate-900"
            >
              Home
            </Link>

            {/* Categories Mega Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                onBlur={() => setTimeout(() => setCategoriesDropdownOpen(false), 200)}
                className="flex items-center space-x-1.5 hover:text-indigo-600 transition-colors py-1 focus:outline-none"
              >
                <span>Tool Suites</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${categoriesDropdownOpen ? 'rotate-180 text-indigo-600' : ''}`} />
              </button>

              {categoriesDropdownOpen && (
                <div className="absolute left-0 mt-3 w-64 rounded-2xl bg-white border border-slate-200 shadow-xl py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 pb-2 mb-1 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Categories</span>
                    <span className="text-[10px] font-mono bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded">6 Suites</span>
                  </div>
                  {CATEGORIES_LIST.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/tools?category=${cat.id}`}
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-indigo-50/80 hover:text-indigo-700 transition-colors"
                      onClick={() => setCategoriesDropdownOpen(false)}
                    >
                      <span>{cat.label}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Explore →</span>
                    </Link>
                  ))}
                  <div className="border-t border-slate-100 mt-2 pt-2 px-3">
                    <Link
                      href="/tools"
                      className="flex items-center justify-center w-full py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs"
                      onClick={() => setCategoriesDropdownOpen(false)}
                    >
                      Browse All 22 Utilities
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/tools"
              className="hover:text-indigo-600 transition-colors py-1"
            >
              All Utilities
            </Link>

            <Link
              href="/blog"
              className="hover:text-indigo-600 transition-colors py-1"
            >
              Articles & Guides
            </Link>

            <Link
              href="/about"
              className="hover:text-indigo-600 transition-colors py-1"
            >
              About
            </Link>
          </nav>

          {/* Quick Search Action Link */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/tools"
              className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl border border-slate-200/90 text-xs font-semibold text-slate-700 bg-slate-50/80 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-all shadow-2xs"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search Utilities</span>
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded">
                ⌘K
              </kbd>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-900" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4 space-y-2 bg-white animate-in fade-in duration-150">
            <Link
              href="/"
              className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/tools"
              className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              All 22 Text Utilities
            </Link>
            <div className="px-3 py-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                Tool Suites
              </span>
              <div className="mt-2 pl-3 space-y-1.5 border-l-2 border-indigo-100">
                {CATEGORIES_LIST.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/tools?category=${cat.id}`}
                    className="block py-1 text-sm text-slate-600 hover:text-indigo-600 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/blog"
              className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Guides & Blog
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Studio
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Support
            </Link>
          </div>
        )}
      </Container>
    </header>
  );
}

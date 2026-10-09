'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '../ui/Container';
import {
  Menu,
  X,
  FileText,
  Search,
  ChevronDown,
} from 'lucide-react';
import { CATEGORIES_LIST } from '@/lib/tools-data';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-emerald-700 transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                TextTools<span className="text-emerald-600">Hub</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-700">
            <Link
              href="/"
              className="hover:text-emerald-700 transition-colors py-1"
            >
              Home
            </Link>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                onBlur={() => setTimeout(() => setCategoriesDropdownOpen(false), 200)}
                className="flex items-center space-x-1 hover:text-emerald-700 transition-colors py-1 focus:outline-none"
              >
                <span>Categories</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {categoriesDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-xl bg-white border border-slate-200 shadow-lg py-2 z-50">
                  {CATEGORIES_LIST.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/tools?category=${cat.id}`}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                      onClick={() => setCategoriesDropdownOpen(false)}
                    >
                      {cat.label}
                    </Link>
                  ))}
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <Link
                      href="/tools"
                      className="block px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
                      onClick={() => setCategoriesDropdownOpen(false)}
                    >
                      Browse All 22 Tools →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/tools"
              className="hover:text-emerald-700 transition-colors py-1"
            >
              All Tools
            </Link>

            <Link
              href="/blog"
              className="hover:text-emerald-700 transition-colors py-1"
            >
              Blog
            </Link>

            <Link
              href="/about"
              className="hover:text-emerald-700 transition-colors py-1"
            >
              About
            </Link>
          </nav>

          {/* Quick Search Action Link */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/tools"
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 transition-all"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search Tools...</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-800" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-3 space-y-1 bg-white">
            <Link
              href="/"
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/tools"
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              All 22 Text Tools
            </Link>
            <div className="px-3 py-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Categories
              </span>
              <div className="mt-1 pl-2 space-y-1 border-l-2 border-slate-100">
                {CATEGORIES_LIST.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/tools?category=${cat.id}`}
                    className="block py-1 text-sm text-slate-600 hover:text-emerald-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/blog"
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </Container>
    </header>
  );
}

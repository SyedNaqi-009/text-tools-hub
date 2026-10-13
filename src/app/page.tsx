'use client';

import React, { useState } from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedTools } from '@/components/home/FeaturedTools';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { BlogCard } from '@/components/blog/BlogCard';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SchemaMarkup } from '@/components/ui/SchemaMarkup';
import { ToolCard } from '@/components/tools/ToolCard';
import { TOOLS_DATA } from '@/lib/tools-data';
import {
  generateFAQSchema,
  generateOrganizationSchema,
  generateWebsiteSchema,
} from '@/lib/seo';
import Link from 'next/link';
import { ArrowRight, BookOpen, Sparkles, Terminal } from 'lucide-react';

const HOMEPAGE_FAQS = [
  {
    question: 'Are all text tools on TextToolsHub completely free to use?',
    answer:
      'Yes, 100%. Every utility on TextToolsHub is entirely free with unlimited usage. There are no paid tiers, subscriptions, or hidden limits.',
  },
  {
    question: 'How do you guarantee my text privacy?',
    answer:
      'Every tool runs strictly client-side using JavaScript inside your web browser. Your text never leaves your computer or phone, meaning our servers never see, store, or process your inputs.',
  },
  {
    question: 'Do I need to create an account or log in?',
    answer:
      'No registration is required. You can start manipulating, converting, or counting text immediately upon loading the site.',
  },
  {
    question: 'Can I use these tools on mobile devices and tablets?',
    answer:
      'Yes! All tools are built with mobile-first responsive interfaces, allowing smooth editing on iPhone, Android, iPads, and desktop workstations.',
  },
  {
    question: 'Is there a limit on how much text I can process at once?',
    answer:
      'You can comfortably process tens of thousands of words in a single paste. For very large inputs (over 10,000 characters), operations are debounced to ensure smooth performance.',
  },
  {
    question: 'Can I use the generated results in commercial publications or software?',
    answer:
      'Yes. You retain full, exclusive ownership of all text, code, and documents processed through TextToolsHub.',
  },
];

const LATEST_POSTS = [
  {
    slug: 'how-to-count-words-and-characters-online',
    title: 'How to Count Words and Characters Online — A Complete Guide',
    date: '2026-03-01',
    excerpt: 'Learn how word and character counters work, why counts differ across text editors, and how to stay within strict length limits for school and work.',
    readTime: '6 min read',
    author: 'TextToolsHub Team',
    content: '',
  },
  {
    slug: 'word-count-vs-character-count',
    title: "Word Count vs Character Count: What's the Difference and When Each Matters",
    date: '2026-03-02',
    excerpt: 'Understand the key differences between word counts and character counts, and learn which metric to prioritize for academic papers, social media, and SEO.',
    readTime: '5 min read',
    author: 'TextToolsHub Team',
    content: '',
  },
  {
    slug: 'how-to-convert-text-case',
    title: 'How to Convert Text Case: Uppercase, Lowercase, Title Case & More',
    date: '2026-03-03',
    excerpt: 'Master all major text capitalization formats: Title Case rules, Sentence case, UPPERCASE, and programmer cases like camelCase, snake_case, and kebab-case.',
    readTime: '6 min read',
    author: 'TextToolsHub Team',
    content: '',
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredSlugs = [
    'word-counter',
    'character-counter',
    'case-converter',
    'remove-duplicate-lines',
    'text-compare',
    'lorem-ipsum-generator',
  ];
  const featuredTools = TOOLS_DATA.filter((tool) =>
    featuredSlugs.includes(tool.slug)
  );

  const filteredTools = searchQuery.trim()
    ? TOOLS_DATA.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const websiteSchema = generateWebsiteSchema();
  const organizationSchema = generateOrganizationSchema();
  const faqSchema = generateFAQSchema(HOMEPAGE_FAQS);

  return (
    <div>
      <SchemaMarkup schema={[websiteSchema, organizationSchema, faqSchema]} />

      {/* Hero Section */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Live search results overlay if query exists */}
      {searchQuery.trim() ? (
        <section className="py-16 bg-white min-h-[50vh]">
          <Container>
            <div className="flex items-center justify-between mb-8 p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100">
              <div className="flex items-center space-x-3">
                <Terminal className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                  Search Query Results ({filteredTools.length})
                </h2>
              </div>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-mono font-bold text-indigo-700 hover:underline px-3 py-1.5 bg-white rounded-lg border border-indigo-200"
              >
                Clear Filter
              </button>
            </div>

            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 max-w-md mx-auto">
                <p className="text-slate-600 font-medium">
                  No text utilities match &quot;{searchQuery}&quot;.
                </p>
                <Link
                  href="/tools"
                  className="mt-4 inline-block text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl transition-colors"
                >
                  Browse all 22 text tools →
                </Link>
              </div>
            )}
          </Container>
        </section>
      ) : (
        <>
          {/* Flagship Essentials */}
          <FeaturedTools tools={featuredTools} />

          {/* 6 Category Architecture */}
          <CategoryShowcase allTools={TOOLS_DATA} />

          {/* Precision Architectural Guarantees */}
          <WhyChooseUs />

          {/* Editorial Guides & Publications */}
          <section className="py-24 bg-white border-b border-slate-200/80">
            <Container>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
                <div>
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-mono font-bold mb-3">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Educational Resources</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                    Authoritative Guides & Best Practices
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-slate-600">
                    Comprehensive tutorials on text analytics, search engine optimization, and data formatting.
                  </p>
                </div>
                <Link
                  href="/blog"
                  className="mt-4 sm:mt-0 inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-800"
                >
                  <span>Explore All 10 Guides</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {LATEST_POSTS.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </Container>
          </section>

          {/* FAQ Accordion Section */}
          <section className="py-24 bg-slate-50/60">
            <Container className="max-w-4xl">
              <div className="text-center mb-12">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600">
                  Common Inquiries
                </span>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 mt-2">
                  Frequently Asked Questions
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-2">
                  Learn more about our architecture, privacy guarantees, and usage.
                </p>
              </div>
              <FAQAccordion items={HOMEPAGE_FAQS} />
            </Container>
          </section>
        </>
      )}
    </div>
  );
}

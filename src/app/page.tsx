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
import { ArrowRight } from 'lucide-react';

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

// Sample latest posts
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

  // 6 core featured gateway tools
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

  // Filtered tools when searching
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

      {/* Hero Section with functional search */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Live search results overlay if query exists */}
      {searchQuery.trim() ? (
        <section className="py-12 bg-white">
          <Container>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Search Results ({filteredTools.length})
              </h2>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-emerald-700 hover:underline font-semibold"
              >
                Clear Search
              </button>
            </div>

            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-slate-600">
                  No tools found matching &quot;{searchQuery}&quot;.
                </p>
                <Link
                  href="/tools"
                  className="mt-3 inline-block text-sm font-semibold text-emerald-700 hover:underline"
                >
                  Browse all 22 text tools →
                </Link>
              </div>
            )}
          </Container>
        </section>
      ) : (
        <>
          {/* 6 Core Featured Tools */}
          <FeaturedTools tools={featuredTools} />

          {/* All 6 Categories Showcase */}
          <CategoryShowcase allTools={TOOLS_DATA} />

          {/* Why Choose Us */}
          <WhyChooseUs />

          {/* Recent Blog Posts */}
          <section className="py-16 bg-white border-t border-slate-200">
            <Container>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    Latest Writing & Formatting Guides
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-slate-600">
                    Actionable tutorials on content optimization, text hygiene, and formatting.
                  </p>
                </div>
                <Link
                  href="/blog"
                  className="mt-4 sm:mt-0 inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  <span>View All 10 Guides</span>
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

          {/* FAQ Section */}
          <section className="py-16 bg-slate-50 border-t border-slate-200">
            <Container className="max-w-4xl">
              <SectionHeading
                title="Frequently Asked Questions"
                subtitle="Common questions about TextToolsHub, client-side processing, and privacy."
                centered
              />
              <FAQAccordion items={HOMEPAGE_FAQS} />
            </Container>
          </section>
        </>
      )}
    </div>
  );
}

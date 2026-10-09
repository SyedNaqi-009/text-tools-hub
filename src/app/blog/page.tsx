import { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { BlogCard } from '@/components/blog/BlogCard';
import { getAllPosts } from '@/lib/blog';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Blog & Practical Writing Guides | TextToolsHub',
  description: 'Expert guides and practical tutorials on counting words, cleaning text, converting cases, optimizing SEO slugs, comparing diffs, and formatting lists.',
  canonical: '/blog',
});

export default function BlogListingPage() {
  const posts = getAllPosts();
  const breadcrumbs = [{ name: 'Blog', url: '/blog' }];

  return (
    <div className="py-12 bg-slate-50/50 min-h-screen">
      <Container>
        <Breadcrumbs items={breadcrumbs} />

        <div className="mb-12 text-center sm:text-left">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Editorial & Technical Guides
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Writing, SEO & Text Formatting Blog
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            In-depth guides on text analysis, formatting best practices, URL optimization, and data cleaning for writers, creators, and developers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

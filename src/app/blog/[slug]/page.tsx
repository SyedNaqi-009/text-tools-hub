import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaMarkup } from '@/components/ui/SchemaMarkup';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import {
  constructMetadata,
  generateBlogPostingSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Calendar, Clock, User } from 'lucide-react';
import Link from 'next/link';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return constructMetadata({
      title: 'Article Not Found',
      description: 'The requested guide could not be located.',
    });
  }

  return constructMetadata({
    title: `${post.title} | TextToolsHub`,
    description: post.excerpt,
    canonical: `/blog/${post.slug}`,
    ogType: 'article',
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ];

  const blogSchema = generateBlogPostingSchema(post);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <article className="py-12 bg-white min-h-screen">
      <SchemaMarkup schema={[blogSchema, breadcrumbSchema]} />

      <Container className="max-w-4xl">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mb-10 pb-8 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 mb-4">
            <span className="flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{post.date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{post.readTime}</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1.5 text-emerald-700 font-medium">
              <User className="w-4 h-4 text-emerald-600" />
              <span>{post.author}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* MDX Content rendering */}
        <div className="prose prose-slate prose-emerald max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-emerald-700 prose-a:no-underline hover:prose-a:underline prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 text-slate-700 leading-relaxed text-base space-y-4">
          <MDXRemote source={post.content} />
        </div>

        {/* Back to Blog footer */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex items-center justify-between">
          <Link
            href="/blog"
            className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            ← Back to All Guides
          </Link>
          <Link
            href="/tools"
            className="text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
          >
            Explore All 22 Text Tools →
          </Link>
        </div>
      </Container>
    </article>
  );
}

import { MetadataRoute } from 'next';
import { TOOLS_DATA } from '@/lib/tools-data';
import { getAllPosts } from '@/lib/blog';

const BASE_URL = 'https://texttoolshub.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/tools',
    '/blog',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-and-conditions',
    '/disclaimer',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: '2026-03-01',
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route === '/tools' ? 0.9 : 0.7,
  }));

  const toolPages = TOOLS_DATA.map((tool) => ({
    url: `${BASE_URL}/tools/${tool.slug}`,
    lastModified: '2026-03-01',
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const blogPosts = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...toolPages, ...blogPosts];
}

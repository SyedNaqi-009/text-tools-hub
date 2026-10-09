import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="flex flex-col bg-white rounded-2xl border border-slate-200 p-6 hover:border-emerald-500/50 hover:shadow-md transition-all duration-200">
      <div className="flex items-center space-x-4 text-xs text-slate-500 mb-3">
        <span className="flex items-center space-x-1">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{post.date}</span>
        </span>
        <span className="flex items-center space-x-1">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{post.readTime}</span>
        </span>
      </div>

      <h3 className="text-lg font-bold text-slate-900 hover:text-emerald-700 transition-colors mb-2">
        <Link href={`/blog/${post.slug}`}>
          {post.title}
        </Link>
      </h3>

      <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4 grow">
        {post.excerpt}
      </p>

      <div className="pt-3 border-t border-slate-100">
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          <span>Read Full Guide</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

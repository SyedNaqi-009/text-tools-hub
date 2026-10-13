import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="flex flex-col bg-white rounded-3xl border border-slate-200/90 p-8 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group">
      <div className="flex items-center space-x-3 text-xs font-mono text-slate-500 mb-4">
        <span className="flex items-center space-x-1.5 bg-slate-100 px-2.5 py-1 rounded-md text-slate-700">
          <Calendar className="w-3.5 h-3.5 text-indigo-600" />
          <span>{post.date}</span>
        </span>
        <span className="flex items-center space-x-1.5 text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          <span>{post.readTime}</span>
        </span>
      </div>

      <h3 className="text-xl font-black text-slate-950 group-hover:text-indigo-600 transition-colors mb-3 leading-snug">
        <Link href={`/blog/${post.slug}`}>
          {post.title}
        </Link>
      </h3>

      <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-6 grow font-normal">
        {post.excerpt}
      </p>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-mono text-slate-400">Read Article</span>
        <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-indigo-50 flex items-center justify-center transition-colors">
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </article>
  );
}

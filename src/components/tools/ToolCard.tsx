import React from 'react';
import Link from 'next/link';
import { TextTool } from '@/lib/tools-data';
import {
  FileText,
  Hash,
  BarChart2,
  PieChart,
  Clock,
  Type,
  RotateCcw,
  Repeat,
  Link as LinkIcon,
  Binary,
  ListFilter,
  Minimize2,
  AlignJustify,
  CornerDownLeft,
  Search,
  ArrowUpDown,
  ListOrdered,
  PlusSquare,
  GitCompare,
  Feather,
  Globe,
  Code,
  ArrowRight,
  LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  FileText,
  Hash,
  BarChart2,
  PieChart,
  Clock,
  Type,
  RotateCcw,
  Repeat,
  Link: LinkIcon,
  Binary,
  ListFilter,
  Minimize2,
  AlignJustify,
  CornerDownLeft,
  Search,
  ArrowUpDown,
  ListOrdered,
  PlusSquare,
  GitCompare,
  Feather,
  Globe,
  Code,
};

export function ToolCard({ tool }: { tool: TextTool }) {
  const IconComponent = ICON_MAP[tool.iconName] || FileText;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative flex flex-col p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-300 shadow-sm">
          <IconComponent className="w-5 h-5 text-indigo-300 group-hover:text-white transition-colors" />
        </div>
        <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-colors">
          {tool.categoryLabel}
        </span>
      </div>

      <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
        {tool.name}
      </h3>

      <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-5 grow">
        {tool.shortDescription}
      </p>

      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-indigo-600 transition-colors pt-3 border-t border-slate-100">
        <span className="font-mono text-[11px]">Instant Launch</span>
        <div className="w-7 h-7 rounded-full bg-slate-50 group-hover:bg-indigo-50 flex items-center justify-center transition-colors">
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

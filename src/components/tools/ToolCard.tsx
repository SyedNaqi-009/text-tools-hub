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
      className="group relative flex flex-col p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-200"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200">
          <IconComponent className="w-5 h-5" />
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
          {tool.categoryLabel}
        </span>
      </div>

      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
        {tool.name}
      </h3>

      <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4 grow">
        {tool.shortDescription}
      </p>

      <div className="flex items-center text-xs font-semibold text-emerald-700 group-hover:text-emerald-800 transition-colors pt-2 border-t border-slate-100">
        <span>Use Tool</span>
        <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

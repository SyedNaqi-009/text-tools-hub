import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`mb-8 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-base text-slate-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

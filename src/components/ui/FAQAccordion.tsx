'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border border-slate-200 rounded-xl bg-white overflow-hidden transition-all duration-200"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full text-left px-5 py-4 flex items-center justify-between font-semibold text-slate-800 hover:text-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              aria-expanded={isOpen}
            >
              <span className="pr-4">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                  isOpen ? 'transform rotate-180 text-emerald-600' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

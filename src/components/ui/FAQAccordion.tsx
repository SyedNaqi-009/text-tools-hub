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
    <div className="space-y-3.5">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-white border-indigo-200 shadow-md shadow-indigo-500/5'
                : 'bg-white/80 border-slate-200/90 hover:border-slate-300'
            }`}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-slate-900 hover:text-indigo-600 transition-colors focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="pr-4 text-base tracking-tight">{item.question}</span>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                isOpen ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400'
              }`}>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>
            {isOpen && (
              <div className="px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100/80 bg-slate-50/30">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

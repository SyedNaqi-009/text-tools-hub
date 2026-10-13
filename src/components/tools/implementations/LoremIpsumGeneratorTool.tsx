'use client';

import React, { useState } from 'react';
import { TextOutput } from '@/components/tools/TextOutput';
import { generateLoremIpsum } from '@/lib/text-utils/lorem-ipsum';
import { RefreshCw } from 'lucide-react';

export function LoremIpsumGeneratorTool() {
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [htmlTags, setHtmlTags] = useState(false);
  const [seed, setSeed] = useState(0);

  const output = React.useMemo(() => {
    return generateLoremIpsum({
      type,
      count,
      startWithLorem,
      htmlTags,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, count, startWithLorem, htmlTags, seed]);

  return (
    <div className="space-y-6">
      {/* Configuration Controls */}
      <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700">Generate By:</span>
            <div className="flex rounded-lg border border-slate-300 p-0.5 bg-white">
              {(['paragraphs', 'sentences', 'words'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`px-3 py-1 rounded-md font-semibold capitalize transition-all ${
                    type === t ? 'bg-slate-950 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700">Quantity:</span>
            <input
              type="number"
              min={1}
              max={type === 'paragraphs' ? 50 : type === 'sentences' ? 200 : 2000}
              value={count}
              onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-800 font-mono"
            />
          </div>

          <button
            type="button"
            onClick={() => setSeed((s) => s + 1)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 font-semibold text-slate-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-indigo-600" />
            <span>Regenerate Text</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-slate-200">
          <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
              className="rounded accent-indigo-600"
            />
            <span>Start with &quot;Lorem ipsum dolor sit amet...&quot;</span>
          </label>

          <label className="flex items-center space-x-2 font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={htmlTags}
              onChange={(e) => setHtmlTags(e.target.checked)}
              className="rounded accent-indigo-600"
            />
            <span>Wrap in HTML &lt;p&gt; tags</span>
          </label>
        </div>
      </div>

      <TextOutput
        value={output}
        label="Generated Lorem Ipsum Text"
        minHeight="min-h-[220px]"
        filename="lorem-ipsum.txt"
      />
    </div>
  );
}

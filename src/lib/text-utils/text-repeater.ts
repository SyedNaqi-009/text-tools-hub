export interface RepeatOptions {
  count: number;
  separator: string;
}

export function repeatText(text: string, options: RepeatOptions): { output: string; warning?: string } {
  if (!text || options.count <= 0) {
    return { output: '' };
  }

  const count = Math.min(Math.max(options.count, 1), 5000);
  const estimatedLength = (text.length + options.separator.length) * count;

  if (estimatedLength > 1_000_000) {
    return {
      output: '',
      warning: 'Result would exceed 1,000,000 characters limit. Please decrease repetition count.',
    };
  }

  const items = new Array(count).fill(text);
  return {
    output: items.join(options.separator),
  };
}

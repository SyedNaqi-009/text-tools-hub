export type SortMode =
  | 'alphabetical-asc'
  | 'alphabetical-desc'
  | 'numeric-asc'
  | 'numeric-desc'
  | 'length-asc'
  | 'length-desc'
  | 'shuffle';

export interface SortOptions {
  mode: SortMode;
  caseSensitive: boolean;
  removeDuplicates: boolean;
  trimLines: boolean;
  ignoreEmptyLines: boolean;
}

export function sortTextLines(
  text: string,
  options: SortOptions = {
    mode: 'alphabetical-asc',
    caseSensitive: false,
    removeDuplicates: false,
    trimLines: false,
    ignoreEmptyLines: false,
  }
): string {
  if (!text) return '';

  let lines = text.split(/\r\n|\r|\n/);

  if (options.trimLines) {
    lines = lines.map(l => l.trim());
  }

  if (options.ignoreEmptyLines) {
    lines = lines.filter(l => l.length > 0);
  }

  if (options.removeDuplicates) {
    const seen = new Set<string>();
    lines = lines.filter(l => {
      const key = options.caseSensitive ? l : l.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  const sorted = [...lines];

  switch (options.mode) {
    case 'alphabetical-asc':
      sorted.sort((a, b) =>
        options.caseSensitive ? a.localeCompare(b) : a.toLowerCase().localeCompare(b.toLowerCase())
      );
      break;

    case 'alphabetical-desc':
      sorted.sort((a, b) =>
        options.caseSensitive ? b.localeCompare(a) : b.toLowerCase().localeCompare(a.toLowerCase())
      );
      break;

    case 'numeric-asc':
      sorted.sort((a, b) => {
        const numA = parseFloat(a.replace(/[^0-9.-]/g, '')) || 0;
        const numB = parseFloat(b.replace(/[^0-9.-]/g, '')) || 0;
        return numA - numB;
      });
      break;

    case 'numeric-desc':
      sorted.sort((a, b) => {
        const numA = parseFloat(a.replace(/[^0-9.-]/g, '')) || 0;
        const numB = parseFloat(b.replace(/[^0-9.-]/g, '')) || 0;
        return numB - numA;
      });
      break;

    case 'length-asc':
      sorted.sort((a, b) => a.length - b.length || a.localeCompare(b));
      break;

    case 'length-desc':
      sorted.sort((a, b) => b.length - a.length || a.localeCompare(b));
      break;

    case 'shuffle': {
      let seed = 42;
      for (let i = sorted.length - 1; i > 0; i--) {
        seed = (seed * 9301 + 49297) % 233280;
        const rnd = seed / 233280;
        const j = Math.floor(rnd * (i + 1));
        [sorted[i], sorted[j]] = [sorted[j], sorted[i]];
      }
      break;
    }
  }

  return sorted.join('\n');
}

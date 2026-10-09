export type CaseType =
  | 'uppercase'
  | 'lowercase'
  | 'titlecase'
  | 'sentencecase'
  | 'alternating'
  | 'camelcase'
  | 'pascalcase'
  | 'snakecase'
  | 'kebabcase'
  | 'constantcase'
  | 'dotcase';

const MINOR_WORDS = new Set([
  'a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'in', 'on', 'at', 'to', 'by', 'of', 'up', 'as', 'with'
]);

export function convertCase(text: string, type: CaseType): string {
  if (!text) return '';

  switch (type) {
    case 'uppercase':
      return text.toUpperCase();

    case 'lowercase':
      return text.toLowerCase();

    case 'titlecase': {
      // Split preserving line breaks
      return text
        .split('\n')
        .map(line => {
          const words = line.split(/(\s+)/);
          let wordIndex = 0;
          return words
            .map(part => {
              if (/^\s+$/.test(part) || !part) return part;
              const lower = part.toLowerCase();
              const isFirstOrLast = wordIndex === 0 || wordIndex === words.filter(w => !/^\s+$/.test(w)).length - 1;
              wordIndex++;

              if (!isFirstOrLast && MINOR_WORDS.has(lower)) {
                return lower;
              }
              return lower.charAt(0).toUpperCase() + lower.slice(1);
            })
            .join('');
        })
        .join('\n');
    }

    case 'sentencecase': {
      // Lowercase everything first, then capitalize start and after punctuation (. ! ?)
      const lower = text.toLowerCase();
      return lower.replace(/(^\s*|[.!?]\s+)([a-z])/g, (match, prefix, char) => {
        return prefix + char.toUpperCase();
      });
    }

    case 'alternating': {
      let isUpper = false;
      return text
        .split('')
        .map(char => {
          if (/[a-zA-Z]/.test(char)) {
            const transformed = isUpper ? char.toUpperCase() : char.toLowerCase();
            isUpper = !isUpper;
            return transformed;
          }
          return char;
        })
        .join('');
    }

    case 'camelcase': {
      // Clean non-alphanumeric, split words
      const cleaned = text.replace(/[^a-zA-Z0-9\s_-]/g, ' ');
      const words = cleaned.trim().split(/[\s_-]+/).filter(Boolean);
      if (words.length === 0) return '';
      return (
        words[0].toLowerCase() +
        words
          .slice(1)
          .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join('')
      );
    }

    case 'pascalcase': {
      const cleaned = text.replace(/[^a-zA-Z0-9\s_-]/g, ' ');
      const words = cleaned.trim().split(/[\s_-]+/).filter(Boolean);
      return words
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join('');
    }

    case 'snakecase': {
      const cleaned = text
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[^a-zA-Z0-9]+/g, ' ')
        .trim();
      return cleaned.split(/\s+/).filter(Boolean).map(w => w.toLowerCase()).join('_');
    }

    case 'kebabcase': {
      const cleaned = text
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[^a-zA-Z0-9]+/g, ' ')
        .trim();
      return cleaned.split(/\s+/).filter(Boolean).map(w => w.toLowerCase()).join('-');
    }

    case 'constantcase': {
      const cleaned = text
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[^a-zA-Z0-9]+/g, ' ')
        .trim();
      return cleaned.split(/\s+/).filter(Boolean).map(w => w.toUpperCase()).join('_');
    }

    case 'dotcase': {
      const cleaned = text
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[^a-zA-Z0-9]+/g, ' ')
        .trim();
      return cleaned.split(/\s+/).filter(Boolean).map(w => w.toLowerCase()).join('.');
    }

    default:
      return text;
  }
}

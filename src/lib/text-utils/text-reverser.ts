export type ReverseMode = 'characters' | 'words' | 'lines';

export function reverseText(text: string, mode: ReverseMode): string {
  if (!text) return '';

  switch (mode) {
    case 'characters':
      // Handles surrogate pairs and unicode characters reasonably
      return Array.from(text).reverse().join('');

    case 'words': {
      // Reverse word order per line to maintain line structure
      return text
        .split('\n')
        .map(line => {
          const words = line.split(/(\s+)/);
          const nonSpaces = words.filter(w => !/^\s+$/.test(w) && w !== '');
          const reversedWords = nonSpaces.reverse();

          let idx = 0;
          return words
            .map(part => {
              if (/^\s+$/.test(part) || part === '') return part;
              return reversedWords[idx++];
            })
            .join('');
        })
        .join('\n');
    }

    case 'lines': {
      return text.split(/\r\n|\r|\n/).reverse().join('\n');
    }

    default:
      return text;
  }
}

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
  'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim',
  'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip',
  'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat',
  'non', 'proident', 'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id',
  'est', 'laborum', 'curabitur', 'pretium', 'tincidunt', 'lacus', 'odio', 'auctor', 'pharetra', 'iaculis',
  'placerat', 'vulputate', 'ornare', 'pellentesque', 'faucibus', 'malesuada', 'sollicitudin', 'elementum'
];

export interface LoremOptions {
  type: 'paragraphs' | 'sentences' | 'words';
  count: number;
  startWithLorem: boolean;
  htmlTags: boolean;
}

let lcgSeed = 123456789;

function seededRandom(): number {
  lcgSeed = (lcgSeed * 1664525 + 1013904223) % 4294967296;
  return lcgSeed / 4294967296;
}

function getRandomWord(): string {
  const index = Math.floor(seededRandom() * LOREM_WORDS.length);
  return LOREM_WORDS[index];
}

function generateSentence(minWords = 8, maxWords = 15): string {
  const length = Math.floor(seededRandom() * (maxWords - minWords + 1)) + minWords;
  const words: string[] = [];
  for (let i = 0; i < length; i++) {
    words.push(getRandomWord());
  }
  const sentence = words.join(' ');
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
}

function generateParagraph(minSentences = 4, maxSentences = 7): string {
  const sentenceCount = Math.floor(seededRandom() * (maxSentences - minSentences + 1)) + minSentences;
  const sentences: string[] = [];
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence());
  }
  return sentences.join(' ');
}

export function generateLoremIpsum(options: LoremOptions): string {
  const { type, count, startWithLorem, htmlTags } = options;
  const standardLead = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  if (type === 'words') {
    const validCount = Math.min(Math.max(count, 1), 5000);
    const words: string[] = [];
    if (startWithLorem) {
      const initial = ['lorem', 'ipsum', 'dolor', 'sit', 'amet'];
      for (let i = 0; i < Math.min(validCount, initial.length); i++) {
        words.push(initial[i]);
      }
    }
    while (words.length < validCount) {
      words.push(getRandomWord());
    }
    const result = words.join(' ');
    return htmlTags ? `<p>${result}</p>` : result;
  }

  if (type === 'sentences') {
    const validCount = Math.min(Math.max(count, 1), 500);
    const sentences: string[] = [];
    if (startWithLorem && validCount > 0) {
      sentences.push(standardLead);
    }
    while (sentences.length < validCount) {
      sentences.push(generateSentence());
    }
    const result = sentences.join(' ');
    return htmlTags ? `<p>${result}</p>` : result;
  }

  // Paragraphs
  const validCount = Math.min(Math.max(count, 1), 100);
  const paragraphs: string[] = [];

  for (let i = 0; i < validCount; i++) {
    if (i === 0 && startWithLorem) {
      const remainingSentences = generateParagraph(3, 5);
      paragraphs.push(`${standardLead} ${remainingSentences}`);
    } else {
      paragraphs.push(generateParagraph(4, 7));
    }
  }

  if (htmlTags) {
    return paragraphs.map(p => `<p>${p}</p>`).join('\n\n');
  }

  return paragraphs.join('\n\n');
}

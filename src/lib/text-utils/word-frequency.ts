const COMMON_STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t',
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
  'can\'t', 'cannot', 'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t',
  'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have',
  'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself',
  'him', 'himself', 'his', 'how', 'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into',
  'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most', 'mustn\'t', 'my',
  'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours',
  'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s', 'should',
  'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs', 'them',
  'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve',
  'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t', 'we', 'we\'d',
  'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s', 'where',
  'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 'would',
  'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves'
]);

export interface WordFrequencyItem {
  word: string;
  count: number;
  percentage: number;
}

export interface WordFrequencyOptions {
  caseSensitive: boolean;
  ignoreStopWords: boolean;
  minWordLength: number;
  limit: number;
}

export function calculateWordFrequency(
  text: string,
  options: WordFrequencyOptions = {
    caseSensitive: false,
    ignoreStopWords: true,
    minWordLength: 2,
    limit: 50,
  }
): { totalWords: number; uniqueWords: number; items: WordFrequencyItem[] } {
  if (!text || text.trim() === '') {
    return { totalWords: 0, uniqueWords: 0, items: [] };
  }

  // Tokenize
  const rawTokens = text.match(/\b[\w'-]+\b/g) || [];
  const totalWords = rawTokens.length;

  const freqMap: Record<string, number> = {};
  let validTokensCount = 0;

  for (const token of rawTokens) {
    const word = options.caseSensitive ? token : token.toLowerCase();
    const cleanWord = word.replace(/^['"-]+|['"-]+$/g, '');

    if (cleanWord.length < (options.minWordLength || 1)) {
      continue;
    }

    if (options.ignoreStopWords && COMMON_STOP_WORDS.has(cleanWord.toLowerCase())) {
      continue;
    }

    freqMap[cleanWord] = (freqMap[cleanWord] || 0) + 1;
    validTokensCount++;
  }

  const items = Object.entries(freqMap)
    .map(([word, count]) => ({
      word,
      count,
      percentage: Number(((count / (validTokensCount || 1)) * 100).toFixed(2)),
    }))
    .sort((a, b) => b.count - a.count || a.word.localeCompare(b.word));

  const limitedItems = options.limit > 0 ? items.slice(0, options.limit) : items;

  return {
    totalWords,
    uniqueWords: Object.keys(freqMap).length,
    items: limitedItems,
  };
}

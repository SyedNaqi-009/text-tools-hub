export interface KeywordPhrase {
  phrase: string;
  count: number;
  density: number;
}

export interface KeywordDensityResult {
  totalWords: number;
  oneWordPhrases: KeywordPhrase[];
  twoWordPhrases: KeywordPhrase[];
  threeWordPhrases: KeywordPhrase[];
}

export function calculateKeywordDensity(text: string): KeywordDensityResult {
  if (!text || text.trim() === '') {
    return {
      totalWords: 0,
      oneWordPhrases: [],
      twoWordPhrases: [],
      threeWordPhrases: [],
    };
  }

  // Normalize words to lowercase alphanumeric
  const cleanTokens = text
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(w => w.length > 1);

  const totalWords = cleanTokens.length;
  if (totalWords === 0) {
    return {
      totalWords: 0,
      oneWordPhrases: [],
      twoWordPhrases: [],
      threeWordPhrases: [],
    };
  }

  // 1-word frequency
  const map1: Record<string, number> = {};
  for (const token of cleanTokens) {
    map1[token] = (map1[token] || 0) + 1;
  }

  // 2-word frequency
  const map2: Record<string, number> = {};
  for (let i = 0; i < cleanTokens.length - 1; i++) {
    const phrase = `${cleanTokens[i]} ${cleanTokens[i + 1]}`;
    map2[phrase] = (map2[phrase] || 0) + 1;
  }

  // 3-word frequency
  const map3: Record<string, number> = {};
  for (let i = 0; i < cleanTokens.length - 2; i++) {
    const phrase = `${cleanTokens[i]} ${cleanTokens[i + 1]} ${cleanTokens[i + 2]}`;
    map3[phrase] = (map3[phrase] || 0) + 1;
  }

  const formatList = (map: Record<string, number>, wordsInPhrase: number): KeywordPhrase[] => {
    return Object.entries(map)
      .map(([phrase, count]) => ({
        phrase,
        count,
        density: Number(((count * wordsInPhrase / totalWords) * 100).toFixed(2)),
      }))
      .sort((a, b) => b.count - a.count || b.density - a.density)
      .slice(0, 50);
  };

  return {
    totalWords,
    oneWordPhrases: formatList(map1, 1),
    twoWordPhrases: formatList(map2, 2),
    threeWordPhrases: formatList(map3, 3),
  };
}

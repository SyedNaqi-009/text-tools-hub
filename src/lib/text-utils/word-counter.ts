export interface WordCounterStats {
  words: number;
  charactersWithSpaces: number;
  charactersWithoutSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTimeMinutes: number;
  readingTimeSeconds: number;
  speakingTimeMinutes: number;
  speakingTimeSeconds: number;
}

export function calculateWordCounterStats(
  text: string,
  readingWpm: number = 238,
  speakingWpm: number = 150
): WordCounterStats {
  if (!text || text.trim() === '') {
    return {
      words: 0,
      charactersWithSpaces: text.length,
      charactersWithoutSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      lines: text.length > 0 ? text.split(/\r\n|\r|\n/).length : 0,
      readingTimeMinutes: 0,
      readingTimeSeconds: 0,
      speakingTimeMinutes: 0,
      speakingTimeSeconds: 0,
    };
  }

  const charactersWithSpaces = text.length;
  const charactersWithoutSpaces = text.replace(/\s/g, '').length;

  // Words: split by whitespace sequence
  const wordsArray = text.trim().split(/\s+/).filter(Boolean);
  const words = wordsArray.length;

  // Sentences: split by punctuation followed by space or end of string
  const sentenceMatches = text.trim().match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g);
  const sentences = sentenceMatches ? sentenceMatches.filter(s => s.trim().length > 0).length : (words > 0 ? 1 : 0);

  // Paragraphs: split by 2 or more consecutive newlines or single non-empty blocks
  const paragraphsArray = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  const paragraphs = paragraphsArray.length > 0 ? paragraphsArray.length : (words > 0 ? 1 : 0);

  // Lines
  const lines = text.split(/\r\n|\r|\n/).length;

  // Reading time
  const readingTimeTotalSeconds = words > 0 ? Math.ceil((words / readingWpm) * 60) : 0;
  const readingTimeMinutes = Math.floor(readingTimeTotalSeconds / 60);
  const readingTimeSeconds = readingTimeTotalSeconds % 60;

  // Speaking time
  const speakingTimeTotalSeconds = words > 0 ? Math.ceil((words / speakingWpm) * 60) : 0;
  const speakingTimeMinutes = Math.floor(speakingTimeTotalSeconds / 60);
  const speakingTimeSeconds = speakingTimeTotalSeconds % 60;

  return {
    words,
    charactersWithSpaces,
    charactersWithoutSpaces,
    sentences,
    paragraphs,
    lines,
    readingTimeMinutes,
    readingTimeSeconds,
    speakingTimeMinutes,
    speakingTimeSeconds,
  };
}

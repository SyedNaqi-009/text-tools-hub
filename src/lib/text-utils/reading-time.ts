export interface ReadingTimeResult {
  readingMinutes: number;
  readingSeconds: number;
  readingTotalSeconds: number;
  speakingMinutes: number;
  speakingSeconds: number;
  speakingTotalSeconds: number;
  words: number;
  characters: number;
  sentences: number;
  paragraphs: number;
}

export function calculateReadingTime(
  text: string,
  readingWpm: number = 238,
  speakingWpm: number = 150
): ReadingTimeResult {
  if (!text || text.trim() === '') {
    return {
      readingMinutes: 0,
      readingSeconds: 0,
      readingTotalSeconds: 0,
      speakingMinutes: 0,
      speakingSeconds: 0,
      speakingTotalSeconds: 0,
      words: 0,
      characters: 0,
      sentences: 0,
      paragraphs: 0,
    };
  }

  const wordsArray = text.trim().split(/\s+/).filter(Boolean);
  const words = wordsArray.length;
  const characters = text.length;

  const sentenceMatches = text.trim().match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g);
  const sentences = sentenceMatches ? sentenceMatches.filter(s => s.trim().length > 0).length : (words > 0 ? 1 : 0);

  const paragraphsArray = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  const paragraphs = paragraphsArray.length > 0 ? paragraphsArray.length : (words > 0 ? 1 : 0);

  const rSpeed = readingWpm > 0 ? readingWpm : 238;
  const sSpeed = speakingWpm > 0 ? speakingWpm : 150;

  const readingTotalSeconds = Math.ceil((words / rSpeed) * 60);
  const readingMinutes = Math.floor(readingTotalSeconds / 60);
  const readingSeconds = readingTotalSeconds % 60;

  const speakingTotalSeconds = Math.ceil((words / sSpeed) * 60);
  const speakingMinutes = Math.floor(speakingTotalSeconds / 60);
  const speakingSeconds = speakingTotalSeconds % 60;

  return {
    readingMinutes,
    readingSeconds,
    readingTotalSeconds,
    speakingMinutes,
    speakingSeconds,
    speakingTotalSeconds,
    words,
    characters,
    sentences,
    paragraphs,
  };
}

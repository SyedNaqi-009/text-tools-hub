export interface PlatformLimit {
  name: string;
  limit: number;
  description: string;
}

export const PLATFORM_LIMITS: PlatformLimit[] = [
  { name: 'Twitter / X Post', limit: 280, description: 'Single tweet limit' },
  { name: 'Meta Title (SEO)', limit: 60, description: 'Recommended SERP title length' },
  { name: 'YouTube Video Title', limit: 100, description: 'Title character limit' },
  { name: 'Meta Description (SEO)', limit: 160, description: 'Recommended SERP snippet' },
  { name: 'Pinterest Pin Description', limit: 500, description: 'Pin description max' },
  { name: 'Instagram Caption', limit: 2200, description: 'Feed post caption limit' },
  { name: 'LinkedIn Post', limit: 3000, description: 'Post text character limit' },
  { name: 'YouTube Video Description', limit: 5000, description: 'Description maximum length' },
  { name: 'Facebook Post', limit: 63206, description: 'Standard post max character limit' },
];

export interface CharacterCounterStats {
  totalCharacters: number;
  charactersWithoutSpaces: number;
  charactersWithoutNewlines: number;
  totalWords: number;
  totalLines: number;
}

export function calculateCharacterStats(text: string): CharacterCounterStats {
  const totalCharacters = text.length;
  const charactersWithoutSpaces = text.replace(/\s/g, '').length;
  const charactersWithoutNewlines = text.replace(/[\r\n]/g, '').length;
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).filter(Boolean).length;
  const totalLines = text.length > 0 ? text.split(/\r\n|\r|\n/).length : 0;

  return {
    totalCharacters,
    charactersWithoutSpaces,
    charactersWithoutNewlines,
    totalWords: words,
    totalLines,
  };
}

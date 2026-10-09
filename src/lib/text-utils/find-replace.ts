export interface FindReplaceOptions {
  findText: string;
  replaceText: string;
  caseSensitive: boolean;
  useRegex: boolean;
  wholeWord: boolean;
}

export interface FindReplaceResult {
  output: string;
  matchCount: number;
  error?: string;
}

export function performFindReplace(
  text: string,
  options: FindReplaceOptions
): FindReplaceResult {
  if (!text) {
    return { output: '', matchCount: 0 };
  }

  const { findText, replaceText, caseSensitive, useRegex, wholeWord } = options;

  if (!findText) {
    return { output: text, matchCount: 0 };
  }

  try {
    let regex: RegExp;
    const flags = caseSensitive ? 'g' : 'gi';

    if (useRegex) {
      regex = new RegExp(findText, flags);
    } else {
      // Escape literal string
      let pattern = findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (wholeWord) {
        pattern = `\\b${pattern}\\b`;
      }
      regex = new RegExp(pattern, flags);
    }

    const matches = text.match(regex);
    const matchCount = matches ? matches.length : 0;
    const output = text.replace(regex, replaceText);

    return {
      output,
      matchCount,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid regex pattern';
    return {
      output: text,
      matchCount: 0,
      error: message,
    };
  }
}

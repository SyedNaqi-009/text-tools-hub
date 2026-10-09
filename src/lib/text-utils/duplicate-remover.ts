export interface DuplicateRemoverOptions {
  caseSensitive: boolean;
  trimWhitespace: boolean;
}

export interface DuplicateRemoverResult {
  text: string;
  originalLines: number;
  uniqueLines: number;
  removedDuplicates: number;
}

export function removeDuplicateLines(
  text: string,
  options: DuplicateRemoverOptions = { caseSensitive: true, trimWhitespace: false }
): DuplicateRemoverResult {
  if (!text) {
    return {
      text: '',
      originalLines: 0,
      uniqueLines: 0,
      removedDuplicates: 0,
    };
  }

  const lines = text.split(/\r\n|\r|\n/);
  const seen = new Set<string>();
  const uniqueLinesArray: string[] = [];
  let removedCount = 0;

  for (const line of lines) {
    let checkKey = options.trimWhitespace ? line.trim() : line;
    if (!options.caseSensitive) {
      checkKey = checkKey.toLowerCase();
    }

    if (seen.has(checkKey)) {
      removedCount++;
    } else {
      seen.add(checkKey);
      uniqueLinesArray.push(options.trimWhitespace ? line.trim() : line);
    }
  }

  return {
    text: uniqueLinesArray.join('\n'),
    originalLines: lines.length,
    uniqueLines: uniqueLinesArray.length,
    removedDuplicates: removedCount,
  };
}

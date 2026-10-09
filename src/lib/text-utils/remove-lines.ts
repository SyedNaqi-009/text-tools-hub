export interface RemoveLinesOptions {
  removeEmptyLines: boolean;
  removeWhitespaceOnlyLines: boolean;
  trimEachLine: boolean;
  collapseMultipleEmpty: boolean;
}

export function removeEmptyLines(
  text: string,
  options: RemoveLinesOptions = {
    removeEmptyLines: true,
    removeWhitespaceOnlyLines: true,
    trimEachLine: false,
    collapseMultipleEmpty: false,
  }
): { output: string; removedCount: number } {
  if (!text) return { output: '', removedCount: 0 };

  const lines = text.split(/\r\n|\r|\n/);
  const result: string[] = [];
  let removed = 0;
  let previousWasEmpty = false;

  for (const line of lines) {
    const isCompletelyEmpty = line.length === 0;
    const isWhitespaceOnly = line.trim().length === 0;

    let shouldConsiderEmpty = false;
    if (options.removeEmptyLines && isCompletelyEmpty) {
      shouldConsiderEmpty = true;
    } else if (options.removeWhitespaceOnlyLines && isWhitespaceOnly) {
      shouldConsiderEmpty = true;
    }

    if (shouldConsiderEmpty) {
      if (options.collapseMultipleEmpty) {
        if (!previousWasEmpty) {
          result.push('');
          previousWasEmpty = true;
        } else {
          removed++;
        }
      } else {
        removed++;
      }
    } else {
      previousWasEmpty = false;
      result.push(options.trimEachLine ? line.trim() : line);
    }
  }

  return {
    output: result.join('\n'),
    removedCount: removed,
  };
}

export function removeLineBreaks(
  text: string,
  separator: string = ' ',
  trimLines: boolean = true
): string {
  if (!text) return '';

  const lines = text.split(/\r\n|\r|\n/);
  const processed = lines
    .map(l => (trimLines ? l.trim() : l))
    .filter(l => l.length > 0);

  return processed.join(separator);
}

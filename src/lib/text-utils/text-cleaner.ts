export interface SpaceCleanerOptions {
  removeLeading: boolean;
  removeTrailing: boolean;
  collapseMultiple: boolean;
  removeAll: boolean;
  convertTabsToSpaces: boolean;
  tabWidth: number;
}

export function cleanSpaces(
  text: string,
  options: SpaceCleanerOptions = {
    removeLeading: true,
    removeTrailing: true,
    collapseMultiple: true,
    removeAll: false,
    convertTabsToSpaces: false,
    tabWidth: 4,
  }
): string {
  if (!text) return '';

  let result = text;

  // Convert tabs to spaces if enabled
  if (options.convertTabsToSpaces) {
    const spaces = ' '.repeat(options.tabWidth || 4);
    result = result.replace(/\t/g, spaces);
  }

  // Remove all spaces if requested
  if (options.removeAll) {
    return result.replace(/[ \t]/g, '');
  }

  const lines = result.split(/\r\n|\r|\n/);
  const processedLines = lines.map(line => {
    let l = line;
    if (options.removeLeading) {
      l = l.replace(/^[ \t]+/, '');
    }
    if (options.removeTrailing) {
      l = l.replace(/[ \t]+$/, '');
    }
    if (options.collapseMultiple) {
      l = l.replace(/[ \t]{2,}/g, ' ');
    }
    return l;
  });

  return processedLines.join('\n');
}

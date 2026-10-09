export interface PrefixSuffixOptions {
  prefix: string;
  suffix: string;
  skipEmptyLines: boolean;
  trimLinesFirst: boolean;
}

export function addPrefixSuffix(
  text: string,
  options: PrefixSuffixOptions = {
    prefix: '',
    suffix: '',
    skipEmptyLines: false,
    trimLinesFirst: false,
  }
): string {
  if (!text) return '';

  const lines = text.split(/\r\n|\r|\n/);

  return lines
    .map(line => {
      const content = options.trimLinesFirst ? line.trim() : line;
      if (options.skipEmptyLines && content === '') {
        return content;
      }
      return `${options.prefix || ''}${content}${options.suffix || ''}`;
    })
    .join('\n');
}

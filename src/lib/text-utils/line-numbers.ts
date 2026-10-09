export type NumberPadding = 'none' | 'space' | 'zero';

export interface LineNumbersOptions {
  startNumber: number;
  separator: string;
  padding: NumberPadding;
  skipEmptyLines: boolean;
}

export function addLineNumbers(
  text: string,
  options: LineNumbersOptions = {
    startNumber: 1,
    separator: '. ',
    padding: 'none',
    skipEmptyLines: false,
  }
): string {
  if (!text) return '';

  const lines = text.split(/\r\n|\r|\n/);
  const totalCount = lines.length;
  const maxNumber = options.startNumber + totalCount;
  const padLength = String(maxNumber).length;

  let currentNumber = options.startNumber;

  return lines
    .map(line => {
      if (options.skipEmptyLines && line.trim() === '') {
        return line;
      }

      let numStr = String(currentNumber);
      if (options.padding === 'zero') {
        numStr = numStr.padStart(padLength, '0');
      } else if (options.padding === 'space') {
        numStr = numStr.padStart(padLength, ' ');
      }

      const formatted = `${numStr}${options.separator}${line}`;
      currentNumber++;
      return formatted;
    })
    .join('\n');
}

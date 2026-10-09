export interface BinaryTableRow {
  char: string;
  binary: string;
  decimal: number;
  hex: string;
}

export function textToBinary(text: string): { binary: string; table: BinaryTableRow[] } {
  if (!text) return { binary: '', table: [] };

  const binaryList: string[] = [];
  const table: BinaryTableRow[] = [];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const code = text.charCodeAt(i);
    const bin = code.toString(2).padStart(8, '0');
    const hex = code.toString(16).toUpperCase().padStart(2, '0');

    binaryList.push(bin);
    table.push({
      char: char === ' ' ? '[space]' : char === '\n' ? '[newline]' : char,
      binary: bin,
      decimal: code,
      hex: `0x${hex}`,
    });
  }

  return {
    binary: binaryList.join(' '),
    table,
  };
}

export function binaryToText(binary: string): { text: string; error?: string } {
  if (!binary || binary.trim() === '') return { text: '' };

  // Remove any commas or extra delimiters, normalize spaces
  const cleanBinary = binary.trim().replace(/,/g, ' ');
  const chunks = cleanBinary.split(/\s+/).filter(Boolean);

  let textResult = '';

  for (const chunk of chunks) {
    // If user provided a continuous chunk of 8s without spaces
    if (chunk.length > 8 && chunk.length % 8 === 0 && !chunks.some(c => c.length !== chunk.length)) {
      for (let i = 0; i < chunk.length; i += 8) {
        const sub = chunk.slice(i, i + 8);
        if (!/^[01]{8}$/.test(sub)) {
          return { text: '', error: `Invalid 8-bit binary pattern: ${sub}` };
        }
        textResult += String.fromCharCode(parseInt(sub, 2));
      }
      continue;
    }

    if (!/^[01]+$/.test(chunk)) {
      return { text: '', error: `Invalid binary string: "${chunk}". Only 0 and 1 digits allowed.` };
    }

    const code = parseInt(chunk, 2);
    textResult += String.fromCharCode(code);
  }

  return { text: textResult };
}

export interface SlugOptions {
  separator: '-' | '_';
  lowercase: boolean;
  maxLength?: number;
}

export function generateSlug(text: string, options: SlugOptions = { separator: '-', lowercase: true }): string {
  if (!text) return '';

  const lines = text.split(/\r\n|\r|\n/);

  return lines
    .map(line => {
      let str = line.trim();
      if (!str) return '';

      // Normalize unicode to decomposed forms to separate accents
      str = str.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');

      if (options.lowercase) {
        str = str.toLowerCase();
      }

      const sep = options.separator || '-';
      const sepEscaped = sep === '-' ? '\\-' : sep;

      // Replace non-alphanumeric chars with separator
      str = str.replace(/[^a-zA-Z0-9]+/g, sep);

      // Collapse consecutive separators
      const collapseRegex = new RegExp(`${sepEscaped}+`, 'g');
      str = str.replace(collapseRegex, sep);

      // Trim leading/trailing separators
      const trimRegex = new RegExp(`^${sepEscaped}+|${sepEscaped}+$`, 'g');
      str = str.replace(trimRegex, '');

      if (options.maxLength && options.maxLength > 0) {
        str = str.slice(0, options.maxLength).replace(trimRegex, '');
      }

      return str;
    })
    .join('\n');
}

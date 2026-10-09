const ONES = [
  '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
  'seventeen', 'eighteen', 'nineteen'
];

const TENS = [
  '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];

const SCALES = ['', 'thousand', 'million', 'billion'];

const ORDINALS_MAP: Record<string, string> = {
  one: 'first',
  two: 'second',
  three: 'third',
  four: 'fourth',
  five: 'fifth',
  six: 'sixth',
  seven: 'seventh',
  eight: 'eighth',
  nine: 'ninth',
  ten: 'tenth',
  eleven: 'eleventh',
  twelve: 'twelfth',
  thirteen: 'thirteenth',
  fourteen: 'fourteenth',
  fifteen: 'fifteenth',
  sixteen: 'sixteenth',
  seventeen: 'seventeenth',
  eighteen: 'eighteenth',
  nineteen: 'nineteenth',
  twenty: 'twentieth',
  thirty: 'thirtieth',
  forty: 'fortieth',
  fifty: 'fiftieth',
  sixty: 'sixtieth',
  seventy: 'seventieth',
  eighty: 'eightieth',
  ninety: 'ninetieth',
  hundred: 'hundredth',
  thousand: 'thousandth',
  million: 'millionth',
  billion: 'billionth',
};

function convertThreeDigits(num: number): string {
  let str = '';
  const hundreds = Math.floor(num / 100);
  const remainder = num % 100;

  if (hundreds > 0) {
    str += `${ONES[hundreds]} hundred`;
    if (remainder > 0) str += ' ';
  }

  if (remainder > 0) {
    if (remainder < 20) {
      str += ONES[remainder];
    } else {
      const ten = Math.floor(remainder / 10);
      const one = remainder % 10;
      str += TENS[ten];
      if (one > 0) {
        str += `-${ONES[one]}`;
      }
    }
  }

  return str;
}

export function numberToWords(input: string | number): { cardinal: string; ordinal: string; error?: string } {
  const strVal = String(input).trim();
  if (!strVal || isNaN(Number(strVal))) {
    return { cardinal: '', ordinal: '', error: 'Please enter a valid numeric value.' };
  }

  const numVal = Number(strVal);
  if (Math.abs(numVal) > 999_999_999_999) {
    return { cardinal: '', ordinal: '', error: 'Number exceeds the supported range (up to 999 billion).' };
  }

  let isNegative = false;
  let absVal = strVal;

  if (strVal.startsWith('-')) {
    isNegative = true;
    absVal = strVal.slice(1);
  }

  const parts = absVal.split('.');
  const integerPartStr = parts[0] || '0';
  const decimalPartStr = parts[1];

  let integerNumber = parseInt(integerPartStr, 10);
  if (isNaN(integerNumber)) integerNumber = 0;

  let cardinal = '';

  if (integerNumber === 0) {
    cardinal = 'zero';
  } else {
    const chunks: number[] = [];
    let temp = integerNumber;
    while (temp > 0) {
      chunks.push(temp % 1000);
      temp = Math.floor(temp / 1000);
    }

    const chunkWords: string[] = [];
    for (let i = chunks.length - 1; i >= 0; i--) {
      const chunk = chunks[i];
      if (chunk > 0) {
        const words = convertThreeDigits(chunk);
        const scale = SCALES[i];
        chunkWords.push(scale ? `${words} ${scale}` : words);
      }
    }
    cardinal = chunkWords.join(' ');
  }

  // Handle decimal digits
  if (decimalPartStr !== undefined && decimalPartStr.length > 0) {
    const decimalWords = decimalPartStr
      .split('')
      .map(digit => (digit === '0' ? 'zero' : ONES[parseInt(digit, 10)]))
      .join(' ');
    cardinal += ` point ${decimalWords}`;
  }

  if (isNegative) {
    cardinal = `negative ${cardinal}`;
  }

  // Compute ordinal
  let ordinal = '';
  if (decimalPartStr !== undefined) {
    ordinal = 'Ordinal not defined for decimals';
  } else {
    // Replace the last word in cardinal with ordinal form
    const wordsArr = cardinal.split(/[\s-]+/);
    const lastWord = wordsArr[wordsArr.length - 1].toLowerCase();
    if (ORDINALS_MAP[lastWord]) {
      // replace last word
      const lastIndex = cardinal.lastIndexOf(lastWord);
      ordinal = cardinal.slice(0, lastIndex) + ORDINALS_MAP[lastWord];
    } else {
      ordinal = `${cardinal}th`;
    }
  }

  return { cardinal, ordinal };
}

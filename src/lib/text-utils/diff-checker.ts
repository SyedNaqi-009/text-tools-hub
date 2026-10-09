export interface DiffLine {
  type: 'added' | 'removed' | 'unchanged';
  originalLineNumber?: number;
  modifiedLineNumber?: number;
  text: string;
  charDiff?: { type: 'added' | 'removed' | 'unchanged'; text: string }[];
}

export interface DiffResult {
  lines: DiffLine[];
  addedCount: number;
  removedCount: number;
  unchangedCount: number;
}

export interface DiffOptions {
  ignoreWhitespace: boolean;
  ignoreCase: boolean;
}

// Simple Myers-style LCS line diff
export function computeDiff(
  originalText: string,
  modifiedText: string,
  options: DiffOptions = { ignoreWhitespace: false, ignoreCase: false }
): DiffResult {
  const origLines = originalText.split(/\r\n|\r|\n/);
  const modLines = modifiedText.split(/\r\n|\r|\n/);

  const normalize = (line: string) => {
    let res = options.ignoreWhitespace ? line.trim() : line;
    if (options.ignoreCase) res = res.toLowerCase();
    return res;
  };

  const normOrig = origLines.map(normalize);
  const normMod = modLines.map(normalize);

  const N = normOrig.length;
  const M = normMod.length;

  // LCS DP matrix
  const dp: number[][] = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (normOrig[i] === normMod[j]) {
        dp[i + 1][j + 1] = dp[i][j] + 1;
      } else {
        dp[i + 1][j + 1] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  // Backtrack
  let i = N;
  let j = M;
  const rawDiff: DiffLine[] = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && normOrig[i - 1] === normMod[j - 1]) {
      rawDiff.push({
        type: 'unchanged',
        originalLineNumber: i,
        modifiedLineNumber: j,
        text: origLines[i - 1],
      });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      rawDiff.push({
        type: 'added',
        modifiedLineNumber: j,
        text: modLines[j - 1],
      });
      j--;
    } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
      rawDiff.push({
        type: 'removed',
        originalLineNumber: i,
        text: origLines[i - 1],
      });
      i--;
    }
  }

  const lines = rawDiff.reverse();
  let addedCount = 0;
  let removedCount = 0;
  let unchangedCount = 0;

  for (const l of lines) {
    if (l.type === 'added') addedCount++;
    else if (l.type === 'removed') removedCount++;
    else unchangedCount++;
  }

  return {
    lines,
    addedCount,
    removedCount,
    unchangedCount,
  };
}

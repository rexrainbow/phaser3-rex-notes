import Diff from './base';
import {generateOptions} from '../util/params';

export const lineDiff = new Diff();
lineDiff.tokenize = function(value?: any) {
  let retLines = [],
      linesAndNewlines = value.split(/(\n|\r\n)/);

  // Ignore the final empty token that occurs if the string ends with a new line
  if (!linesAndNewlines[linesAndNewlines.length - 1]) {
    linesAndNewlines.pop();
  }

  // Merge the content and line separators into single tokens
  for (let i = 0; i < linesAndNewlines.length; i++) {
    let line = linesAndNewlines[i];

    if (i % 2 && !this.options.newlineIsToken) {
      retLines[retLines.length - 1] += line;
    } else {
      if (this.options.ignoreWhitespace) {
        line = line.trim();
      }
      retLines.push(line);
    }
  }

  return retLines;
};

export function diffLines(oldStr?: any, newStr?: any, callback?: any) { return lineDiff.diff(oldStr, newStr, callback); }
export function diffTrimmedLines(oldStr?: any, newStr?: any, callback?: any) {
  let options = generateOptions(callback, {ignoreWhitespace: true});
  return lineDiff.diff(oldStr, newStr, options);
}
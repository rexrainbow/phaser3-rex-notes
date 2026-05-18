import Diff from './base';

export const cssDiff = new Diff();
cssDiff.tokenize = function(value?: any) {
  return value.split(/([{}:;,]|\s+)/);
};

export function diffCss(oldStr?: any, newStr?: any, callback?: any) { return cssDiff.diff(oldStr, newStr, callback); }
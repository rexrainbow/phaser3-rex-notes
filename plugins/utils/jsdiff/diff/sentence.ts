import Diff from './base';


export const sentenceDiff = new Diff();
sentenceDiff.tokenize = function(value?: any) {
  return value.split(/(\S.+?[.!?])(?=\s+|$)/);
};

export function diffSentences(oldStr?: any, newStr?: any, callback?: any) { return sentenceDiff.diff(oldStr, newStr, callback); }
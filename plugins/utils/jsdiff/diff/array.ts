import Diff from './base';

export const arrayDiff = new Diff();
arrayDiff.tokenize = function(value?: any) {
  return value.slice();
};
arrayDiff.join = arrayDiff.removeEmpty = function(value?: any) {
  return value;
};

export function diffArrays(oldArr?: any, newArr?: any, callback?: any) { return arrayDiff.diff(oldArr, newArr, callback); }
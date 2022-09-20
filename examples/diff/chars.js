import { diffChars } from 'diff';

const one = 'aaa bbb';
const other = 'aaa cbb';
const diff = diffChars(one, other);
console.log(diff);

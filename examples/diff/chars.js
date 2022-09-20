import { diffChars } from 'diff';

const one = 'aa-bb-cc-dd';
const other = 'aa-bb-ce-dd';
const diff = diffChars(one, other);
console.log(diff);

import path from 'node:path';
import RetrieveImports from './RetrieveImports.js';
import RenderIndexFile from './RenderIndexFile.js';

const args = process.argv.slice(2);
const result = RetrieveImports(path.resolve(args[0]));
const content = RenderIndexFile(result);
console.log(content)

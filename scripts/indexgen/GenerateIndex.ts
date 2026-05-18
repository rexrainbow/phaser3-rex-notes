const path = require('path');
const RetrieveImports = require('./RetrieveImports');
const RenderIndexFile = require('./RenderIndexFile');

const args = process.argv.slice(2);
const result = RetrieveImports(path.resolve(args[0]));
const content = RenderIndexFile(result);
console.log(content)
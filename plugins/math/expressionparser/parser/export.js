import fs from 'node:fs';
import jison from 'jison';

console.log("In progress...");

var parser = new jison.Parser(fs.readFileSync("grammar.jison", "utf8"));

// generate source, ready to be written to disk
var parserSource = parser.generate();
// console.log('Source: ', parserSource)

var index = parserSource.indexOf("if (typeof require !== 'undefined' && typeof exports !== 'undefined') {");
if (index === -1) {
	throw new Error('CommonJS export footer was not found in the generated parser.');
}
parserSource = parserSource.substring(0, index);
parserSource += [
	'export { parser };',
	'export const Parser = parser.Parser;',
	'export const parse = function () { return parser.parse.apply(parser, arguments); };',
	'export default parser;',
	''
].join('\n');

try {
	fs.writeFileSync("./parser.js", parserSource)
	//file written successfully
	console.log("Ok. The file parser was saved!");
} catch (err) {
	console.error(err)
}

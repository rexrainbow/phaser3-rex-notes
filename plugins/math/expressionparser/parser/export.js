var fs = require('fs');
var jison = require("jison");

console.log("In progress...");

var parser = new jison.Parser(fs.readFileSync("grammar.jison", "utf8"));

// generate source, ready to be written to disk
var parserSource = parser.generate();
// console.log('Source: ', parserSource)

var index = parserSource.indexOf('exports.main = function commonjsMain (args) {');
parserSource = parserSource.substring(0, index) + '}';

// End with line: 
// exports.parse = function () { return parser.parse.apply(parser, arguments); };

try {
	fs.writeFileSync("./parser.js", parserSource)
	//file written successfully
	console.log("Ok. The file parser was saved!");
} catch (err) {
	console.error(err)
}
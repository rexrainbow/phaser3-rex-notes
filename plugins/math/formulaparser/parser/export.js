var fs = require('fs');
var jison = require("jison");

console.log("In progress...");

var parser = new jison.Parser(fs.readFileSync("grammar.jison", "utf8"));

// generate source, ready to be written to disk
var parserSource = parser.generate();
// console.log('Source: ', parserSource)

try {
	fs.writeFileSync("./parser.js", parserSource)
	//file written successfully
	console.log("Ok. The file parser was saved!");
} catch (err) {
	console.error(err)
}
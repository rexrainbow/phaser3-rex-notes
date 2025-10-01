import parser from '../../plugins/graph/flowparser/parser.js';

var expression = `
A [label="A"]
B [label="B"]

A -> B -> C
A -> * -> D
`

var myParser = new parser.Parser();
var result = myParser.parse(expression)
console.log(result)
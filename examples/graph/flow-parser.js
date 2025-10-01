import parser from '../../plugins/graph/flowparser/parser.js';

var expression = `
A [label="A"]
B [label="B"]

A -> B -> C
A -> * -> D [color=0xFF0000]
`

var myParser = new parser.Parser();
var result = myParser.parse(expression)
console.log(result)
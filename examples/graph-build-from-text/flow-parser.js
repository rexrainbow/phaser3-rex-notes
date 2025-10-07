import parser from '../../plugins/graph/buildgraphfromtext/flowparser.js';

var expression = `
NODE [padding=3]

A [label=A, elk.layered.priority=1]
B [label=B]

A -> B -> C
A -> * -> D [color=0xFF0000]
C -> E ; D -> E
`

var myParser = new parser.Parser();
var result = myParser.parse(expression)
console.log(result)
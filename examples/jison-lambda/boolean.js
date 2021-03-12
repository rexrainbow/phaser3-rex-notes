import Parser from '../../plugins/utils/jison/lambda/index.js';

var parser = new Parser();
console.log(parser.exec("(a > 5) && (a < b)", { a: 10, b: 20 }));
console.log(parser.exec("(a > 5)? ((b < 10)? (1-1):(10%3)):(4/2)", { a: 10, b: 20 }));

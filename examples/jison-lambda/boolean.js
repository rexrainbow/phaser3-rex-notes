import Parser from '../../plugins/utils/jison/lambda/index.js';

var parser = new Parser();
console.log(parser.exec("(a > 5) && (a < b)", { a: 10, b: 20 }));

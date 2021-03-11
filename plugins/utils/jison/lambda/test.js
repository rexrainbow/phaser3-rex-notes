var parser = require('./parser.js');

var s = 'random * 10 + 5';
var result = parser.parse(s);
console.log(result());
console.log(result());
console.log(result());
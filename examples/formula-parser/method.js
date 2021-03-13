import Parser from '../../plugins/math/formulaparser/FormulaParser.js';

// Solution 1:
var parser = new Parser();
parser.randomInt = function (a, b) {
    return Math.floor(Math.random() * (b - a) + a);
};
var f = parser.compile("randomInt(a, b)");
var context = { a: 10, b: 20 };
for (var i = 0; i < 5; i++) {
    console.log(i, f(context));
}

// Solution 2:
class MyParser extends Parser {
    randomInt(a, b) {
        return Math.floor(Math.random() * (b - a) + a);
    }
}

var parser = new MyParser();
var f = parser.compile("randomInt(a, b)");
var context = { a: 10, b: 20 };
for (var i = 0; i < 5; i++) {
    console.log(i, f(context));
}

// Solution 3:
var parser = new Parser();
var f = parser.compile("randomInt(a, b)");
var context = {
    randomInt(a, b) {
        return Math.floor(Math.random() * (b - a) + a);
    },
    a: 10,
    b: 20
}
for (var i = 0; i < 5; i++) {
    console.log(i, f(context));
}


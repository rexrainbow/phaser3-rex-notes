import Parser from '../../plugins/utils/jison/lambda/index.js';

var parser = new Parser();
var lambda = parser.compile("randomInt(a, b)");
var context = {
    randomInt(a, b) {
        return Math.floor(Math.random() * (b - a) + a);
    },
    a: 10,
    b: 20
}
for (var i = 0; i < 10; i++) {
    console.log(lambda(context));
}

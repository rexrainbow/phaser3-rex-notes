import BaseParser from '../../plugins/utils/jison/lambda/index.js';

class Parser extends BaseParser {
    randomInt(a, b) {
        return Math.floor(Math.random() * (b - a) + a);
    }
}

var parser = new Parser();
var lambda = parser.compile("randomInt(a, b)", { a: 10, b: 20 });
for (var i = 0; i < 10; i++) {
    console.log(lambda());
}

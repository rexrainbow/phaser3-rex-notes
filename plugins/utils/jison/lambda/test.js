var parser = require('./parser.js');

var s0 = parser.parse('randomInt(4+1, 5+5)');
for (var i = 0; i < 10; i++) {
    console.log(s0());
}

var Base = require('./index.js');

const DegToRad = function (deg) { return deg * (Math.PI / 180); }
class Parser extends Base {
    sin(deg) {
        return Math.sin(DegToRad(deg));
    }
    cos(deg) {
        return Math.cos(DegToRad(deg));
    }
    random() {
        return Math.random();
    }
    randomInt(a, b) {
        return Math.floor(Math.random() * (b - a) + a);
    }
}

var parser = new Parser({ a: 10, b: 20 });

var s0 = parser.parse("randomInt(a,b)");
for (var i = 0; i < 10; i++) {
    console.log(s0());
}
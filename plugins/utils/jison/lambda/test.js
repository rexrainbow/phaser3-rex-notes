var Base = require('./parser.js').Parser;

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

var parser = new Parser();

//var s0 = parser.parse("random()*10");
//for (var i = 0; i < 10; i++) {
//    console.log(s0());
//}

console.log(parser.parse('cos(0)')());
console.log(parser.parse('cos(90)')());
console.log(parser.parse('cos(180)')());
console.log(parser.parse('cos(270)')());
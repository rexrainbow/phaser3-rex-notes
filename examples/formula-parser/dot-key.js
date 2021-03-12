import Parser from '../../plugins/math/formulaparser/FormulaParser.js';

var data = {
    a: {
        b: {
            c: 10
        }
    },
    d: {
        e: {
            f: 20
        }
    }
}
var parser = new Parser();
console.log(parser.exec("(a.b.c + d.e.f)*0.5", data));
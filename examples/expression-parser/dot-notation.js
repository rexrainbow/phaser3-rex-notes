import Parser from '../../plugins/expressionparser.js';

var expression = "(a.b.c + d.e.f)*0.5";
var parser = new Parser();
var f = parser.compile(expression);

var context = {
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
console.log(f(context));

context.a.b.c = 100;
context.d.e.f = 200;
console.log(f(context));

var Base = require('./parser.js').Parser;

class Parser extends Base {
    constructor(data) {
        if (data === undefined) {
            data = {};
        }
        super();
        this.data = data
    }

    add(a, b) {
        return a + b;
    }

    subtract(a, b) {
        return a - b;
    }

    multiply(a, b) {
        return a * b;
    }

    divide(a, b) {
        return a / b;
    }

    pow(a, b) {
        return Math.pow(a, b);
    }

    greaterThen(a, b) {
        return a > b;
    }

    lessThen(a, b) {
        return a < b;
    }

    equalTo(a, b) {
        return a == b;
    }

    or(a, b) {
        return a || b;
    }

    and(a, b) {
        return a && b;
    }

    defaultHandler(name, args) {
        return 0;
    }

    compile(input) {
        return this.parse(input);
    }

    exec(input, data) {
        if (data) {
            for (var k in data) {
                this.data[k] = data[k];
            }
        }
        if (typeof (input) === 'string') {
            input = this.compile(input);
        }
        return input();
    }
}

module.exports = Parser;
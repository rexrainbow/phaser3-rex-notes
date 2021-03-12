import parser from './parser/parser.js';

class Parser extends parser.Parser {
    constructor(data) {
        if (data === undefined) {
            data = {};
        }
        super();
        this.data = data
    }

    setData(key, value) {
        if (typeof (key) === 'string') {
            this.data[key] = value;
        } else {
            var data = key;
            for (var key in data) {
                this.data[key] = data[key];
            }
        }
        return this;
    }

    getData(key) {
        return this.data[key];
    }

    clearData() {
        for (var key in this.data) {
            delete this.data[key];
        }
        return this;
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

    compile(input, data) {
        if (data) {
            this.setData(data);
        }
        return this.parse(input);
    }

    exec(input, data) {
        if (data) {
            this.setData(data);
        }
        if (typeof (input) === 'string') {
            input = this.compile(input);
        }
        return input();
    }
}

export default Parser;
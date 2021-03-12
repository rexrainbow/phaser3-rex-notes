import parser from './parser/parser.js';
import GetValue from '../../object/GetValue.js';

class Parser extends parser.Parser {
    getProperty(context, name, defaultValue) {
        if (context && context[name]) {
            return context[name];
        } else if (this[name]) {
            return this[name];
        } else {
            return defaultValue;
        }
    }

    getDotProperty(context, name, defaultValue) {
        var value = GetValue(context, name);
        if (value !== undefined) {
            return value;
        }
        return GetValue(this, name, defaultValue);
    }

    _add(a, b) {
        return a + b;
    }

    _subtract(a, b) {
        return a - b;
    }

    _multiply(a, b) {
        return a * b;
    }

    _divide(a, b) {
        return a / b;
    }

    _pow(a, b) {
        return Math.pow(a, b);
    }

    _greaterThen(a, b) {
        return a > b;
    }

    _lessThen(a, b) {
        return a < b;
    }

    _equalTo(a, b) {
        return a == b;
    }

    _or(a, b) {
        return a || b;
    }

    _and(a, b) {
        return a && b;
    }

    defaultHandler(name, args) {
        return 0;
    }

    compile(input) {
        return this.parse(input);
    }

    exec(input, data) {
        if (typeof (input) === 'string') {
            input = this.compile(input);
        }
        return input(data);
    }
}

export default Parser;
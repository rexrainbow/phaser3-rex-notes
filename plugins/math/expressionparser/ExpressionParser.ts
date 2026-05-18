import parser from './parser/parser';
import GetProperty from './GetProperty';

class FormulaParser extends parser.Parser {
    parse: any;

    getProperty(context?: any, name?: any, defaultValue?: any) {
        var value = GetProperty(context, name, undefined, false);
        if (value !== undefined) {
            return value;
        }
        return GetProperty(this, name, defaultValue, false);
    }

    getDotProperty(context?: any, name?: any, defaultValue?: any) {
        var value = GetProperty(context, name, undefined, true);
        if (value !== undefined) {
            return value;
        }
        return GetProperty(this, name, defaultValue, true);
    }

    static GetProperty(context?: any, key?: any, defaultValue?: any, dotMode?: any) {
        return GetProperty(context, key, defaultValue, dotMode);
    }

    _add(a?: any, b?: any) {
        return a + b;
    }

    _subtract(a?: any, b?: any) {
        return a - b;
    }

    _multiply(a?: any, b?: any) {
        return a * b;
    }

    _divide(a?: any, b?: any) {
        return a / b;
    }

    _mod(a?: any, b?: any) {
        return a % b;
    }

    _pow(a?: any, b?: any) {
        return Math.pow(a, b);
    }

    _greaterThen(a?: any, b?: any) {
        return a > b;
    }

    _lessThen(a?: any, b?: any) {
        return a < b;
    }

    _equalTo(a?: any, b?: any) {
        return a == b;
    }

    _or(a?: any, b?: any) {
        return a || b;
    }

    _and(a?: any, b?: any) {
        return a && b;
    }

    defaultHandler(name?: any, args?: any) {
        return 0;
    }

    compile(input?: any) {
        return this.parse(input);
    }

    exec(input?: any, data?: any) {
        if (typeof (input) === 'string') {
            input = this.compile(input);
        }
        return input(data);
    }
}

export default FormulaParser;
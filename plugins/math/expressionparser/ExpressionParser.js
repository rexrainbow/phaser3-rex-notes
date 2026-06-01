import parser from './parser/parser.js';
import GetProperty from './GetProperty.js';

const MISSING = {};

class FormulaParser extends parser.Parser {
    getProperty(context, name, defaultValue) {
        var value = GetProperty(context, name, MISSING, false);
        if (value !== MISSING) {
            return value;
        }

        value = GetProperty(this, name, MISSING, false);
        if (value !== MISSING) {
            return value;
        }

        return defaultValue;
    }

    getDotProperty(context, name, defaultValue) {
        var value = GetProperty(context, name, MISSING, true);
        if (value !== MISSING) {
            return value;
        }

        value = GetProperty(this, name, MISSING, true);
        if (value !== MISSING) {
            return value;
        }

        return this.runDefaultValueHandler(context, name, defaultValue);
    }

    static GetProperty(context, key, defaultValue, dotMode) {
        return GetProperty(context, key, defaultValue, dotMode);
    }

    getDefaultValueHandler(context) {
        var callback, scope;
        if (
            (context != null) &&
            ((typeof (context) === 'object') || (typeof (context) === 'function')) &&
            ('defaultValueHandler' in context)
        ) {
            callback = context.defaultValueHandler;
            if (callback != null) {
                scope = context;
            }
        }

        if (callback == null) {
            callback = this.defaultValueHandler;
            scope = this;
        }

        return {
            callback: callback,
            scope: scope
        };
    }

    runDefaultValueHandler(context, name, defaultValue) {
        var defaultValueHandler = this.getDefaultValueHandler(context);
        var path = Array.isArray(name) ? name.slice() : ((typeof (name) === 'string') ? name.split('.') : [name]);
        var nameString = path.join('.');

        if (defaultValueHandler.callback == null) {
            return defaultValue;
        }

        return defaultValueHandler.callback.call(defaultValueHandler.scope, nameString, context, path);
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

    _mod(a, b) {
        return a % b;
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

    defaultHandler(name, args, context) {
        return 0;
    }

    defaultValueHandler(name, context, path) {
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

export default FormulaParser;

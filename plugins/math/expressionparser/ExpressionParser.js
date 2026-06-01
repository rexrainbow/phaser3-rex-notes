import parser from './parser/parser.js';
import GetProperty from './GetProperty.js';
import IsUnsafePropertyName from './IsUnsafePropertyName.js';

const MISSING = {};

class FormulaParser extends parser.Parser {
    constructor(config) {
        super();

        this.functions = Object.create(null);
        this.safeMode = false;

        this.setSafeMode(GetProperty(config, 'safeMode', false));
    }

    getProperty(context, name, defaultValue) {
        var value = GetProperty(context, name, MISSING, false, this.safeMode);
        if (value !== MISSING) {
            return value;
        }

        if (!this.safeMode) {
            value = GetProperty(this, name, MISSING, false);
            if (value !== MISSING) {
                return value;
            }
        }

        return defaultValue;
    }

    getDotProperty(context, name, defaultValue) {
        var value = GetProperty(context, name, MISSING, true, this.safeMode);
        if (value !== MISSING) {
            return value;
        }

        if (!this.safeMode) {
            value = GetProperty(this, name, MISSING, true);
            if (value !== MISSING) {
                return value;
            }
        }

        return this.runDefaultValueHandler(context, name, defaultValue);
    }

    getContextDotProperty(context, name, defaultValue) {
        return GetProperty(context, name, defaultValue, true, this.safeMode);
    }

    static GetProperty(context, key, defaultValue, dotMode, safeMode) {
        return GetProperty(context, key, defaultValue, dotMode, safeMode);
    }

    setSafeMode(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.safeMode = enable;
        return this;
    }

    isUnsafePropertyName(name) {
        return IsUnsafePropertyName(name);
    }

    checkSafeName(name) {
        if (this.safeMode && IsUnsafePropertyName(name)) {
            throw new Error('Unsafe property access: ' + name);
        }
    }

    checkSafePath(path) {
        if (!this.safeMode) {
            return;
        }

        if (Array.isArray(path)) {
            for (var i = 0; i < path.length; i++) {
                this.checkSafeName(path[i]);
            }
        } else if (typeof (path) === 'string') {
            var names = path.split('.');
            for (var j = 0; j < names.length; j++) {
                this.checkSafeName(names[j]);
            }
        } else {
            this.checkSafeName(path);
        }
    }

    getMethodProperty(scope, name) {
        if (scope == null) {
            return undefined;
        }

        this.checkSafeName(name);

        if (this.safeMode &&
            !Object.prototype.hasOwnProperty.call(scope, name)
        ) {
            return undefined;
        } else if (!this.safeMode && !(name in scope)) {
            return undefined;
        }

        return scope[name];
    }

    setFunction(name, callback) {
        this.checkSafePath(name);
        this.functions[name] = callback;
        return this;
    }

    getFunction(name) {
        this.checkSafePath(name);
        return this.functions[name];
    }

    removeFunction(name) {
        this.checkSafePath(name);
        delete this.functions[name];
        return this;
    }

    clearFunctions() {
        this.functions = Object.create(null);
        return this;
    }

    getDefaultValueHandler(context) {
        var callback, scope;
        if (
            (context != null) &&
            ((typeof (context) === 'object') || (typeof (context) === 'function')) &&
            (
                this.safeMode ?
                    Object.prototype.hasOwnProperty.call(context, 'defaultValueHandler') :
                    ('defaultValueHandler' in context)
            )
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

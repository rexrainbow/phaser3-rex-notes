import parser from './parser/parser.js';
import GetProperty from './GetProperty.js';
import IsUnsafePropertyName from './IsUnsafePropertyName.js';

const MISSING = {};

class FormulaParser extends parser.Parser {
    constructor(config) {
        super();

        this.functions = Object.create(null);
        this.values = Object.create(null);
        this.cacheExpressions = false;
        this.expressionCache = Object.create(null);
        this.safeMode = false;

        if (typeof (config) === 'boolean') {
            config = {
                safeMode: config
            }
        }

        this.setSafeMode(GetProperty(config, 'safeMode', false));

        var functions = GetProperty(config, 'functions', undefined);
        if (functions) {
            this.setFunctions(functions);
        }

        var values = GetProperty(config, 'values', undefined);
        if (values) {
            this.setValues(values);
        }

        var defaultHandler = GetProperty(config, 'defaultHandler', undefined);
        if (defaultHandler !== undefined) {
            this.defaultHandler = defaultHandler;
        }

        var defaultValueHandler = GetProperty(config, 'defaultValueHandler', undefined);
        if (defaultValueHandler !== undefined) {
            this.defaultValueHandler = defaultValueHandler;
        }

        this.setCacheEnable(GetProperty(config, 'cache', false));

    }

    getProperty(context, name, defaultValue) {
        var value = GetProperty(context, name, MISSING, false, this.safeMode);
        if (value !== MISSING) {
            return value;
        }

        value = this.getValue(name, MISSING);
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

        value = this.getValue(name, MISSING);
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

    getPath(name) {
        return Array.isArray(name) ? name.slice() : ((typeof (name) === 'string') ? name.split('.') : [name]);
    }

    getPathName(name) {
        return this.getPath(name).join('.');
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
        if (typeof (callback) !== 'function') {
            throw new Error('Invalid function: ' + name);
        }
        this.functions[name] = callback;
        return this;
    }

    setFunctions(functions) {
        for (var name in functions) {
            if (Object.prototype.hasOwnProperty.call(functions, name)) {
                this.setFunction(name, functions[name]);
            }
        }
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

    setValue(name, value) {
        this.checkSafePath(name);
        this.values[name] = value;
        return this;
    }

    setValues(values) {
        for (var name in values) {
            if (Object.prototype.hasOwnProperty.call(values, name)) {
                this.setValue(name, values[name]);
            }
        }
        return this;
    }

    getValue(name, defaultValue) {
        this.checkSafePath(name);

        var nameString = this.getPathName(name);
        if (Object.prototype.hasOwnProperty.call(this.values, nameString)) {
            return this.values[nameString];
        }

        var value = GetProperty(this.values, this.getPath(name), MISSING, true, this.safeMode);
        return (value === MISSING) ? defaultValue : value;
    }

    removeValue(name) {
        this.checkSafePath(name);
        delete this.values[this.getPathName(name)];
        return this;
    }

    clearValues() {
        this.values = Object.create(null);
        return this;
    }

    setCacheEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.cacheExpressions = enable;
        return this;
    }

    clearCache() {
        this.expressionCache = Object.create(null);
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

    compile(input, config) {
        var cache = this.cacheExpressions;
        if (config && (config.cache !== undefined)) {
            cache = config.cache;
        }

        if (!cache) {
            return this.parse(input);
        }

        if (!Object.prototype.hasOwnProperty.call(this.expressionCache, input)) {
            this.expressionCache[input] = this.parse(input);
        }
        return this.expressionCache[input];
    }

    exec(input, data, config) {
        if (typeof (input) === 'string') {
            input = this.compile(input, config);
        }
        return input(data);
    }
}

export default FormulaParser;

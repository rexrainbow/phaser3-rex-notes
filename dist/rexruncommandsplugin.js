(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexruncommandsplugin = factory());
})(this, (function () { 'use strict';

    var GetValue = function (source, key, defaultValue) {
        if (!source || typeof source === 'number') {
            return defaultValue;
        }

        if (typeof (key) === 'string') {
            if (source.hasOwnProperty(key)) {
                return source[key];
            }
            if (key.indexOf('.') !== -1) {
                key = key.split('.');
            } else {
                return defaultValue;
            }
        }

        var keys = key;
        var parent = source;
        var value = defaultValue;

        //  Use for loop here so we can break early
        for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            if (parent.hasOwnProperty(key)) {
                //  Yes it has a key property, let's carry on down
                value = parent[key];

                parent = value;
            }
            else {
                //  Can't go any further, so reset to default
                value = defaultValue;
                break;
            }
        }

        return value;
    };

    var Copy = function (dest, src, startIdx, endIdx) {
        if (startIdx === undefined) {
            startIdx = 0;
        }    if (endIdx === undefined) {
            endIdx = src.length;
        }
        dest.length = endIdx - startIdx;
        for (var i = 0, len = dest.length; i < len; i++) {
            dest[i] = src[i + startIdx];
        }
        return dest;
    };

    var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;
    var HEX = /^0x[0-9A-F]+$/i;

    var TypeConvert = function (s) {
        if (typeof (s) !== 'string') {
            return s;
        }

        if (s === '') {
            s = null;

        } else if (FLOAT.test(s)) {
            s = parseFloat(s);

        } else if (HEX.test(s)) {
            s = parseInt(s, 16);

        } else {
            switch (s) {
                case 'false': s = false; break;
                case 'true': s = true; break;
                case 'null': s = null; break;
                case 'undefined': s = undefined; break;
            }
        }

        return s;
    };

    var IsArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    var RunCommands = function (queue, scope, config) {
        var reverse = GetValue(config, 'reverse', false);

        var retVal;
        if (IsArray(queue[0])) {
            if (!reverse) {
                for (var i = 0, len = queue.length; i < len; i++) {
                    retVal = RunCommands(queue[i], scope, config);
                }
            } else {
                for (var len = queue.length, i = len - 1; i >= 0; i--) {
                    retVal = RunCommands(queue[i], scope, config);
                }
            }
        } else {
            retVal = RunCommand(queue, scope, config);
        }

        return retVal;
    };

    var RunCommand = function (cmd, scope, config) {
        var argsConvert = GetValue(config, 'argsConvert', undefined);
        var argsConvertScope = GetValue(config, 'argsConvertScope', undefined);

        var fnName = cmd[0];

        ARGS = Copy(ARGS, cmd, 1);
        if (argsConvert) {
            // convert string to floating number, boolean, null, or string        
            if (argsConvert === true) {
                argsConvert = TypeConvert;
                argsConvertScope = undefined;
            }
            for (var i = 0, len = ARGS.length; i < len; i++) {
                if (argsConvertScope) {
                    ARGS[i] = argsConvert.call(argsConvertScope, ARGS[i], cmd);
                } else {
                    ARGS[i] = argsConvert(ARGS[i], cmd);
                }
            }
        }

        var fn;
        if (typeof (fnName) === 'string') {
            fn = scope[fnName];
            if (fn == null) {
                fn = GetValue(scope, fnName, null);
            }
        } else {
            fn = fnName;
        }

        var retValue = fn.apply(scope, ARGS);
        return retValue;
    };
    var ARGS = []; // reuse this array

    class RunCommandsPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        run(queue, scope, config) {
            return RunCommands(queue, scope, config);
        }
    }

    return RunCommandsPlugin;

}));

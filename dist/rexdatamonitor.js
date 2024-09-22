(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexdatamonitor = factory());
})(this, (function () { 'use strict';

    var GetPropertyPath = function (parentPath, property) {
        return (parentPath === '') ? property : `${parentPath}.${property}`;
    };

    var EmitEvents = function (eventEmitter, op, parentPath, property, value, prevValue) {
        var propertyPath = GetPropertyPath(parentPath, property);
        eventEmitter.emit(`${op}-${propertyPath}`, value, prevValue);

        var parentPath = (parentPath === '') ? '*' : `${parentPath}.*`;
        eventEmitter.emit(`${op}-${parentPath}`, property, value, prevValue);

        eventEmitter.emit(`${op}`, propertyPath, value, prevValue);
    };

    var EmitAddKeyEvents = function (eventEmitter, eventName, parentPath, property, value) {
        EmitEvents(eventEmitter, eventName, parentPath, property, value, undefined);
    };

    var EmitSetValueEvents = function (eventEmitter, eventName, parentPath, property, value, prevValue) {
        EmitEvents(eventEmitter, eventName, parentPath, property, value, prevValue);
    };

    var EmitDeleteKeyEvents = function (eventEmitter, eventName, parentPath, property) {
        EmitEvents(eventEmitter, eventName, parentPath, property, undefined, undefined);
    };

    var IsPlainObject = function (obj)
    {
        // Not plain objects:
        // - Any object or value whose internal [[Class]] property is not "[object Object]"
        // - DOM nodes
        // - window
        if (typeof(obj) !== 'object' || obj.nodeType || obj === obj.window)
        {
            return false;
        }

        // Support: Firefox <20
        // The try/catch suppresses exceptions thrown when attempting to access
        // the "constructor" property of certain host objects, ie. |window.location|
        // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
        try
        {
            if (obj.constructor && !({}).hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf'))
            {
                return false;
            }
        }
        catch (e)
        {
            return false;
        }

        // If the function hasn't returned already, we're confident that
        // |obj| is a plain object, created by {} or constructed with new Object
        return true;
    };

    var AddMonitor = function (data, eventEmitter, eventNames, parentPath, subKey) {
        if (subKey) {
            parentPath = GetPropertyPath(parentPath, subKey);
        }

        var monitor;
        if (Array.isArray(data)) {
            monitor = AddArrayMonitor(data, eventEmitter, eventNames, parentPath);
        } else {
            monitor = AddDictionaryMonitor(data, eventEmitter, eventNames, parentPath);
        }

        for (var property in data) {
            var value = data[property];

            if (!IsPlainObject(value)) {
                // Number or string
                EmitAddKeyEvents(eventEmitter, eventNames.addKey, parentPath, property, value);

            } else {
                // Dictionary or array
                EmitAddKeyEvents(eventEmitter, eventNames.addKey, parentPath, property, value);

                // Replace value by monitor
                value = AddMonitor(value, eventEmitter, eventNames, parentPath, property);
                Reflect.set(data, property, value);

            }
        }

        return monitor;
    };

    var ProcessSetTargetAction = function (
        target, property, value,
        eventEmitter, eventNames, parentPath
    ) {
        var prevValue, eventName, fireEventCallback;
        if (!Reflect.has(target, property)) {
            // Add new key
            prevValue = undefined;
            eventName = eventNames.addKey;
            fireEventCallback = EmitAddKeyEvents;
        } else {
            // Set key
            prevValue = Reflect.get(target, property);
            eventName = eventNames.setKey;
            fireEventCallback = EmitSetValueEvents;
        }

        if (!IsPlainObject(value)) {
            // Number or string
            Reflect.set(target, property, value);
            fireEventCallback(eventEmitter, eventName, parentPath, property, value, prevValue);

        } else {
            // Dictionary or array
            fireEventCallback(eventEmitter, eventName, parentPath, property, value, prevValue);
            value = AddMonitor(value, eventEmitter, eventNames, parentPath, property);
            Reflect.set(target, property, value);
        }
    };

    var AddDictionaryMonitor = function (data, eventEmitter, eventNames, parentPath) {
        return new Proxy(data, {
            set(target, property, value) {
                ProcessSetTargetAction(
                    target, property, value,
                    eventEmitter, eventNames, parentPath
                );

                return true;
            },

            deleteProperty(target, property) {
                if (Reflect.has(target, property)) {
                    Reflect.deleteProperty(target, property);
                    EmitDeleteKeyEvents(eventEmitter, eventNames.deleteKey, parentPath, property);
                }
                return true;
            }
        });
    };

    var AddArrayMonitor = function (data, eventEmitter, eventNames, parentPath) {
        return new Proxy(data, {
            set(target, property, value) {
                if (property === 'length') { // Skip length property
                    return true;
                }

                ProcessSetTargetAction(
                    target, property, value,
                    eventEmitter, eventNames, parentPath
                );

                return true;
            },

            deleteProperty(target, property) {
                Reflect.deleteProperty(target, property);
                target.splice(property, 1);
                EmitDeleteKeyEvents(eventEmitter, eventNames.deleteKey, parentPath, property);
                return true;
            }
        });
    };

    var AddDataMonitor = function ({
        data = {},
        eventEmitter,
        eventNames,
        parentPath = '',
    }) {

        if (!eventNames) {
            eventNames = {};
        } else {
            eventNames = { ...eventNames };
        }

        if (!eventNames.hasOwnProperty('addKey')) {
            eventNames.addKey = 'add';
        }
        if (!eventNames.hasOwnProperty('setKey')) {
            eventNames.setKey = 'set';
        }
        if (!eventNames.hasOwnProperty('deleteKey')) {
            eventNames.deleteKey = 'del';
        }

        var proxyData = AddMonitor(data, eventEmitter, eventNames, parentPath);

        return proxyData;
    };

    return AddDataMonitor;

}));

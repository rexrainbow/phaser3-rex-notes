import { EmitAddKeyEvents, EmitSetValueEvents, EmitDeleteKeyEvents } from './EmitEvents';
import GetPropertyPath from './GetPropertyPath';
import IsPlainObject from '../../object/IsPlainObject';

var AddMonitor = function(data?: any, eventEmitter?: any, eventNames?: any, parentPath?: any, subKey?: any) {
    if (subKey?: any) {
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
            EmitAddKeyEvents(eventEmitter, eventNames.addKey, parentPath, property, value, undefined);

        } else {
            // Dictionary or array
            EmitAddKeyEvents(eventEmitter, eventNames.addKey, parentPath, property, value, undefined);

            // Replace value by monitor
            value = AddMonitor(value, eventEmitter, eventNames, parentPath, property);
            Reflect.set(data, property, value);

        }
    }

    return monitor;
}

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
        fireEventCallback = EmitSetValueEvents
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
}

var AddDictionaryMonitor = function(data?: any, eventEmitter?: any, eventNames?: any, parentPath?: any) {
    return new Proxy(data, {
        set(target?: any, property?: any, value?: any) {
            ProcessSetTargetAction(
                target, property, value,
                eventEmitter, eventNames, parentPath
            );

            return true;
        },

        deleteProperty(target?: any, property?: any) {
            if (Reflect.has(target, property)) {
                Reflect.deleteProperty(target, property);
                EmitDeleteKeyEvents(eventEmitter, eventNames.deleteKey, parentPath, property);
            }
            return true;
        }
    });
}

var AddArrayMonitor = function(data?: any, eventEmitter?: any, eventNames?: any, parentPath?: any) {
    return new Proxy(data, {
        set(target?: any, property?: any, value?: any) {
            if (property === 'length') { // Skip length property
                return true;
            }

            ProcessSetTargetAction(
                target, property, value,
                eventEmitter, eventNames, parentPath
            );

            return true;
        },

        deleteProperty(target?: any, property?: any) {
            Reflect.deleteProperty(target, property);
            target.splice(property, 1);
            EmitDeleteKeyEvents(eventEmitter, eventNames.deleteKey, parentPath, property);
            return true;
        }
    });
}

export default AddMonitor;
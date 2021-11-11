import { EmitAddKeyEvents, EmitSetValueEvents, EmitDeleteKeyEvents } from './EmitEvents.js';

var AddDictionaryMonitor = function (eventEmitter, data, prefix) {
    return new Proxy(data, {
        set(target, property, value) {
            if (Reflect.has(target, property)) {
                var prevValue = Reflect.get(target, property);
                Reflect.set(target, property, value);
                EmitSetValueEvents(eventEmitter, prefix, property, value, prevValue);
            } else {
                Reflect.set(target, property, value);
                EmitAddKeyEvents(eventEmitter, prefix, property, value);
            }
            return true;
        },

        deleteProperty(target, property) {
            if (Reflect.has(target, property)) {
                Reflect.deleteProperty(target, property);
                EmitDeleteKeyEvents(eventEmitter, prefix, property);
            }
            return true;
        }
    });
}

export default AddDictionaryMonitor;
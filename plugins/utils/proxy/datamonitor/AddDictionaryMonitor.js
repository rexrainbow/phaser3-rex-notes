import FireSetValueEvents from './events/FireSetValueEvents.js';
import FireAddKeyEvents from './events/FireAddKeyEvents.js';
import FireDeleteKeyEvents from './events/FireDeleteKeyEvents.js';

var AddDictionaryMonitor = function (eventEmitter, data, prefix) {
    return new Proxy(data, {
        set(target, property, value) {
            if (Reflect.has(target, property)) {
                var prevValue = Reflect.get(target, property);
                Reflect.set(target, property, value);
                FireSetValueEvents(eventEmitter, prefix, property, value, prevValue);
            } else {
                Reflect.set(target, property, value);
                FireAddKeyEvents(eventEmitter, prefix, property, value);
            }
            return true;
        },

        deleteProperty(target, property) {
            if (Reflect.has(target, property)) {
                Reflect.deleteProperty(target, property);
                FireDeleteKeyEvents(eventEmitter, prefix, property);
            }
            return true;
        }
    });
}

export default AddDictionaryMonitor;
import FireSetValueEvents from './events/FireSetValueEvents.js';
import FireDeleteKeyEvents from './events/FireDeleteKeyEvents.js';

// TODO
var AddArrayMonitor = function (eventEmitter, data, prefix) {
    return new Proxy(data, {
        set(target, property, value) {
            if (property === 'length') { // Skip length property
                return true;
            }

            var prevValue = Reflect.get(target, property);
            Reflect.set(target, property, value);
            FireSetValueEvents(eventEmitter, prefix, property, value, prevValue);
            return true;
        },

        deleteProperty(target, property) {
            Reflect.deleteProperty(target, property);
            target.splice(property, 1);
            FireDeleteKeyEvents(eventEmitter, prefix, property);
            return true;
        }
    });
}

export default AddArrayMonitor;
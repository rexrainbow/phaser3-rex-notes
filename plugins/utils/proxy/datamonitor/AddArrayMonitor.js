import FireSetValueEvents from './FireSetValueEvents.js';

// TODO
var AddArrayMonitor = function (eventEmitter, data, prefix) {
    return new Proxy(data, {
        set(target, prop, value) {
            if (prop === 'length') { // Skip length property
                return true;
            }

            var prevValue = Reflect.get(target, prop);
            Reflect.set(target, prop, value);
            FireSetValueEvents(eventEmitter, prefix, prop, value, prevValue);
            return true;
        },
    });
}

export default AddArrayMonitor;
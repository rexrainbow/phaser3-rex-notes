import FireSetValueEvents from './FireSetValueEvents.js';

var AddDictionaryMonitor = function (eventEmitter, data, prefix) {
    return new Proxy(data, {
        set(target, prop, value) {
            var prevValue = Reflect.get(target, prop);
            Reflect.set(target, prop, value);
            FireSetValueEvents(eventEmitter, prefix, prop, value, prevValue);
            return true;
        },
    });
}

export default AddDictionaryMonitor;
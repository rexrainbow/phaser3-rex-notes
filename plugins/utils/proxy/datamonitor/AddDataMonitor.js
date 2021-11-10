import AddDictionaryMonitor from './AddDictionaryMonitor.js';
import AddArrayMonitor from './AddArrayMonitor.js';
import FireSetValueEvents from './FireSetValueEvents.js';

var AddDataMonitor = function (data, eventEmitter, prefix) {
    if (prefix === undefined) {
        prefix = '';
    }

    var monitor;
    if (Array.isArray(data)) {
        monitor = AddArrayMonitor(data, eventEmitter, prefix);
    } else {
        monitor = AddDictionaryMonitor(data, eventEmitter, prefix);
    }

    for (var key in data) {
        var child = data[key];
        if (typeof (child) === 'object') {
            var childPrefix = (prefix === '') ? key : `${prefix}.${key}`;
            monitor[key] = AddDataMonitor(child, eventEmitter, childPrefix);
        } else {
            FireSetValueEvents(eventEmitter, prefix, key, child, undefined);
        }
    }

    return monitor;
}

export default AddDataMonitor;
import AddDictionaryMonitor from './AddDictionaryMonitor.js';
import AddArrayMonitor from './AddArrayMonitor.js';
import FireSetValueEvents from './FireSetValueEvents.js';

var AddDataMonitor = function (eventEmitter, data) {
    return AddMonitor(eventEmitter, data, '');
}

var AddMonitor = function (eventEmitter, data, prefix) {
    var monitor;
    if (Array.isArray(data)) {
        monitor = AddArrayMonitor(eventEmitter, data, prefix);
    } else {
        monitor = AddDictionaryMonitor(eventEmitter, data, prefix);
    }

    for (var key in data) {
        var child = data[key];
        if (typeof (child) === 'object') {
            var childPrefix = (prefix === '') ? key : `${prefix}.${key}`;
            monitor[key] = AddMonitor(eventEmitter, child, childPrefix);
        } else {
            FireSetValueEvents(eventEmitter, prefix, key, child, undefined);
        }
    }

    return monitor;
}


export default AddDataMonitor;
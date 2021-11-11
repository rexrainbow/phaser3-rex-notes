import AddDictionaryMonitor from './AddDictionaryMonitor.js';
import AddArrayMonitor from './AddArrayMonitor.js';
import { EmitAddKeyEvents } from './EmitEvents.js';

var AddDataMonitor = function (eventEmitter, data) {
    if (data === undefined) {
        data = {};
    }
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
            EmitAddKeyEvents(eventEmitter, prefix, key, child, undefined);
        }
    }

    return monitor;
}


export default AddDataMonitor;
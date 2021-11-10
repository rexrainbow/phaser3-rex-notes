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
        }
    }

    return monitor;
}

var AddDictionaryMonitor = function (data, eventEmitter, prefix) {
    return new Proxy(data, {
        set(target, prop, value) {
            var prevValue = Reflect.get(target, prop);
            Reflect.set(target, prop, value);

            var eventName = (prefix === '') ? `set-${prop}` : `set-${prefix}.${prop}`;
            eventEmitter.emit(eventName, value, prevValue);

            var eventName = (prefix === '') ? 'set-*' : `set-${prefix}.*`
            eventEmitter.emit(eventName, prop, value, prevValue);

            return true;
        },
    });
}

// TODO
var AddArrayMonitor = function (data, eventEmitter, prefix) {
    return new Proxy(data, {
        set(target, prop, value) {
            Reflect.set(target, prop, value);
            return true;
        },
    });
}

export default AddDataMonitor;
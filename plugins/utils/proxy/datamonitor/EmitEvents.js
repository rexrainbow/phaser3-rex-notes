var EmitEvents = function (eventEmitter, op, prefix, property, value, prevValue) {
    var fullPropPath = (prefix === '') ? property : `${prefix}.${property}`;
    eventEmitter.emit(`${op}-${fullPropPath}`, value, prevValue);

    var parentPath = (prefix === '') ? '*' : `${prefix}.*`
    eventEmitter.emit(`${op}-${parentPath}`, property, value, prevValue);

    eventEmitter.emit(`${op}`, fullPropPath, value, prevValue);
}

var EmitAddKeyEvents = function (eventEmitter, prefix, property, value) {
    EmitEvents(eventEmitter, 'add', prefix, property, value, undefined);
}

var EmitSetValueEvents = function (eventEmitter, prefix, property, value, prevValue) {
    EmitEvents(eventEmitter, 'set', prefix, property, value, prevValue);
}

var EmitDeleteKeyEvents = function (eventEmitter, prefix, property) {
    EmitEvents(eventEmitter, 'del', prefix, property, undefined, undefined);
}

export {
    EmitAddKeyEvents,
    EmitSetValueEvents,
    EmitDeleteKeyEvents
};
import GetPropertyPath from './GetPropertyPath.js';

var EmitEvents = function (eventEmitter, op, parentPath, property, value, prevValue) {
    var propertyPath = GetPropertyPath(parentPath, property);
    eventEmitter.emit(`${op}-${propertyPath}`, value, prevValue);

    var parentPath = (parentPath === '') ? '*' : `${parentPath}.*`
    eventEmitter.emit(`${op}-${parentPath}`, property, value, prevValue);

    eventEmitter.emit(`${op}`, propertyPath, value, prevValue);
}

var EmitAddKeyEvents = function (eventEmitter, eventName, parentPath, property, value) {
    EmitEvents(eventEmitter, eventName, parentPath, property, value, undefined);
}

var EmitSetValueEvents = function (eventEmitter, eventName, parentPath, property, value, prevValue) {
    EmitEvents(eventEmitter, eventName, parentPath, property, value, prevValue);
}

var EmitDeleteKeyEvents = function (eventEmitter, eventName, parentPath, property) {
    EmitEvents(eventEmitter, eventName, parentPath, property, undefined, undefined);
}

export {
    EmitAddKeyEvents,
    EmitSetValueEvents,
    EmitDeleteKeyEvents
};
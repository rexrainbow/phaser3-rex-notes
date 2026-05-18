import GetPropertyPath from './GetPropertyPath';

var EmitEvents = function(eventEmitter?: any, op?: any, parentPath?: any, property?: any, value?: any, prevValue?: any) {
    var propertyPath = GetPropertyPath(parentPath, property);
    eventEmitter.emit(`${op}-${propertyPath}`, value, prevValue);

    var parentPath = (parentPath === '') ? '*' : `${parentPath}.*`
    eventEmitter.emit(`${op}-${parentPath}`, property, value, prevValue);

    eventEmitter.emit(`${op}`, propertyPath, value, prevValue);
}

var EmitAddKeyEvents = function(eventEmitter?: any, eventName?: any, parentPath?: any, property?: any, value?: any) {
    EmitEvents(eventEmitter, eventName, parentPath, property, value, undefined);
}

var EmitSetValueEvents = function(eventEmitter?: any, eventName?: any, parentPath?: any, property?: any, value?: any, prevValue?: any) {
    EmitEvents(eventEmitter, eventName, parentPath, property, value, prevValue);
}

var EmitDeleteKeyEvents = function(eventEmitter?: any, eventName?: any, parentPath?: any, property?: any) {
    EmitEvents(eventEmitter, eventName, parentPath, property, undefined, undefined);
}

export {
    EmitAddKeyEvents,
    EmitSetValueEvents,
    EmitDeleteKeyEvents
};
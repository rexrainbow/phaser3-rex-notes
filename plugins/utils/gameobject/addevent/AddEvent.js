var AddEvent = function (gameObject, eventEmitter, eventName, callback, scope) {
    eventEmitter.on(eventName, callback, scope);
    gameObject.once('destroy', function () {
        eventEmitter.off(eventName, callback, scope);
    })
    return gameObject;
}

export default AddEvent;
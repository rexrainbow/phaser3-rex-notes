var BindEventWithGameObject = function (gameObject, eventEmitter, eventName, callback, scope, once) {
    if (once === undefined) {
        once = false;
    }

    eventEmitter[(once) ? 'once' : 'on'](eventName, callback, scope);

    gameObject.once('destroy', function () {
        eventEmitter.off(eventName, callback, scope);
    })

    return gameObject;
}

export default BindEventWithGameObject;
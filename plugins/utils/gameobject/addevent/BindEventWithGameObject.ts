var BindEventWithGameObject = function(gameObject?: any, eventEmitter?: any, eventName?: any, callback?: any, scope?: any, once?: any) {
    if (once === undefined) {
        once = false;
    }

    eventEmitter[(once) ? 'once' : 'on'](eventName, callback, scope);

    gameObject.once('destroy', function() {
        eventEmitter.off(eventName, callback, scope);
    })

    return gameObject;
}

export default BindEventWithGameObject;
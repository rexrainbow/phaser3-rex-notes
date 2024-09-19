import IsSceneObject from '../../system/IsSceneObject.js';

var AddEvent = function (bindingTarget, eventEmitter, eventName, callback, scope) {
    eventEmitter.on(eventName, callback, scope);

    if (!IsSceneObject(bindingTarget)) {
        bindingTarget.once('destroy', function () {
            eventEmitter.off(eventName, callback, scope);
        })
    } else {
        // bindingTarget is scene
        bindingTarget.sys.events.once('shutdown', function () {
            eventEmitter.off(eventName, callback, scope);
        });
    }
    return bindingTarget;
}

export default AddEvent;
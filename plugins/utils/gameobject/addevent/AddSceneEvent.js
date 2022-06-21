import AddEvent from './AddEvent.js';

var AddSceneEvent = function (gameObject, eventName, callback, scope) {
    var eventEmitter = gameObject.scene.events;
    return AddEvent(gameObject, eventEmitter, eventName, callback, scope);
}

export default AddSceneEvent;
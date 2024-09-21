import AddEvent from './AddEvent.js';
import GetSceneObject from '../../system/GetSceneObject.js';

var AddSceneEvent = function (bindingTarget, eventName, callback, scope, once) {
    var scene = GetSceneObject(bindingTarget);
    var eventEmitter = scene.sys.events;
    return AddEvent(bindingTarget, eventEmitter, eventName, callback, scope, once);
}

export default AddSceneEvent;
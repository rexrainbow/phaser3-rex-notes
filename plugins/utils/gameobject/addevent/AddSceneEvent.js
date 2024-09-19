import AddEvent from './AddEvent.js';
import IsSceneObject from '../../system/IsSceneObject.js';

var AddSceneEvent = function (bindingTarget, eventName, callback, scope) {
    var eventEmitter = (!IsSceneObject(bindingTarget)) ? bindingTarget.scene.sys.events : bindingTarget.sys.events;
    return AddEvent(bindingTarget, eventEmitter, eventName, callback, scope);
}

export default AddSceneEvent;
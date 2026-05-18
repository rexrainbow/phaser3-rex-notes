import AddEvent from './AddEvent';
import GetSceneObject from '../../system/GetSceneObject';

var AddSceneEvent = function(bindingTarget?: any, eventName?: any, callback?: any, scope?: any, once?: any) {
    var scene = GetSceneObject(bindingTarget);
    var eventEmitter = scene.sys.events;
    return AddEvent(bindingTarget, eventEmitter, eventName, callback, scope, once);
}

export default AddSceneEvent;
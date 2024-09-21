import IsSceneObject from '../../system/IsSceneObject.js';
import BindEventWithGameObject from './BindEventWithGameObject.js';
import BindEventWidthScene from './BindEventWidthScene.js';

var AddEvent = function (bindingTarget, eventEmitter, eventName, callback, scope, once) {
    if (!IsSceneObject(bindingTarget)) {
        BindEventWithGameObject(bindingTarget, eventEmitter, eventName, callback, scope, once);
    } else {
        BindEventWidthScene(bindingTarget, eventEmitter, eventName, callback, scope, once);
    }

    return bindingTarget;
}

export default AddEvent;
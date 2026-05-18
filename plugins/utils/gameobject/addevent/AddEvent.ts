import IsSceneObject from '../../system/IsSceneObject';
import BindEventWithGameObject from './BindEventWithGameObject';
import BindEventWidthScene from './BindEventWidthScene';

var AddEvent = function(bindingTarget?: any, eventEmitter?: any, eventName?: any, callback?: any, scope?: any, once?: any) {
    if (!IsSceneObject(bindingTarget)) {
        BindEventWithGameObject(bindingTarget, eventEmitter, eventName, callback, scope, once);
    } else {
        BindEventWidthScene(bindingTarget, eventEmitter, eventName, callback, scope, once);
    }

    return bindingTarget;
}

export default AddEvent;
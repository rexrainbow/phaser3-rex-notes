import IsSceneObject from './IsSceneObject';

var GetEventEmitter = function(object?: any) {
    if (IsSceneObject(object)) {
        return object.events;
    } else if (object.on) {
        return object;
    }
}

export default GetEventEmitter;
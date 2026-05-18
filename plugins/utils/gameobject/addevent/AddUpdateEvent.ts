import AddSceneEvent from './AddSceneEvent';

var AddUpdateEvent = function(bindingTarget?: any, callback?: any, scope?: any, once?: any) {
    return AddSceneEvent(bindingTarget, 'update', callback, scope, once);
}

export default AddUpdateEvent;
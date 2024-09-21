import AddSceneEvent from './AddSceneEvent.js';

var AddUpdateEvent = function (bindingTarget, callback, scope, once) {
    return AddSceneEvent(bindingTarget, 'update', callback, scope, once);
}

export default AddUpdateEvent;
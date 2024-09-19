import AddSceneEvent from './AddSceneEvent.js';

var AddUpdateEvent = function (bindingTarget, callback, scope) {
    return AddSceneEvent(bindingTarget, 'update', callback, scope);
}

export default AddUpdateEvent;
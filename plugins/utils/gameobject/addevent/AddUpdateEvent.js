import AddSceneEvent from './AddSceneEvent.js';

var AddUpdateEvent = function (gameObject, callback, scope) {
    return AddSceneEvent(gameObject, 'update', callback, scope);
}

export default AddUpdateEvent;
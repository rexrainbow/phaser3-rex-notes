import AddSceneEvent from './AddSceneEvent.js';

var AddUpdateEvent = function (gameObject, callback, scope) {
    AddSceneEvent(gameObject, 'update', callback, scope);
}

export default AddUpdateEvent;
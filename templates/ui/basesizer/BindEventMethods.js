import BindEventWithGameObject from '../../../plugins/utils/gameobject/addevent/BindEventWithGameObject.js';

export default {
    bindEvent(gameObject, eventEmitter, eventName, callback, scope, once) {
        if (typeof (eventEmitter) === 'string') {
            once = scope;
            scope = callback;
            callback = eventName;
            eventName = eventEmitter;
            eventEmitter = gameObject;
            gameObject = this;
        }

        BindEventWithGameObject(gameObject, eventEmitter, eventName, callback, scope, once);

        return this;
    },


}
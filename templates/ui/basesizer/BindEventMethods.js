import BindEventWithGameObject from '../../../plugins/utils/gameobject/addevent/BindEventWithGameObject.js';
import IsFunction from '../../../plugins/utils/object/IsFunction.js';


var BindSceneEvent = function (eventName, gameObject, callback, scope, once) {
    if (IsFunction(gameObject)) {
        once = scope;
        scope = callback;
        callback = gameObject;
        gameObject = this;
    }

    var eventEmitter = this.scene.events;

    this.bindEvent(gameObject, eventEmitter, eventName, callback, scope, once);

    return this;
}

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

    bindScenePreupdateEvent(gameObject, callback, scope, once) {
        BindSceneEvent.call(this, 'preupdate', gameObject, callback, scope, once);
        return this;
    },

    bindSceneUpdateEvent(gameObject, callback, scope, once) {
        BindSceneEvent.call(this, 'update', gameObject, callback, scope, once);
        return this;
    },

    bindScenePostupdateEvent(gameObject, callback, scope, once) {
        BindSceneEvent.call(this, 'postupdate', gameObject, callback, scope, once);
        return this;
    },

    bindSceneRenderEvent(gameObject, callback, scope, once) {
        BindSceneEvent.call(this, 'render', gameObject, callback, scope, once);
        return this;
    },

    bindScenePauseEvent(gameObject, callback, scope, once) {
        BindSceneEvent.call(this, 'pause', gameObject, callback, scope, once);
        return this;
    },

    bindSceneResumeEvent(gameObject, callback, scope, once) {
        BindSceneEvent.call(this, 'resume', gameObject, callback, scope, once);
        return this;
    },

    bindSceneSleepEvent(gameObject, callback, scope, once) {
        BindSceneEvent.call(this, 'sleep', gameObject, callback, scope, once);
        return this;
    },

    bindSceneWakeEvent(gameObject, callback, scope, once) {
        BindSceneEvent.call(this, 'wake', gameObject, callback, scope, once);
        return this;
    },

    bindSceneShutdownEvent(gameObject, callback, scope, once) {
        BindSceneEvent.call(this, 'shutdown', gameObject, callback, scope, once);
        return this;
    },


}
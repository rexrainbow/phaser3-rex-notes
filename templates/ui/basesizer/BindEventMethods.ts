import BindEventWithGameObject from '../../../plugins/utils/gameobject/addevent/BindEventWithGameObject';
import IsFunction from '../../../plugins/utils/object/IsFunction';


var BindSceneEvent = function(eventName?: any, gameObject?: any, callback?: any, scope?: any, once?: any) {
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
    bindEvent(gameObject?: any, eventEmitter?: any, eventName?: any, callback?: any, scope?: any, once?: any) {
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

    bindScenePreupdateEvent(gameObject?: any, callback?: any, scope?: any, once?: any) {
        BindSceneEvent.call(this, 'preupdate', gameObject, callback, scope, once);
        return this;
    },

    bindSceneUpdateEvent(gameObject?: any, callback?: any, scope?: any, once?: any) {
        BindSceneEvent.call(this, 'update', gameObject, callback, scope, once);
        return this;
    },

    bindScenePostupdateEvent(gameObject?: any, callback?: any, scope?: any, once?: any) {
        BindSceneEvent.call(this, 'postupdate', gameObject, callback, scope, once);
        return this;
    },

    bindSceneRenderEvent(gameObject?: any, callback?: any, scope?: any, once?: any) {
        BindSceneEvent.call(this, 'render', gameObject, callback, scope, once);
        return this;
    },

    bindScenePauseEvent(gameObject?: any, callback?: any, scope?: any, once?: any) {
        BindSceneEvent.call(this, 'pause', gameObject, callback, scope, once);
        return this;
    },

    bindSceneResumeEvent(gameObject?: any, callback?: any, scope?: any, once?: any) {
        BindSceneEvent.call(this, 'resume', gameObject, callback, scope, once);
        return this;
    },

    bindSceneSleepEvent(gameObject?: any, callback?: any, scope?: any, once?: any) {
        BindSceneEvent.call(this, 'sleep', gameObject, callback, scope, once);
        return this;
    },

    bindSceneWakeEvent(gameObject?: any, callback?: any, scope?: any, once?: any) {
        BindSceneEvent.call(this, 'wake', gameObject, callback, scope, once);
        return this;
    },

    bindSceneShutdownEvent(gameObject?: any, callback?: any, scope?: any, once?: any) {
        BindSceneEvent.call(this, 'shutdown', gameObject, callback, scope, once);
        return this;
    },


}
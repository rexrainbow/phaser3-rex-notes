import { WaitCompleteEvent, RemoveWaitEvents } from './const.js';
import WaitTimeMethods from './WaitTimeMethods.js';
import WaitInputMethods from './WaitInputMethods.js';
import WaitGameObjectMethods from './WaitGameObjectMethods.js';
import WaitCameraMethods from './WaitCameraMethods.js';
import WaitMusicMethods from './WaitMusicMethods.js';
import WaitAny from './WaitAny.js';
import GetValue from '../../object/GetValue.js';
import PreUpdateDelayCall from '../../time/PreUpdateDelayCall.js';

class WaitEventManager {
    constructor(parent, config) {
        this.parent = parent;

        this.waitCompleteEventName = GetValue(config, 'completeEventName', WaitCompleteEvent);
        this.setClickTarget(GetValue(config, 'clickTarget', this.scene));
        this.setCameraTarget(GetValue(config, 'camera', this.scene.cameras.main));
        this.waitId = 0;
    }

    get clickTarget() {
        return this.parent.clickTarget;
    }

    set clickTarget(value) {
        this.parent.clickTarget = value;
    }

    get cameraTarget() {
        return this.parent.cameraTarget;
    }

    set cameraTarget(value) {
        this.parent.cameraTarget = value;
    }

    destroy() {
        this.removeWaitEvents();
        this.clearWaitCompleteCallbacks();
        this.setClickTarget();
        this.setCameraTarget();
    }

    get scene() {
        return this.parent.managersScene;
    }

    waitEvent(eventEmitter, eventName, completeNextTick) {
        var callback = this.getWaitCompleteTriggerCallback(completeNextTick);
        eventEmitter.once(eventName, callback, this);
        this.parent.once(RemoveWaitEvents, function () {
            eventEmitter.off(eventName, callback, this);
        });
        return this.parent;
    }

    getWaitCompleteTriggerCallback(completeNextTick) {
        if (completeNextTick === undefined) {
            completeNextTick = true;
        }

        var waitId = this.waitId;
        var self = this;
        var completeCallback = function () {
            if (waitId < self.waitId) {
                return;
            }
            self.waitId++;
            self.removeWaitEvents();
            self.parent.emit(self.waitCompleteEventName);
        }

        if (completeNextTick) {
            var completeCallbackNextTick = function () {
                PreUpdateDelayCall(self.parent, 0, completeCallback);
            }
            return completeCallbackNextTick;
        } else {
            return completeCallback;
        }
    }

    removeWaitEvents() {
        this.parent.emit(RemoveWaitEvents);
        return this;
    }

    addWaitCompleteCallback(callback, scope) {
        this.parent.on(this.waitCompleteEventName, callback, scope);
        return this;
    }

    clearWaitCompleteCallbacks() {
        this.parent.off(this.waitCompleteEventName);
        return this;
    }

}

var Methods = {
    waitAny: WaitAny,
}

Object.assign(
    WaitEventManager.prototype,
    WaitTimeMethods,
    WaitInputMethods,
    WaitGameObjectMethods,
    WaitCameraMethods,
    WaitMusicMethods,
    Methods,
)

export default WaitEventManager;
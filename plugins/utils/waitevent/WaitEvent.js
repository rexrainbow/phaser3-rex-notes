import { WaitCompleteEvent, RemoveWaitEvents } from './const.js';
import EventEmitterMethods from '../eventemitter/EventEmitterMethods.js';
import PreUpdateDelayCall from '../time/PreUpdateDelayCall.js';

class WaitEvent {
    constructor(parent) {
        if (!parent) {
            this.setEventEmitter(true);
            parent = this;
        }
        this.parent = parent;

        this.waitId = 0;

        // Override it
        this.waitCompleteEventName = WaitCompleteEvent;
        this.removeWaitEventsEventName = RemoveWaitEvents;
    }

    destroy() {
        this.removeWaitEvents();
        this.clearWaitCompleteCallbacks();
        this.parent = null;
    }

    waitEvent(eventEmitter, eventName, completeNextTick, waitCompleteEventName) {
        // Emit completeEvent (default value is 'complete') when eventEmitter firing eventName
        var callback = this.getWaitCompleteTriggerCallback(completeNextTick, waitCompleteEventName);
        eventEmitter.once(eventName, callback, this);
        // Once completeEvent firing, remove pending eventName from eventEmitter
        this.parent.once(this.removeWaitEventsEventName, function () {
            eventEmitter.off(eventName, callback, this);
        });
        // All pending eventName from eventEmitter will be removed at last
        return this.parent;
    }

    getWaitCompleteTriggerCallback(completeNextTick, waitCompleteEventName) {
        if (completeNextTick === undefined) {
            completeNextTick = true;
        }
        if (waitCompleteEventName === undefined) {
            waitCompleteEventName = this.waitCompleteEventName;
        }

        var waitId = this.waitId;
        var self = this;
        var completeCallback = function () {
            if (waitId < self.waitId) {
                return;
            }
            self.waitId++;
            self.removeWaitEvents();
            self.parent.emit(waitCompleteEventName);
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
        this.parent.emit(this.removeWaitEventsEventName);
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

Object.assign(
    WaitEvent.prototype,
    EventEmitterMethods
);

export default WaitEvent;
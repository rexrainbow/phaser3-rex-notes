import { WaitCompleteEvent, RemoveWaitEvents } from './const';
import EventEmitterMethods from '../eventemitter/EventEmitterMethods';
import PreUpdateDelayCall from '../time/PreUpdateDelayCall';

class WaitEvent {
    parent: any;

    removeWaitEventsEventName: any;
    setEventEmitter: any;
    waitCompleteEventName: any;
    waitId: any;

    constructor(parent?: any) {
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

    // Emit completeEvent (default value is 'complete') when eventEmitter firing eventName
    waitEvent(eventEmitter?: any, eventName?: any, completeNextTick?: any) {
        var callback = this.getWaitCompleteTriggerCallback(completeNextTick);
        eventEmitter.once(eventName, callback, this);
        // Once completeEvent firing, remove pending eventName from eventEmitter
        this.parent.once(this.removeWaitEventsEventName, function() {
            eventEmitter.off(eventName, callback, this);
        });
        // All pending eventName from eventEmitter will be removed at last
        return this.parent;
    }

    getWaitCompleteTriggerCallback(completeNextTick?: any) {
        if (completeNextTick === undefined) {
            completeNextTick = true;
        }

        var waitId = this.waitId;
        var self = this;
        var completeCallback = function() {
            if (waitId < self.waitId) {
                return;
            }
            self.waitId++;
            self.removeWaitEvents();
            self.parent.emit(self.waitCompleteEventName);
        }

        if (completeNextTick?: any) {
            var completeCallbackNextTick = function() {
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

    addWaitCompleteCallback(callback?: any, scope?: any) {
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
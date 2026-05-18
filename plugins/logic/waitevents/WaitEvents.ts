class WaitEvents {
    completeCallback: any;
    event: any;
    events: any;
    scope: any;

    constructor(completeCallback?: any, scope?: any) {
        this.setCompleteCallback(completeCallback, scope);
        this.events = new Set();
    }

    shutdown() {
        this.setCompleteCallback(undefined, undefined);
        this.events.clear();
        this.event = undefined;
        return this;
    }

    destroy() {
        this.shutdown();
        return this;
    }

    setCompleteCallback(callback?: any, scope?: any) {
        this.completeCallback = callback;
        this.scope = scope;
        return this;
    }

    waitCallback() {
        var self = this;
        var callback = function() {
            self.remove(callback);
        }
        this.events.add(callback);
        return callback;
    }

    waitEvent(eventEmitter?: any, eventName?: any) {
        eventEmitter.once(eventName, this.waitCallback());
        return this;
    }

    remove(callback?: any) {
        this.events.delete(callback);
        if (this.noWaitEvent) {
            if (this.scope) {
                this.completeCallback.call(this.scope);
            } else {
                this.completeCallback();
            }
        }
        return this;
    }

    clear() {
        this.events.clear();
        return this;
    }

    get noWaitEvent() {
        return this.events.size === 0;
    }
}

export default WaitEvents;
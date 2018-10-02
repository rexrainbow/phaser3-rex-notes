const SetStruct = Phaser.Structs.Set;
class WaitEvents {
    constructor(completeCallback, scope) {
        this.setCompleteCallback(completeCallback, scope);
        this.events = new SetStruct();
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

    setCompleteCallback(callback, scope) {
        this.completeCallback = callback;
        this.scope = scope;
    }

    wait(eventEmitter, eventName) {
        this.events.set(eventEmitter);

        var self = this;
        eventEmitter.once(eventName, function () {
            self.remove(this);
        }, eventEmitter);
        return this;
    }

    remove(eventEmitter) {
        this.events.delete(eventEmitter);
        if (this.events.size === 0) {
            if (this.scope) {
                this.completeCallback.call(this.scope);
            } else {
                this.completeCallback();
            }
        }
        return this;
    }
}

export default WaitEvents;
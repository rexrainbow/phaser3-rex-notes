export default {
    setEventEmitter(eventEmitter, EventEmitterClass) {
        if (EventEmitterClass === undefined) {
            EventEmitterClass = Phaser.Events.EventEmitter; // Use built-in EventEmitter class by default
        }
        this._privateEE = (eventEmitter === true) || (eventEmitter === undefined);
        this._eventEmitter = (this._privateEE) ? (new EventEmitterClass()) : eventEmitter;
        return this;
    },

    destroyEventEmitter() {
        if (this._eventEmitter && this._privateEE) {
            this._eventEmitter.shutdown();
        }
        return this;
    },

    getEventEmitter() {
        return this._eventEmitter;
    },

    on() {
        if (this._eventEmitter) {
            this._eventEmitter.on.apply(this._eventEmitter, arguments);
        }
        return this;
    },

    once() {
        if (this._eventEmitter) {
            this._eventEmitter.once.apply(this._eventEmitter, arguments);
        }
        return this;
    },

    off() {
        if (this._eventEmitter) {
            this._eventEmitter.off.apply(this._eventEmitter, arguments);
        }
        return this;
    },

    emit(event) {
        if (this._eventEmitter && event) {
            this._eventEmitter.emit.apply(this._eventEmitter, arguments);
        }
        return this;
    },

    addListener() {
        if (this._eventEmitter) {
            this._eventEmitter.addListener.apply(this._eventEmitter, arguments);
        }
        return this;
    },

    removeListener() {
        if (this._eventEmitter) {
            this._eventEmitter.removeListener.apply(this._eventEmitter, arguments);
        }
        return this;
    },

    removeAllListeners() {
        if (this._eventEmitter) {
            this._eventEmitter.removeAllListeners.apply(this._eventEmitter, arguments);
        }
        return this;
    },

    listenerCount() {
        if (this._eventEmitter) {
            return this._eventEmitter.listenerCount.apply(this._eventEmitter, arguments);
        }
        return 0;
    },

    listeners() {
        if (this._eventEmitter) {
            return this._eventEmitter.listeners.apply(this._eventEmitter, arguments);
        }
        return [];
    },

    eventNames() {
        if (this._eventEmitter) {
            return this._eventEmitter.eventNames.apply(this._eventEmitter, arguments);
        }
        return [];
    },
};
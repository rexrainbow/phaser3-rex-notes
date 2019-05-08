const EE = Phaser.Events.EventEmitter;

export default {
    setEventEmitter(eventEmitter) {
        if (eventEmitter === undefined) {
            eventEmitter = new EE();
        }
        this.eventEmitter = eventEmitter;
        return this;
    },

    on: function () {
        if (this.eventEmitter) {
            this.eventEmitter.on.apply(this.eventEmitter, arguments);
        }
        return this;
    },

    once: function () {
        if (this.eventEmitter) {
            this.eventEmitter.once.apply(this.eventEmitter, arguments);
        }
        return this;
    },

    off: function () {
        if (this.eventEmitter) {
            this.eventEmitter.off.apply(this.eventEmitter, arguments);
        }
        return this;
    },

    emit: function () {
        if (this.eventEmitter) {
            this.eventEmitter.emit.apply(this.eventEmitter, arguments);
        }
        return this;
    },

    addListener: function () {
        if (this.eventEmitter) {
            this.eventEmitter.addListener.apply(this.eventEmitter, arguments);
        }
        return this;
    },

    removeListener: function () {
        if (this.eventEmitter) {
            this.eventEmitter.removeListener.apply(this.eventEmitter, arguments);
        }
        return this;
    },

    removeAllListeners: function () {
        if (this.eventEmitter) {
            this.eventEmitter.removeAllListeners.apply(this.eventEmitter, arguments);
        }
        return this;
    },

    listenerCount: function () {
        if (this.eventEmitter) {
            return this.eventEmitter.listenerCount.apply(this.eventEmitter, arguments);
        }
        return 0;
    },

    listeners: function () {
        if (this.eventEmitter) {
            return this.eventEmitter.listeners.apply(this.eventEmitter, arguments);
        }
        return [];
    }
};
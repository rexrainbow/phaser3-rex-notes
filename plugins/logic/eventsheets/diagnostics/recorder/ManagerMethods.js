import NormalizeManagers from './NormalizeManagers.js';
import CreateHandlers from './CreateHandlers.js';

export default {
    setManager(manager) {
        return this.setManagers(manager);
    },

    setManagers(managers) {
        var wasStarted = this.isStarted;
        if (wasStarted) {
            this.stop();
        }

        this.managers = NormalizeManagers(undefined, managers);

        if (wasStarted) {
            this.start();
        }

        return this;
    },

    start() {
        if ((this.managers.length === 0) || this.isStarted) {
            return this;
        }

        this._handlers = CreateHandlers(this);
        for (var i = 0, cnt = this.managers.length; i < cnt; i++) {
            this.startManager(this.managers[i]);
        }

        this.isStarted = true;
        return this;
    },

    stop() {
        if ((this.managers.length === 0) || !this.isStarted) {
            return this;
        }

        for (var i = 0, cnt = this.managers.length; i < cnt; i++) {
            this.stopManager(this.managers[i]);
        }

        this._handlers = undefined;
        this.isStarted = false;
        return this;
    },

    startManager(manager) {
        var handlers = this._handlers;
        for (var eventName in handlers) {
            manager.on(eventName, handlers[eventName], this);
        }

        return this;
    },

    stopManager(manager) {
        var handlers = this._handlers;
        if (!handlers) {
            return this;
        }

        for (var eventName in handlers) {
            manager.off(eventName, handlers[eventName], this);
        }

        return this;
    },
}

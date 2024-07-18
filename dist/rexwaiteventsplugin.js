(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexwaiteventsplugin = factory());
})(this, (function () { 'use strict';

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
            return this;
        }

        waitCallback() {
            var self = this;
            var callback = function () {
                self.remove(callback);
            };
            this.events.set(callback);
            return callback;
        }

        waitEvent(eventEmitter, eventName) {
            eventEmitter.once(eventName, this.waitCallback());
            return this;
        }

        remove(callback) {
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

    class WaitEventsPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(completeCallback, scope) {
            return new WaitEvents(completeCallback, scope);
        }

    }

    return WaitEventsPlugin;

}));

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('phaser')) :
    typeof define === 'function' && define.amd ? define(['phaser'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexwaiteventsplugin = factory(global.Phaser));
})(this, (function (phaser) { 'use strict';

    class WaitEvents {
        constructor(completeCallback, scope) {
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
            this.events.add(callback);
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

    class WaitEventsPlugin extends phaser.Plugins.BasePlugin {

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

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexeventpromiseplugin = factory());
})(this, (function () { 'use strict';

    var WaitEvent = function (eventEmitter, eventName) {
        return new Promise(function (resolve, reject) {
            eventEmitter.once(eventName, function () {
                resolve();
            });
        });
    };

    var WaitComplete = function (eventEmitter) {
        return WaitEvent(eventEmitter, 'complete');
    };

    var Delay = function (time, result) {
        if (time === undefined) {
            time = 0;
        }
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(result);
            }, time);
        });
    };

    class EventPromisePlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }
    }

    var methods = {
        waitEvent: WaitEvent,
        waitComplete: WaitComplete,
        delay: Delay,
    };

    // mixin
    Object.assign(
        EventPromisePlugin.prototype,
        methods
    );

    return EventPromisePlugin;

}));

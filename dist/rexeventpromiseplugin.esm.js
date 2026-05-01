import { Plugins } from 'phaser';

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

class EventPromisePlugin extends Plugins.BasePlugin {

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

export { EventPromisePlugin as default };

import { WaitEvent, WaitComplete, Delay } from './eventpromise'

import { Plugins as PhaserPlugins } from 'phaser';
class EventPromisePlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager?: any) {
        super(pluginManager);
    }
}

var methods = {
    waitEvent: WaitEvent,
    waitComplete: WaitComplete,
    delay: Delay,
}

// mixin
Object.assign(
    EventPromisePlugin.prototype,
    methods
);

export default EventPromisePlugin;
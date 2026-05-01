import RealTimeTimers from './realtimetimers.js';

import { Plugins as PhaserPlugins } from 'phaser';
class RealTimeTimersPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new RealTimeTimers(config);
    }

}

export default RealTimeTimersPlugin;
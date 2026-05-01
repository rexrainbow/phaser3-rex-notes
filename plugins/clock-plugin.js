import Clock from './clock.js';

import { Plugins as PhaserPlugins } from 'phaser';
class ClockPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new Clock(scene, config);
    }

}

export default ClockPlugin;
import DragSpeed from './dragspeed.js';

import { Plugins as PhaserPlugins } from 'phaser';
class DragSpeedPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new DragSpeed(gameObject, config);
    }

}

export default DragSpeedPlugin;
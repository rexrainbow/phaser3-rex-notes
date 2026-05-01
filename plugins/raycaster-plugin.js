import Raycaster from './raycaster.js';

import { Plugins as PhaserPlugins } from 'phaser';
class RaycasterPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new Raycaster(config);
    }
}

export default RaycasterPlugin;
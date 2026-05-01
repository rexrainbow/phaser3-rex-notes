import Ship from './ship.js';

import { Plugins as PhaserPlugins } from 'phaser';
class ShipPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new Ship(gameObject, config);
    }

}

export default ShipPlugin;
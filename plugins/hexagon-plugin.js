import Hexagon from './hexagon.js';

import { Plugins as PhaserPlugins } from 'phaser';
class HexagonPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(x, y, size, type) {
        return new Hexagon(x, y, size, type);
    }
}

export default HexagonPlugin;
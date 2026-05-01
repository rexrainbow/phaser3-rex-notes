import Perlin from './perlin.js';

import { Plugins as PhaserPlugins } from 'phaser';
class PerlinPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(seed) {
        return new Perlin(seed);
    }

}

export default PerlinPlugin;
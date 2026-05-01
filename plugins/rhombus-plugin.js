import Rhombus from './rhombus.js';

import { Plugins as PhaserPlugins } from 'phaser';
class RhombusPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(x, y, width, height) {
        return new Rhombus(x, y, width, height);
    }
}

export default RhombusPlugin;
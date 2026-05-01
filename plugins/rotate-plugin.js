import Rotate from './rotate.js';

import { Plugins as PhaserPlugins } from 'phaser';
class RotatePlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new Rotate(gameObject, config);
    }
}

export default RotatePlugin;
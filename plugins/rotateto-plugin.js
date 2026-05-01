import RotateTo from './rotateto.js';

import { Plugins as PhaserPlugins } from 'phaser';
class RotateToPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new RotateTo(gameObject, config);
    }
}

export default RotateToPlugin;
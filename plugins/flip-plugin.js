import Flip from './flip.js';

import { Plugins as PhaserPlugins } from 'phaser';
class FlipPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new Flip(gameObject, config);
    }
}

export default FlipPlugin;